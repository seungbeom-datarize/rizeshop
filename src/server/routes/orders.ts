import { Hono } from 'hono';
import { getCookie } from 'hono/cookie';
import { z } from 'zod';
import { eq, desc } from 'drizzle-orm';
import { db } from '@/db';
import { orders, order_items, products, addresses } from '@/db/schema';
import { verifyToken, AUTH_COOKIE } from '@/lib/auth';

const createOrderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.number(),
      variantId: z.number().optional(),
      quantity: z.number().min(1),
      price: z.number(),
    }),
  ),
  shippingAddress: z.object({
    recipientName: z.string().min(1),
    phone: z.string().min(1),
    postalCode: z.string().min(1),
    address: z.string().min(1),
    addressDetail: z.string().optional(),
  }),
  paymentMethod: z.string(),
  deliveryNotes: z.string().optional(),
  couponId: z.number().optional(),
  totalAmount: z.number(),
});

const ordersRoute = new Hono()
  // ── Create order ──────────────────────────────────────────────────
  .post('/', async (c) => {
    const token = getCookie(c, AUTH_COOKIE);
    if (!token) return c.json({ error: '로그인이 필요합니다.' }, 401);

    const payload = await verifyToken(token);
    if (!payload) return c.json({ error: '로그인이 필요합니다.' }, 401);

    const body = await c.req.json();
    const parsed = createOrderSchema.safeParse(body);
    if (!parsed.success) {
      console.error('Order validation error:', parsed.error.format());
      return c.json({ error: '입력값을 확인해주세요.', details: parsed.error.format() }, 400);
    }

    const data = parsed.data;

    try {
      // Create shipping address
      const [shippingAddr] = await db
        .insert(addresses)
        .values({
          userId: payload.userId,
          recipientName: data.shippingAddress.recipientName,
          phone: data.shippingAddress.phone,
          postalCode: data.shippingAddress.postalCode,
          address: data.shippingAddress.address,
          addressDetail: data.shippingAddress.addressDetail || null,
          isDefault: false,
        })
        .returning();

      // Create order
      const [order] = await db
        .insert(orders)
        .values({
          userId: payload.userId,
          status: 'pending',
          totalAmount: data.totalAmount,
          shippingAddressId: shippingAddr.id,
          paymentMethod: data.paymentMethod,
          deliveryNotes: data.deliveryNotes || null,
          couponId: data.couponId || null,
        })
        .returning();

      // Create order items
      const orderItemsData = data.items.map((item) => ({
        orderId: order.id,
        productId: item.productId,
        variantId: item.variantId || null,
        quantity: item.quantity,
        price: item.price,
      }));

      await db.insert(order_items).values(orderItemsData);

      return c.json({ order }, 201);
    } catch (error) {
      console.error('Order creation error:', error);
      return c.json({ error: '주문 생성에 실패했습니다.' }, 500);
    }
  })

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
