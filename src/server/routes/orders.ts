import { Hono } from 'hono';
import { getCookie } from 'hono/cookie';
import { eq, desc } from 'drizzle-orm';
import { db } from '@/db';
import { orders, order_items, products, addresses } from '@/db/schema';
import { verifyToken, AUTH_COOKIE } from '@/lib/auth';

const ordersRoute = new Hono()
  // ── Get user orders ──────────────────────────────────────────────────
  .get('/', async (c) => {
    const token = getCookie(c, AUTH_COOKIE);
    if (!token) return c.json({ error: '로그인이 필요합니다.' }, 401);

    const payload = await verifyToken(token);
    if (!payload) return c.json({ error: '로그인이 필요합니다.' }, 401);

    const userOrders = await db
      .select({
        id: orders.id,
        status: orders.status,
        totalAmount: orders.totalAmount,
        createdAt: orders.createdAt,
        paymentMethod: orders.paymentMethod,
        shippingAddress: {
          recipientName: addresses.recipientName,
          phone: addresses.phone,
          address: addresses.address,
          addressDetail: addresses.addressDetail,
        },
      })
      .from(orders)
      .leftJoin(addresses, eq(orders.shippingAddressId, addresses.id))
      .where(eq(orders.userId, payload.userId))
      .orderBy(desc(orders.createdAt));

    return c.json({ orders: userOrders });
  })

  // ── Get order detail ──────────────────────────────────────────────────
  .get('/:id', async (c) => {
    const token = getCookie(c, AUTH_COOKIE);
    if (!token) return c.json({ error: '로그인이 필요합니다.' }, 401);

    const payload = await verifyToken(token);
    if (!payload) return c.json({ error: '로그인이 필요합니다.' }, 401);

    const orderId = parseInt(c.req.param('id'));

    const [order] = await db
      .select({
        id: orders.id,
        status: orders.status,
        totalAmount: orders.totalAmount,
        createdAt: orders.createdAt,
        paymentMethod: orders.paymentMethod,
        deliveryNotes: orders.deliveryNotes,
        shippingAddress: {
          recipientName: addresses.recipientName,
          phone: addresses.phone,
          postalCode: addresses.postalCode,
          address: addresses.address,
          addressDetail: addresses.addressDetail,
        },
      })
      .from(orders)
      .leftJoin(addresses, eq(orders.shippingAddressId, addresses.id))
      .where(eq(orders.id, orderId))
      .limit(1);

    if (!order) {
      return c.json({ error: '주문을 찾을 수 없습니다.' }, 404);
    }

    // Verify order belongs to user
    const [orderOwner] = await db
      .select({ userId: orders.userId })
      .from(orders)
      .where(eq(orders.id, orderId))
      .limit(1);

    if (orderOwner?.userId !== payload.userId) {
      return c.json({ error: '권한이 없습니다.' }, 403);
    }

    // Get order items
    const items = await db
      .select({
        id: order_items.id,
        quantity: order_items.quantity,
        price: order_items.price,
        product: {
          id: products.id,
          name: products.name,
          images: products.images,
        },
      })
      .from(order_items)
      .innerJoin(products, eq(order_items.productId, products.id))
      .where(eq(order_items.orderId, orderId));

    return c.json({ order: { ...order, items } });
  });

export default ordersRoute;
