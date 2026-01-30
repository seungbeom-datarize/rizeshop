import { Hono } from 'hono';
import posts from './routes/posts';

const app = new Hono().basePath('/api');

const routes = app.route('/posts', posts);

export type AppType = typeof routes;
export default app;
