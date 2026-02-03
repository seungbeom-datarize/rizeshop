import { Hono } from 'hono';
import { eq, desc, sql } from 'drizzle-orm';
import { db } from '@/db';
import { products, product_variants, categories } from '@/db/schema';

const productsRoute = new Hono()
  // ── Get all products ──────────────────────────────────────────────────
  .get('/', async (c) => {
    const categoryId = c.req.query('categoryId');
    const limit = parseInt(c.req.query('limit') || '50');

    let query = db.select().from(products);

    if (categoryId) {
      query = query.where(eq(products.categoryId, parseInt(categoryId))) as any;
    }

    const allProducts = await query.orderBy(desc(products.createdAt)).limit(limit);

    return c.json({ products: allProducts });
  })

  // ── Get product by ID ──────────────────────────────────────────────────
  .get('/:id', async (c) => {
    const productId = parseInt(c.req.param('id'));

    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    if (!product) {
      return c.json({ error: '상품을 찾을 수 없습니다.' }, 404);
    }

    // Get variants
    const variants = await db
      .select()
      .from(product_variants)
      .where(eq(product_variants.productId, productId));

    return c.json({ product, variants });
  })

  // ── Get product variants ──────────────────────────────────────────────────
  .get('/:id/variants', async (c) => {
    const productId = parseInt(c.req.param('id'));

    const variants = await db
      .select()
      .from(product_variants)
      .where(eq(product_variants.productId, productId));

    return c.json({ variants });
  })

  // ── Get new arrivals ──────────────────────────────────────────────────
  .get('/featured/new-arrivals', async (c) => {
    const limit = parseInt(c.req.query('limit') || '10');

    const newProducts = await db
      .select()
      .from(products)
      .orderBy(desc(products.createdAt))
      .limit(limit);

    return c.json({ products: newProducts });
  })

  // ── Get popular products ──────────────────────────────────────────────────
  .get('/featured/popular', async (c) => {
    const limit = parseInt(c.req.query('limit') || '10');

    // Mock: get random products for now
    const popularProducts = await db
      .select()
      .from(products)
      .orderBy(sql`RANDOM()`)
      .limit(limit);

    return c.json({ products: popularProducts });
  });

export default productsRoute;
