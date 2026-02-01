import { Hono } from 'hono';
import { setCookie, deleteCookie, getCookie } from 'hono/cookie';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { users } from '@/db/schema';
import {
  hashPassword,
  verifyPassword,
  signToken,
  verifyToken,
  AUTH_COOKIE,
  COOKIE_MAX_AGE,
} from '@/lib/auth';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
  phone: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const auth = new Hono()
  // ── Register ────────────────────────────────────────────────────────
  .post('/register', async (c) => {
    const body = await c.req.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return c.json(
        { error: '입력값을 확인해주세요.', details: parsed.error.flatten() },
        400,
      );
    }

    const { email, password, name, phone } = parsed.data;

    // Check email uniqueness
    const existing = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existing.length > 0) {
      return c.json({ error: '이미 사용 중인 이메일입니다.' }, 409);
    }

    const hashed = await hashPassword(password);
    const [user] = await db
      .insert(users)
      .values({ email, password: hashed, name, phone: phone || null })
      .returning({ id: users.id, email: users.email, role: users.role });

    return c.json({ success: true });
  })

  // ── Login ───────────────────────────────────────────────────────────
  .post('/login', async (c) => {
    const body = await c.req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({ error: '입력값을 확인해주세요.' }, 400);
    }

    const { email, password } = parsed.data;

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      return c.json({ error: '이메일 또는 비밀번호가 일치하지 않습니다.' }, 401);
    }

    const valid = await verifyPassword(password, user.password);
    if (!valid) {
      return c.json({ error: '이메일 또는 비밀번호가 일치하지 않습니다.' }, 401);
    }

    const token = await signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    setCookie(c, AUTH_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      path: '/',
      maxAge: COOKIE_MAX_AGE,
    });

    return c.json({ success: true });
  })

  // ── Logout ──────────────────────────────────────────────────────────
  .post('/logout', (c) => {
    deleteCookie(c, AUTH_COOKIE, { path: '/' });
    return c.json({ success: true });
  })

  // ── Me ──────────────────────────────────────────────────────────────
  .get('/me', async (c) => {
    const token = getCookie(c, AUTH_COOKIE);
    if (!token) {
      return c.json({ user: null }, 401);
    }

    const payload = await verifyToken(token);
    if (!payload) {
      deleteCookie(c, AUTH_COOKIE, { path: '/' });
      return c.json({ user: null }, 401);
    }

    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        phone: users.phone,
        role: users.role,
        profileImage: users.profileImage,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, payload.userId))
      .limit(1);

    if (!user) {
      deleteCookie(c, AUTH_COOKIE, { path: '/' });
      return c.json({ user: null }, 401);
    }

    return c.json({ user });
  });

export default auth;
