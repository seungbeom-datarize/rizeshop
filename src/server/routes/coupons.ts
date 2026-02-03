import { Hono } from 'hono';
import { getCookie } from 'hono/cookie';
import { eq, and, desc, lt, gt } from 'drizzle-orm';
import { db } from '@/db';
import { user_coupons, coupons } from '@/db/schema';
import { verifyToken, AUTH_COOKIE } from '@/lib/auth';

const couponsRoute = new Hono()
  // ── Get user coupons ──────────────────────────────────────────────────
  .get('/', async (c) => {
    const token = getCookie(c, AUTH_COOKIE);
    if (!token) return c.json({ error: '로그인이 필요합니다.' }, 401);

    const payload = await verifyToken(token);
    if (!payload) return c.json({ error: '로그인이 필요합니다.' }, 401);

    const userCoupons = await db
      .select({
        id: user_coupons.id,
        status: user_coupons.status,
        usedAt: user_coupons.usedAt,
        createdAt: user_coupons.createdAt,
        coupon: {
          id: coupons.id,
          code: coupons.code,
          name: coupons.name,
          discountType: coupons.discountType,
          discountValue: coupons.discountValue,
          minPurchase: coupons.minPurchase,
          expiresAt: coupons.expiresAt,
        },
      })
      .from(user_coupons)
      .innerJoin(coupons, eq(user_coupons.couponId, coupons.id))
      .where(eq(user_coupons.userId, payload.userId))
      .orderBy(desc(user_coupons.createdAt));

    return c.json({ coupons: userCoupons });
  });

export default couponsRoute;
