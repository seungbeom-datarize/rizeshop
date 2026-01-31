# Database Schema Design (RizeShop)

This document outlines the database schema using Drizzle ORM (PostgreSQL).

## Enums

| Enum | Values |
|------|--------|
| `userRoleEnum` | `user`, `admin` |
| `orderStatusEnum` | `pending`, `paid`, `shipped`, `delivered`, `cancelled` |
| `discountTypeEnum` | `percentage`, `fixed` |
| `couponStatusEnum` | `available`, `used`, `expired` |

## Users Table
- **id**: Serial PK.
- **email**: Unique, varchar(255), Not Null.
- **password**: Hashed string, varchar(255), Not Null.
- **role**: Enum ('user', 'admin'), Default 'user'.
- **name**: varchar(100) (Optional).
- **phone**: varchar(20) (Optional).
- **profile_image**: Text (Optional, URL).
- **created_at**: Timestamp, Default now.

## Categories Table
- **id**: Serial PK.
- **name**: varchar(100), Not Null.
- **slug**: Unique varchar(100) (for URLs).
- **parent_id**: Self-relation (for subcategories, optional).

## Products Table
- **id**: Serial PK.
- **category_id**: FK to Categories, Not Null.
- **name**: varchar(255), Not Null.
- **description**: Text.
- **price**: Integer (KRW), Not Null.
- **stock**: Integer, Not Null, Default 0.
- **images**: JSONB array (List of image URLs), Default [].
- **brand**: varchar(100) (Optional, for filtering).
- **created_at**: Timestamp, Default now.

## Product Variants Table
- **id**: Serial PK.
- **product_id**: FK to Products, Not Null.
- **name**: varchar(100), Not Null (e.g., "Size", "Color").
- **value**: varchar(100), Not Null (e.g., "L", "Red").
- **additional_price**: Integer, Default 0.
- **stock**: Integer, Not Null, Default 0.

## Reviews Table
- **id**: Serial PK.
- **user_id**: FK to Users, Not Null.
- **product_id**: FK to Products, Not Null.
- **rating**: Integer, Not Null (1-5 stars).
- **content**: Text (Optional).
- **created_at**: Timestamp, Default now.

## Addresses Table
- **id**: Serial PK.
- **user_id**: FK to Users, Not Null.
- **label**: varchar(50) (Optional, e.g., "Home", "Office").
- **recipient_name**: varchar(100), Not Null.
- **phone**: varchar(20), Not Null.
- **postal_code**: varchar(10), Not Null.
- **address**: Text, Not Null.
- **address_detail**: Text (Optional).
- **is_default**: Boolean, Default false.
- **created_at**: Timestamp, Default now.

## Coupons Table
- **id**: Serial PK.
- **code**: Unique varchar(50), Not Null.
- **name**: varchar(100), Not Null.
- **discount_type**: Enum ('percentage', 'fixed'), Not Null.
- **discount_value**: Integer, Not Null.
- **min_purchase**: Integer, Default 0.
- **expires_at**: Timestamp (Optional).
- **created_at**: Timestamp, Default now.

## User Coupons Table
- **id**: Serial PK.
- **user_id**: FK to Users, Not Null.
- **coupon_id**: FK to Coupons, Not Null.
- **status**: Enum ('available', 'used', 'expired'), Default 'available'.
- **used_at**: Timestamp (Optional).
- **created_at**: Timestamp, Default now.

## Orders Table
- **id**: Serial PK.
- **user_id**: FK to Users (Nullable for guest checkout).
- **status**: Enum ('pending', 'paid', 'shipped', 'delivered', 'cancelled'), Default 'pending'.
- **total_amount**: Integer, Not Null.
- **shipping_address_id**: FK to Addresses (Optional).
- **payment_method**: varchar(50) (Optional).
- **delivery_notes**: Text (Optional).
- **coupon_id**: FK to Coupons (Optional).
- **created_at**: Timestamp, Default now.

## Order Items Table
- **id**: Serial PK.
- **order_id**: FK to Orders, Not Null.
- **product_id**: FK to Products, Not Null.
- **variant_id**: FK to Product Variants (Optional).
- **quantity**: Integer, Not Null.
- **price**: Integer (Price at time of purchase), Not Null.

## Carts Table
- **id**: Serial PK.
- **user_id**: FK to Users (Nullable for guest carts).
- **session_id**: varchar(255) (For guest cart persistence, optional).
- **created_at**: Timestamp, Default now.
- **updated_at**: Timestamp, Default now.

## Cart Items Table
- **id**: Serial PK.
- **cart_id**: FK to Carts, Not Null.
- **product_id**: FK to Products, Not Null.
- **variant_id**: FK to Product Variants (Optional).
- **quantity**: Integer, Not Null.

## Relations Summary

| Table | Relations |
|-------|----------|
| Users | → many Orders, Reviews, Addresses, UserCoupons, Carts |
| Categories | → one Parent Category, many Children Categories, many Products |
| Products | → one Category, many Variants, Reviews, OrderItems, CartItems |
| Product Variants | → one Product |
| Reviews | → one User, one Product |
| Addresses | → one User |
| Coupons | → many UserCoupons, Orders |
| User Coupons | → one User, one Coupon |
| Orders | → one User, one Address, one Coupon, many OrderItems |
| Order Items | → one Order, one Product, one Variant |
| Carts | → one User, many CartItems |
| Cart Items | → one Cart, one Product, one Variant |
