import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// Try .env.local first (local dev), fallback to .env or existing env vars
dotenv.config({ path: '.env.local' });
// dotenv.config(); // fallback to .env if .env.local doesn't exist

export default defineConfig({
    schema: './src/db/schema.ts',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
