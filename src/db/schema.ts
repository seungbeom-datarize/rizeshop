import {
  pgTable,
  pgEnum,
  serial,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ─── Enums ───────────────────────────────────────────────────────────────────

export const userRoleEnum = pgEnum('user_role', ['user', 'admin']);
export const orderStatusEnum = pgEnum('order_status', [
  'pending',
  'paid',
  'shipped',
  'delivered',
  'cancelled',
]);
export const discountTypeEnum = pgEnum('discount_type', [
  'percentage',
  'fixed',
]);
export const couponStatusEnum = pgEnum('coupon_status', [
  'available',
  'used',
  'expired',
]);

// ─── 1. Users ────────────────────────────────────────────────────────────────

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  role: userRoleEnum('role').default('user').notNull(),
  name: varchar('name', { length: 100 }),
  phone: varchar('phone', { length: 20 }),
  profileImage: text('profile_image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── 2. Categories ───────────────────────────────────────────────────────────

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  parentId: integer('parent_id'),
});

// ─── 3. Products ─────────────────────────────────────────────────────────────

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  price: integer('price').notNull(),
  stock: integer('stock').notNull().default(0),
  images: jsonb('images').$type<string[]>().default([]),
  brand: varchar('brand', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── 4. Product Variants ─────────────────────────────────────────────────────

export const product_variants = pgTable('product_variants', {
  id: serial('id').primaryKey(),
  productId: integer('product_id')
    .notNull()
    .references(() => products.id),
  name: varchar('name', { length: 100 }).notNull(),
  value: varchar('value', { length: 100 }).notNull(),
  additionalPrice: integer('additional_price').default(0).notNull(),
  stock: integer('stock').notNull().default(0),
});

// ─── 5. Reviews ──────────────────────────────────────────────────────────────

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  productId: integer('product_id')
    .notNull()
    .references(() => products.id),
  rating: integer('rating').notNull(),
  content: text('content'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── 6. Addresses ────────────────────────────────────────────────────────────

export const addresses = pgTable('addresses', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  label: varchar('label', { length: 50 }),
  recipientName: varchar('recipient_name', { length: 100 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  postalCode: varchar('postal_code', { length: 10 }).notNull(),
  address: text('address').notNull(),
  addressDetail: text('address_detail'),
  isDefault: boolean('is_default').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── 7. Coupons ──────────────────────────────────────────────────────────────

export const coupons = pgTable('coupons', {
  id: serial('id').primaryKey(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  name: varchar('name', { length: 100 }).notNull(),
  discountType: discountTypeEnum('discount_type').notNull(),
  discountValue: integer('discount_value').notNull(),
  minPurchase: integer('min_purchase').default(0).notNull(),
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── 8. User Coupons ─────────────────────────────────────────────────────────

export const user_coupons = pgTable('user_coupons', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  couponId: integer('coupon_id')
    .notNull()
    .references(() => coupons.id),
  status: couponStatusEnum('status').default('available').notNull(),
  usedAt: timestamp('used_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── 9. Orders ───────────────────────────────────────────────────────────────

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  status: orderStatusEnum('status').default('pending').notNull(),
  totalAmount: integer('total_amount').notNull(),
  shippingAddressId: integer('shipping_address_id').references(
    () => addresses.id,
  ),
  paymentMethod: varchar('payment_method', { length: 50 }),
  deliveryNotes: text('delivery_notes'),
  couponId: integer('coupon_id').references(() => coupons.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── 10. Order Items ─────────────────────────────────────────────────────────

export const order_items = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id')
    .notNull()
    .references(() => orders.id),
  productId: integer('product_id')
    .notNull()
    .references(() => products.id),
  variantId: integer('variant_id').references(() => product_variants.id),
  quantity: integer('quantity').notNull(),
  price: integer('price').notNull(),
});

// ─── 11. Carts ───────────────────────────────────────────────────────────────

export const carts = pgTable('carts', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  sessionId: varchar('session_id', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── 12. Cart Items ──────────────────────────────────────────────────────────

export const cart_items = pgTable('cart_items', {
  id: serial('id').primaryKey(),
  cartId: integer('cart_id')
    .notNull()
    .references(() => carts.id),
  productId: integer('product_id')
    .notNull()
    .references(() => products.id),
  variantId: integer('variant_id').references(() => product_variants.id),
  quantity: integer('quantity').notNull(),
});

// ─── Relations ───────────────────────────────────────────────────────────────

export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
  reviews: many(reviews),
  addresses: many(addresses),
  userCoupons: many(user_coupons),
  carts: many(carts),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
    relationName: 'categoryParent',
  }),
  children: many(categories, { relationName: 'categoryParent' }),
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  variants: many(product_variants),
  reviews: many(reviews),
  orderItems: many(order_items),
  cartItems: many(cart_items),
}));

export const productVariantsRelations = relations(
  product_variants,
  ({ one }) => ({
    product: one(products, {
      fields: [product_variants.productId],
      references: [products.id],
    }),
  }),
);

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [reviews.productId],
    references: [products.id],
  }),
}));

export const addressesRelations = relations(addresses, ({ one }) => ({
  user: one(users, {
    fields: [addresses.userId],
    references: [users.id],
  }),
}));

export const couponsRelations = relations(coupons, ({ many }) => ({
  userCoupons: many(user_coupons),
  orders: many(orders),
}));

export const userCouponsRelations = relations(user_coupons, ({ one }) => ({
  user: one(users, {
    fields: [user_coupons.userId],
    references: [users.id],
  }),
  coupon: one(coupons, {
    fields: [user_coupons.couponId],
    references: [coupons.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  shippingAddress: one(addresses, {
    fields: [orders.shippingAddressId],
    references: [addresses.id],
  }),
  coupon: one(coupons, {
    fields: [orders.couponId],
    references: [coupons.id],
  }),
  items: many(order_items),
}));

export const orderItemsRelations = relations(order_items, ({ one }) => ({
  order: one(orders, {
    fields: [order_items.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [order_items.productId],
    references: [products.id],
  }),
  variant: one(product_variants, {
    fields: [order_items.variantId],
    references: [product_variants.id],
  }),
}));

export const cartsRelations = relations(carts, ({ one, many }) => ({
  user: one(users, {
    fields: [carts.userId],
    references: [users.id],
  }),
  items: many(cart_items),
}));

export const cartItemsRelations = relations(cart_items, ({ one }) => ({
  cart: one(carts, {
    fields: [cart_items.cartId],
    references: [carts.id],
  }),
  product: one(products, {
    fields: [cart_items.productId],
    references: [products.id],
  }),
  variant: one(product_variants, {
    fields: [cart_items.variantId],
    references: [product_variants.id],
  }),
}));
