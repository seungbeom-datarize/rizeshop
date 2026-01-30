# Database Schema Design (RizeShop)

This document outlines the proposed database schema using Drizzle ORM (PostgreSQL).

## Users Table
- **id**: Serial PK.
- **email**: Unique, Not Null.
- **password**: Hashed string, Not Null.
- **role**: Enum ('user', 'admin'), Default 'user'.
- **name**: String (Optional).
- **created_at**: Timestamp.

## Categories Table
- **id**: Serial PK.
- **name**: String, Not Null.
- **slug**: Unique string (for URLs).
- **parent_id**: Self-relation (for subcategories, optional).

## Products Table
- **id**: Serial PK.
- **category_id**: FK to Categories.
- **name**: String, Not Null.
- **description**: Text.
- **price**: Integer (KRW), Not Null.
- **stock**: Integer, Not Null.
- **images**: JSON array (List of image URLs).
- **created_at**: Timestamp.

## Orders Table
- **id**: Serial PK.
- **user_id**: FK to Users (Nullable for guest checkout?).
- **status**: Enum ('pending', 'paid', 'shipped', 'cancelled').
- **total_amount**: Integer.
- **address**: Text (JSON or simple string).
- **created_at**: Timestamp.

## Order Items Table
- **id**: Serial PK.
- **order_id**: FK to Orders.
- **product_id**: FK to Products.
- **quantity**: Integer.
- **price**: Integer (Price at time of purchase).

## Carts Table
- **id**: Serial PK.
- **user_id**: FK to Users (Nullable for guest carts).
- **session_id**: String (For guest cart persistence, optional).
- **created_at**: Timestamp.
- **updated_at**: Timestamp.

## Cart Items Table
- **id**: Serial PK.
- **cart_id**: FK to Carts.
- **product_id**: FK to Products.
- **quantity**: Integer, Not Null.
