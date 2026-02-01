export interface Category {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
}

export interface Product {
  id: number;
  categoryId: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  images: string[];
  brand: string | null;
  createdAt: string;
}

export interface ProductVariant {
  id: number;
  productId: number;
  name: string;
  value: string;
  additionalPrice: number;
  stock: number;
}

export interface Review {
  id: number;
  userId: number;
  productId: number;
  rating: number;
  content: string | null;
  createdAt: string;
  userName: string;
  userImage: string | null;
}

export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  linkUrl: string;
}

export interface Coupon {
  id: number;
  code: string;
  name: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minPurchase: number;
  expiresAt: string | null;
}

export interface User {
  id: number;
  email: string;
  name: string | null;
  phone: string | null;
  role: 'user' | 'admin';
  profileImage: string | null;
  createdAt: string;
}

export interface CartItem {
  productId: number;
  variantId: number | null;
  quantity: number;
  product: Product;
  variant: ProductVariant | null;
}
