import { Hono } from 'hono';
import { db } from '../../db';
import { posts } from '../../db/schema';

const app = new Hono()
  .get('/', async (c) => {
    const result = await db.select().from(posts);
    return c.json({
      posts: result,
    });
  })
  .post('/', async (c) => {
    const { title } = await c.req.json<{ title: string }>();
    const result = await db.insert(posts).values({ title }).returning();
    return c.json({
      message: `Created post: ${result[0].title}`,
      post: result[0],
    }, 201);
  });

export default app;
