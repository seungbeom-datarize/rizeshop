# Shopping Mall Feature Roadmap (RizeShop)

This document outlines the proposed features for transforming the current template into a fully functional shopping mall ("RizeShop").

## Phase 1: Core Commerce (MVP)
*Goal: Allow a user to view products and place an order.*

### 1. Product Discovery
- **Home Page**: Featured products, New arrivals banner.
- **Category Page (`/category/[slug]`)**:
    - Filter products by specific category (e.g., Electronics, Clothing).
    - Breadcrumbs for navigation.
- **Search Page (`/search`)**:
    - Keyword search results.
    - Filters (Price, Brand, Rating) applied to search results.
    - "No results" empty state web suggestions.
- **Product List Page (PLP)**:
    - Grid view of products.
    - Basic filtering (Category, Price range).
    - Sorting (Newest, Price Low/High).
- **Product Detail Page (PDP)**:
    - Product images (Gallery).
    - Price, Description.
    - **Options**: Select Size/Color options.
    - "Add to Cart" & "Buy Now" buttons.

### 2. Cart & Checkout
- **Shopping Cart**:
    - List of selected items.
    - Update quantity / Remove items.
    - Calculate total price.
- **Checkout**:
    - Guest checkout / User checkout.
    - Shipping address input.
    - Payment method selection (will likely mock or integrate Toss Payments/PortOne later).

### 3. Order Management
- **Order Confirmation**: "Thank you" page after checkout.
- **Order History (My Page)**: List of past orders and their status (Pending, Shipped, etc.).

---

## Phase 2: User & Admin
*Goal: Manage users, products, and orders.*

### 4. Authentication
- **User**: Sign Up, Login, Logout.
- **My Page**: Profile management.
- **Admin**: Admin role verification.

### 5. Admin Dashboard
- **Product Management**:
    - Create/Edit/Delete products.
    - Upload images.
- **Order Management**:
    - View all orders.
    - Update order status.

---

## Phase 3: Advanced Features (Future)
- **Reviews**: Star ratings and text reviews on products.
- **Search**: Keyword search with auto-complete.
- **Wishlist**: Save items for later.
- **Coupons/Discounts**: Apply promo codes at checkout.

## Technical Considerations
- **Database Schema**: Needs expansion (Users, Products, Orders, OrderItems, Cart).
- **Image Storage**: Need a solution for uploading product images (e.g., AWS S3, Cloudflare R2, or local storage for dev).
- **Payment Gateway**: Toss Payments is recommended for Korean context.
