import { Hono } from 'hono';
import auth from './routes/auth';
import user from './routes/user';
import orders from './routes/orders';
import coupons from './routes/coupons';
import addresses from './routes/addresses';

const app = new Hono()
  .basePath('/api')
  .route('/auth', auth)
  .route('/user', user)
  .route('/orders', orders)
  .route('/coupons', coupons)
  .route('/addresses', addresses);

export type AppType = typeof app;
export default app;
