import { Hono } from 'hono';

const app = new Hono()
  .get('/', (c) => {
    return c.json({
      posts: [
        { id: 1, title: 'Hello Hono!' },
        { id: 2, title: 'Next.js + Hono is awesome' },
      ],
    });
  })
  .post('/', async (c) => {
    const { title } = await c.req.json<{ title: string }>();
    return c.json({
      message: `Created post: ${title}`,
    }, 201);
  });

export default app;
