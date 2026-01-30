import { hc } from 'hono/client';
import { AppType } from '@/server/app';

const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000');

export default client;
