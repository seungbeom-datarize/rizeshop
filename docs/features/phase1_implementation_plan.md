# Plan: Implement Phase 1 Core Commerce UI Pages

## Overview
Build **7 pages** with **mock data** (no API/DB integration). Auth is mocked. All UI uses **shadcn/ui** components + **Tailwind CSS v4**.

## Scope
| # | Page | Route | Key Sections |
|---|------|-------|-------------|
| 1 | Main | `/` | Hero carousel, category strip, new arrivals grid, popular products grid |
| 2 | Product List | `/products` | Filter sidebar, sort dropdown, product grid, pagination |
| 3 | Product Detail | `/products/[id]` | Image gallery, variants, quantity, add-to-cart, tabs (desc/reviews) |
| 4 | Search | `/search?q=` | Search results grid, filters, empty state |
| 5 | Cart | `/cart` | Cart items, quantity controls, coupon input, summary |
| 6 | Checkout | `/checkout` | Shipping form, payment method, terms, order summary |
| 7 | Order Complete | `/order/complete` | Success message, order number, action buttons |

## Architecture Decisions
- **Server Components** by default; `'use client'` only for interactive parts (cart, filters, forms)
- **Cart state**: React Context + `useReducer`, persisted to `localStorage`
- **Mock data**: TypeScript files in `src/data/` mirroring Drizzle schema types
- **Images**: `https://picsum.photos/seed/{slug}/600/600` placeholders (add to `next.config.ts` remotePatterns)
- **Locale**: Korean (`ko`) — prices in KRW, Korean labels

## shadcn Components to Install (22 new)
```bash
npx shadcn@latest add card badge separator breadcrumb navigation-menu dropdown-menu sheet input label select checkbox radio-group slider textarea carousel skeleton avatar table aspect-ratio pagination toggle-group tabs toast dialog
```

## New File Structure (~45 files)

### Foundation
```
src/types/index.ts              — Product, Category, CartItem, Review, Banner, Coupon types
src/lib/format.ts               — formatPrice(), formatDate()
src/lib/constants.ts            — SORT_OPTIONS, ITEMS_PER_PAGE, SHIPPING_FEE
```

### Mock Data
```
src/data/categories.ts          — 8 categories (4 top-level + 4 subcategories)
src/data/products.ts            — 24 products + helper functions (getById, getByCategory, search)
src/data/reviews.ts             — ~30 reviews across products
src/data/banners.ts             — 3 hero banners
src/data/coupons.ts             — 3 coupons (WELCOME10, FREESHIP, SUMMER20)
```

### Cart Infrastructure
```
src/contexts/cart-context.tsx    — CartProvider (useReducer + localStorage persistence)
src/hooks/use-cart.ts            — useCart() hook
```

### Shared Layout Components
```
src/components/layout/header.tsx        — Logo, category nav (desktop), search bar, cart badge
src/components/layout/footer.tsx        — Link columns, copyright
src/components/layout/mobile-nav.tsx    — Sheet-based hamburger menu
src/components/layout/search-bar.tsx    — Search input with submit
src/components/layout/breadcrumbs.tsx   — Reusable breadcrumb wrapper
```

### Product Components
```
src/components/product/product-card.tsx           — Card with image, name, price, rating
src/components/product/product-grid.tsx           — Responsive grid (2/3/4 cols)
src/components/product/product-image-gallery.tsx  — Carousel + thumbnail strip
src/components/product/product-info.tsx           — Name, price, stock badge
src/components/product/variant-selector.tsx       — ToggleGroup for size/color
src/components/product/quantity-selector.tsx      — +/- buttons
src/components/product/product-reviews.tsx        — Review list with star ratings
src/components/product/related-products.tsx       — Same-category product grid
```

### Filter Components
```
src/components/filter/filter-sidebar.tsx   — Composition of sub-filters
src/components/filter/category-filter.tsx  — Category checkboxes
src/components/filter/price-range-filter.tsx — Dual-thumb slider
src/components/filter/brand-filter.tsx     — Brand checkboxes
src/components/filter/active-filters.tsx   — Active filter chips with remove
src/components/filter/sort-dropdown.tsx    — Select dropdown
```

### Cart Components
```
src/components/cart/cart-item-row.tsx   — Image, info, quantity, price, remove
src/components/cart/cart-summary.tsx    — Subtotal, shipping, discount, total
src/components/cart/coupon-input.tsx    — Code input + apply button
src/components/cart/empty-cart.tsx      — Empty state with CTA
```

### Checkout Components
```
src/components/checkout/shipping-form.tsx           — Address input fields
src/components/checkout/order-summary-panel.tsx     — Item list + totals
src/components/checkout/payment-method-selector.tsx — RadioGroup
src/components/checkout/terms-checkboxes.tsx        — 3 required checkboxes
```

### Pages (7)
```
src/app/layout.tsx              — MODIFY: add CartProvider, Header, Footer, Toaster
src/app/page.tsx                — REPLACE: Main page
src/app/products/page.tsx       — NEW: Product list
src/app/products/[id]/page.tsx  — NEW: Product detail
src/app/search/page.tsx         — NEW: Search
src/app/cart/page.tsx           — NEW: Cart
src/app/checkout/page.tsx       — NEW: Checkout
src/app/order/complete/page.tsx — NEW: Order complete
```

### Config
```
next.config.ts                  — MODIFY: add picsum.photos to images.remotePatterns
```

## Implementation Order

### Step 1: Install shadcn components + update next.config.ts
### Step 2: Foundation files (types, format, constants)
### Step 3: Mock data files
### Step 4: Cart context + hook
### Step 5: Layout components (header, footer, mobile-nav, search-bar, breadcrumbs)
### Step 6: Product components (card, grid, gallery, info, variants, quantity, reviews, related)
### Step 7: Filter components (sidebar, category, price, brand, active, sort)
### Step 8: Cart components (item-row, summary, coupon, empty)
### Step 9: Checkout components (shipping, order-summary, payment, terms)
### Step 10: Modify root layout.tsx
### Step 11: Implement all 7 pages

## Verification
1. `npx tsc --noEmit` — TypeScript compiles
2. `npm run dev` — Dev server starts
3. Manual navigation: `/` → `/products` → `/products/1` → add to cart → `/cart` → `/checkout` → `/order/complete`
4. Mobile responsive check (resize browser)
5. Cart persistence (refresh page, items remain)
