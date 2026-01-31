# Shopping Mall Feature Roadmap (RizeShop)

This document outlines the features organized by page for the RizeShop shopping mall. Each page includes its URL route and core functionality.

---

## Page-by-Page Features

### Authentication Pages

#### 1. Login Page (`/login`)
**Purpose**: User authentication

**Features**:
- Email/password login form
- "Remember me" checkbox
- Link to register page
- "Forgot password?" link
- Social login options (optional: Google, Kakao, Naver)
- Form validation and error messages
- Redirect to previous page after login

---

#### 2. Register Page (`/register`)
**Purpose**: New user registration

**Features**:
- Sign-up form fields:
  - Email (with validation)
  - Password (with strength indicator)
  - Password confirmation
  - Name
  - Phone number (optional)
- Terms & conditions checkbox
- Privacy policy checkbox
- Email verification (optional)
- Link to login page
- Form validation and error messages
- Redirect to register complete page on success

---

#### 3. Register Complete Page (`/register/complete`)
**Purpose**: Registration confirmation

**Features**:
- Success message display
- Welcome message with user's name
- Next steps guidance (e.g., "Verify your email")
- "Go to Login" button
- "Start Shopping" button (redirect to home)

---

### Product Discovery Pages

#### 4. Main Page (`/`)
**Purpose**: Homepage and entry point

**Features**:
- Hero banner/carousel with featured promotions
- New arrivals section (grid of latest products)
- Popular/trending products section
- Category navigation menu
- Search bar (global header)
- Special offers/deals section
- Footer with links and information

---

#### 5. Item List Page (`/products`)
**Purpose**: Browse products by category or all products

**URL Variations**:
- `/products` - All products
- `/products?category=[slug]` - Category filtered
- `/products?brand=[name]` - Brand filtered

**Features**:
- Grid view of products (responsive: 2-4 columns)
- Product cards showing:
  - Product image
  - Name
  - Price
  - Rating (optional)
  - "Quick view" button
- Filtering sidebar:
  - Category checkboxes
  - Price range slider
  - Brand checkboxes
  - Rating filter
- Sorting dropdown (Price: Low to High, High to Low, Newest, Popular)
- Pagination controls
- Breadcrumbs navigation
- Active filters display with remove option
- "Clear all filters" button
- Product count display

---

#### 6. Item Details Page (`/products/[id]`)
**Purpose**: Detailed product information

**URL Format**: `/products/[id]` or `/products/[slug]`

**Features**:
- Product image gallery (main image + thumbnails, zoom on hover)
- Product information:
  - Name
  - Price (original & discounted)
  - Rating and review count
  - Stock status
  - Description
  - Specifications/details table
- Variant selection (Size, Color, etc.)
- Quantity selector (+/- buttons)
- "Add to Cart" button
- "Buy Now" button (direct checkout)
- Product reviews section:
  - Review list with ratings
  - "Write a Review" button (for logged-in users)
- Related/similar products section
- Breadcrumbs navigation
- Share buttons (optional)

---

#### 7. Search Page (`/search`)
**Purpose**: Search results for keyword queries

**URL Format**: `/search?q=[keyword]`

**Features**:
- Search query display ("Results for: [keyword]")
- Results count
- Grid view of matching products
- Filtering sidebar (same as Item List)
- Sorting options
- Applied filters display
- "No results" empty state:
  - Suggestions for alternative searches
  - Popular products section
  - Link to browse all products
- Search history dropdown (optional)
- Auto-complete suggestions (optional)

---

### Shopping Flow Pages

#### 8. Cart Page (`/cart`)
**Purpose**: Review and manage shopping cart

**Features**:
- Cart items list showing:
  - Product image
  - Product name (clickable to product page)
  - Selected variant (size, color)
  - Price per unit
  - Quantity adjuster (+/- buttons)
  - Subtotal per item
  - Remove button
- Cart summary panel:
  - Subtotal
  - Estimated tax (optional)
  - Estimated shipping
  - Total amount
- Coupon/promo code input section:
  - Input field
  - "Apply" button
  - Applied coupon display with discount
- "Continue Shopping" button
- "Proceed to Checkout" button (disabled if cart empty)
- Empty cart state:
  - Empty cart icon/illustration
  - "Your cart is empty" message
  - "Start Shopping" button
- Save for later option (optional)

---

#### 9. Order Page (`/checkout` or `/order`)
**Purpose**: Checkout and place order

**Features**:
- Multi-step checkout process (optional) or single-page
- Shipping information section:
  - Recipient name
  - Phone number
  - Address (postal code, street, detail)
  - Delivery notes (optional)
  - Address book selection (for logged-in users)
- Order summary:
  - List of items (image, name, quantity, price)
  - Subtotal
  - Shipping fee
  - Discount (if coupon applied)
  - Total amount
- Coupon section:
  - "Select Coupon" button (opens modal)
  - Applied coupon display
- Payment method selection:
  - Credit/debit card
  - Bank transfer
  - Toss Pay / Kakao Pay / Naver Pay
  - Payment gateway integration placeholder
- Terms acceptance checkboxes:
  - Terms of service
  - Privacy policy
  - Payment agreement
- "Place Order" button
- Guest checkout option (for non-logged-in users)
- Form validation and error handling

---

#### 10. Order Complete Page (`/order/complete`)
**Purpose**: Order confirmation

**URL Format**: `/order/complete` or `/order/[orderId]/complete`

**Features**:
- Success icon/animation
- "Thank you for your order!" message
- Order number display (large, copyable)
- Order summary:
  - Items ordered (images, names, quantities)
  - Shipping address
  - Payment method
  - Total amount paid
- Estimated delivery date/timeframe
- Order status ("Processing", "Preparing for shipment")
- Action buttons:
  - "View Order Details" (link to order history)
  - "Continue Shopping" (back to home)
  - "Download Receipt" (optional)
- Email confirmation notice

---

### Account Management Pages

#### 11. My Account Page (`/my-account`)
**Purpose**: Account overview and dashboard

**Features**:
- User profile summary:
  - Profile picture (optional)
  - Name
  - Email
  - Member since date
- Quick links/navigation cards:
  - Order history
  - My coupons
  - Edit profile
  - Address book
  - Wishlist (optional)
- Recent orders section (latest 3-5 orders):
  - Order number
  - Date
  - Status
  - Total amount
  - "View Details" link
- Account statistics (optional):
  - Total orders
  - Total spent
  - Available coupons count
- Logout button

---

#### 12. My Coupon Page (`/my-account/coupons`)
**Purpose**: View and manage coupons

**Features**:
- Tabs/sections for coupon status:
  - Available (active, unused)
  - Used
  - Expired
- Coupon cards displaying:
  - Coupon name/title
  - Discount amount or percentage
  - Minimum purchase requirement
  - Expiration date
  - Usage restrictions (if any)
  - "Apply" button (redirects to cart/checkout)
- Coupon code input section:
  - "Enter coupon code" field
  - "Add Coupon" button
- Empty state for each tab:
  - "No coupons available" message
  - "Browse products" link
- Coupon count badge for each tab
- Sort/filter options (by expiration date, discount amount)

---

#### 13. Modify Page (`/my-account/edit`)
**Purpose**: Edit user profile and account settings

**Features**:
- Profile information form:
  - Name
  - Email (with verification)
  - Phone number
  - Profile picture upload (optional)
  - "Save Changes" button
- Change password section:
  - Current password
  - New password
  - Confirm new password
  - "Update Password" button
- Address management:
  - List of saved addresses
  - "Add New Address" button
  - Edit/Delete address options
  - Set default address
- Notification preferences (optional):
  - Email notifications
  - SMS notifications
  - Marketing consent
- Account management:
  - "Deactivate Account" button
  - "Delete Account" button (with confirmation)
- Form validation and success/error messages
- "Cancel" button (discard changes)

---

## Development Phases (Reference)

### Phase 1: Core Commerce (MVP)
**Focus**: Basic shopping functionality
- Pages: Main, Item List, Item Details, Search, Cart, Order, Order Complete
- Core features: Product browsing, cart management, checkout

### Phase 2: User Management
**Focus**: Authentication and user accounts
- Pages: Login, Register, Register Complete, My Account, Modify
- Core features: User authentication, profile management

### Phase 3: Advanced Features
**Focus**: Enhanced shopping experience
- Pages: My Coupon
- Core features: Coupon system, reviews, wishlist, advanced search

---

## Technical Considerations

### URL Routing
- Use Next.js App Router for all pages
- Dynamic routes for products: `/products/[id]` or `/products/[slug]`
- Query parameters for filtering and search
- Proper SEO-friendly URLs

### Database Schema Requirements
Expand schema to support:
- Users (authentication, profile)
- Products (with variants, images)
- Orders and Order Items
- Carts and Cart Items
- Coupons
- Reviews (future)
- Categories

### Image Handling
- Product image uploads and storage
- Solution options: AWS S3, Cloudflare R2, or local storage (dev)
- Image optimization and responsive images

### Payment Integration - Do not implement
- Toss Payments integration (recommended for Korean market)
- PortOne (Iamport) as alternative
- Mock payment for development phase

### State Management
- User authentication state (sessions/JWT)
- Cart state (persist across sessions)
- Wishlist state (optional)

### Form Validation
- Client-side validation (React Hook Form + Zod)
- Server-side validation
- Consistent error message display

### Responsive Design
- Mobile-first approach
- Breakpoints: mobile (< 640px), tablet (640-1024px), desktop (> 1024px)
- Touch-friendly UI elements for mobile

### Accessibility
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader compatibility
