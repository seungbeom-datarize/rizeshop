import { Hono } from 'hono';
import { getCookie } from 'hono/cookie';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { users } from '@/db/schema';
import {
  verifyToken,
  verifyPassword,
  hashPassword,
  AUTH_COOKIE,
} from '@/lib/auth';

const profileSchema = z.object({
  name: z.string().min(1),
  phone: z.string().optional(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8),
});

const user = new Hono()
  // ── Update profile ──────────────────────────────────────────────────
  .put('/profile', async (c) => {
    const token = getCookie(c, AUTH_COOKIE);
    if (!token) return c.json({ error: '로그인이 필요합니다.' }, 401);

    const payload = await verifyToken(token);
    if (!payload) return c.json({ error: '로그인이 필요합니다.' }, 401);

    const body = await c.req.json();
    const parsed = profileSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({ error: '입력값을 확인해주세요.' }, 400);
    }

    const { name, phone } = parsed.data;

    await db
      .update(users)
      .set({ name, phone: phone || null })
      .where(eq(users.id, payload.userId));

    return c.json({ success: true });
  })

  // ── Change password ─────────────────────────────────────────────────
  .put('/password', async (c) => {
    const token = getCookie(c, AUTH_COOKIE);
    if (!token) return c.json({ error: '로그인이 필요합니다.' }, 401);

    const payload = await verifyToken(token);
    if (!payload) return c.json({ error: '로그인이 필요합니다.' }, 401);

    const body = await c.req.json();
    const parsed = passwordSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({ error: '입력값을 확인해주세요.' }, 400);
    }

    const { currentPassword, newPassword } = parsed.data;

    const [existing] = await db
      .select({ password: users.password })
      .from(users)
      .where(eq(users.id, payload.userId))
      .limit(1);

    if (!existing) return c.json({ error: '사용자를 찾을 수 없습니다.' }, 404);

    const valid = await verifyPassword(currentPassword, existing.password);
    if (!valid) {
      return c.json({ error: '현재 비밀번호가 일치하지 않습니다.' }, 400);
    }

    const hashed = await hashPassword(newPassword);
    await db
      .update(users)
      .set({ password: hashed })
      .where(eq(users.id, payload.userId));

    return c.json({ success: true });
  });

export default user;
