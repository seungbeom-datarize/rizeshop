# Next.js + Hono + Drizzle + shadcn/ui Project Walkthrough

I have successfully set up a Next.js project integrated with:
- **Hono**: Backend API
- **Drizzle ORM**: Database (PostgreSQL)
- **shadcn/ui**: Design System (Tailwind v4)

## Project Structure

- **`src/app`**: Standard Next.js App Router directory.
- **`src/server`**: Hono backend logic.
- **`src/db`**: Database configuration.
- **`src/components/ui`**: shadcn/ui components (e.g., Button).
- **`src/lib/client.ts`**: Type-safe Hono RPC client.

## shadcn/ui Setup

Initialized using the stable CLI (compatible with Tailwind v4):

```bash
npx shadcn@latest init
```

**Note**: We manually replaced `tw-animate-css` with `tailwindcss-animate` and updated `src/app/globals.css` to use `@plugin "tailwindcss-animate";` for full Tailwind v4 compatibility.

Added components:
```bash
npx shadcn@latest add button
```

Documentation saved at: `docs/shadcn-llms.txt`

## Verification Scenarios

### 1. Verify Build & Types
I ran `npm run build` and it passed successfully. This confirms that the RPC types and shadcn components are valid.

```bash
npm run build
```

### 2. Verify Runtime (Manual)
1. Set up your `.env` with a valid `DATABASE_URL`.
2. Run `npm run db:push`.
3. Run `npm run dev`.
4. Visit [http://localhost:3000](http://localhost:3000).
    - Check the list of posts (fetched from DB).
    - **Click the "Click me (shadcn)" button** to verify interactive UI components.

## Changes Made
- Initialized Next.js project.
- Integrated Hono backend & RPC client.
- Integrated Drizzle ORM.
- Integrated shadcn/ui & added Button component.
