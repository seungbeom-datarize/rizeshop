import { Hono } from 'hono';
import auth from './routes/auth';
import user from './routes/user';

const app = new Hono()
  .basePath('/api')
  .route('/auth', auth)
  .route('/user', user);

export type AppType = typeof app;
export default app;
