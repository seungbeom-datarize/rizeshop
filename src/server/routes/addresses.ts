import { Hono } from 'hono';
import { getCookie } from 'hono/cookie';
import { z } from 'zod';
import { eq, and, desc } from 'drizzle-orm';
import { db } from '@/db';
import { addresses } from '@/db/schema';
import { verifyToken, AUTH_COOKIE } from '@/lib/auth';

const addressSchema = z.object({
  label: z.string().optional(),
  recipientName: z.string().min(1, '받는 분 이름을 입력해주세요.'),
  phone: z.string().min(1, '연락처를 입력해주세요.'),
  postalCode: z.string().min(1, '우편번호를 입력해주세요.'),
  address: z.string().min(1, '주소를 입력해주세요.'),
  addressDetail: z.string().optional(),
  isDefault: z.boolean().optional(),
});

const addressesRoute = new Hono()
  // ── Get user addresses ──────────────────────────────────────────────────
  .get('/', async (c) => {
    const token = getCookie(c, AUTH_COOKIE);
    if (!token) return c.json({ error: '로그인이 필요합니다.' }, 401);

    const payload = await verifyToken(token);
    if (!payload) return c.json({ error: '로그인이 필요합니다.' }, 401);

    const userAddresses = await db
      .select()
      .from(addresses)
      .where(eq(addresses.userId, payload.userId))
      .orderBy(desc(addresses.isDefault), desc(addresses.createdAt));

    return c.json({ addresses: userAddresses });
  })

  // ── Create address ──────────────────────────────────────────────────
  .post('/', async (c) => {
    const token = getCookie(c, AUTH_COOKIE);
    if (!token) return c.json({ error: '로그인이 필요합니다.' }, 401);

    const payload = await verifyToken(token);
    if (!payload) return c.json({ error: '로그인이 필요합니다.' }, 401);

    const body = await c.req.json();
    const parsed = addressSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({ error: '입력값을 확인해주세요.' }, 400);
    }

    const data = parsed.data;

    // If this is default address, unset other default addresses
    if (data.isDefault) {
      await db
        .update(addresses)
        .set({ isDefault: false })
        .where(eq(addresses.userId, payload.userId));
    }

    const [newAddress] = await db
      .insert(addresses)
      .values({
        userId: payload.userId,
        label: data.label || null,
        recipientName: data.recipientName,
        phone: data.phone,
        postalCode: data.postalCode,
        address: data.address,
        addressDetail: data.addressDetail || null,
        isDefault: data.isDefault || false,
      })
      .returning();

    return c.json({ address: newAddress }, 201);
  })

  // ── Update address ──────────────────────────────────────────────────
  .put('/:id', async (c) => {
    const token = getCookie(c, AUTH_COOKIE);
    if (!token) return c.json({ error: '로그인이 필요합니다.' }, 401);

    const payload = await verifyToken(token);
    if (!payload) return c.json({ error: '로그인이 필요합니다.' }, 401);

    const addressId = parseInt(c.req.param('id'));

    // Verify address belongs to user
    const [existing] = await db
      .select({ userId: addresses.userId })
      .from(addresses)
      .where(eq(addresses.id, addressId))
      .limit(1);

    if (!existing) {
      return c.json({ error: '배송지를 찾을 수 없습니다.' }, 404);
    }

    if (existing.userId !== payload.userId) {
      return c.json({ error: '권한이 없습니다.' }, 403);
    }

    const body = await c.req.json();
    const parsed = addressSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({ error: '입력값을 확인해주세요.' }, 400);
    }

    const data = parsed.data;

    // If this is default address, unset other default addresses
    if (data.isDefault) {
      await db
        .update(addresses)
        .set({ isDefault: false })
        .where(eq(addresses.userId, payload.userId));
    }

    const [updated] = await db
      .update(addresses)
      .set({
        label: data.label || null,
        recipientName: data.recipientName,
        phone: data.phone,
        postalCode: data.postalCode,
        address: data.address,
        addressDetail: data.addressDetail || null,
        isDefault: data.isDefault || false,
      })
      .where(eq(addresses.id, addressId))
      .returning();

    return c.json({ address: updated });
  })

  // ── Delete address ──────────────────────────────────────────────────
  .delete('/:id', async (c) => {
    const token = getCookie(c, AUTH_COOKIE);
    if (!token) return c.json({ error: '로그인이 필요합니다.' }, 401);

    const payload = await verifyToken(token);
    if (!payload) return c.json({ error: '로그인이 필요합니다.' }, 401);

    const addressId = parseInt(c.req.param('id'));

    // Verify address belongs to user
    const [existing] = await db
      .select({ userId: addresses.userId })
      .from(addresses)
      .where(eq(addresses.id, addressId))
      .limit(1);

    if (!existing) {
      return c.json({ error: '배송지를 찾을 수 없습니다.' }, 404);
    }

    if (existing.userId !== payload.userId) {
      return c.json({ error: '권한이 없습니다.' }, 403);
    }

    await db.delete(addresses).where(eq(addresses.id, addressId));

    return c.json({ success: true });
  });

export default addressesRoute;
