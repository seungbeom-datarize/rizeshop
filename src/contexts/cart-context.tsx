'use client';

import { createContext, useReducer, useEffect, useCallback, type ReactNode } from 'react';
import type { CartItem, Product, ProductVariant } from '@/types';
import { getCouponByCode } from '@/data/coupons';
import { SHIPPING_FEE, FREE_SHIPPING_THRESHOLD } from '@/lib/constants';

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; variant: ProductVariant | null; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: number; variantId: number | null } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; variantId: number | null; quantity: number } }
  | { type: 'APPLY_COUPON'; payload: { code: string } }
  | { type: 'REMOVE_COUPON' }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE'; payload: { items: CartItem[]; couponCode: string | null } };

interface CartState {
  items: CartItem[];
  couponCode: string | null;
}

export interface CartContextValue {
  items: CartItem[];
  couponCode: string | null;
  itemCount: number;
  addItem: (product: Product, variant: ProductVariant | null, quantity: number) => void;
  removeItem: (productId: number, variantId: number | null) => void;
  updateQuantity: (productId: number, variantId: number | null, quantity: number) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getShipping: () => number;
  getDiscount: () => number;
  getTotal: () => number;
}

const STORAGE_KEY = 'rizeshop-cart';

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, variant, quantity } = action.payload;
      const existingIndex = state.items.findIndex(
        (item) => item.productId === product.id && item.variantId === (variant?.id ?? null),
      );
      if (existingIndex >= 0) {
        const updated = [...state.items];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return { ...state, items: updated };
      }
      return {
        ...state,
        items: [
          ...state.items,
          { productId: product.id, variantId: variant?.id ?? null, quantity, product, variant },
        ],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(item.productId === action.payload.productId && item.variantId === action.payload.variantId),
        ),
      };
    case 'UPDATE_QUANTITY': {
      const updated = state.items.map((item) =>
        item.productId === action.payload.productId && item.variantId === action.payload.variantId
          ? { ...item, quantity: action.payload.quantity }
          : item,
      );
      return { ...state, items: updated };
    }
    case 'APPLY_COUPON':
      return { ...state, couponCode: action.payload.code };
    case 'REMOVE_COUPON':
      return { ...state, couponCode: null };
    case 'CLEAR_CART':
      return { items: [], couponCode: null };
    case 'HYDRATE':
      return { items: action.payload.items, couponCode: action.payload.couponCode };
    default:
      return state;
  }
}

export const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], couponCode: null });

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        dispatch({ type: 'HYDRATE', payload: parsed });
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items, couponCode: state.couponCode }));
  }, [state.items, state.couponCode]);

  const addItem = useCallback(
    (product: Product, variant: ProductVariant | null, quantity: number) => {
      dispatch({ type: 'ADD_ITEM', payload: { product, variant, quantity } });
    },
    [],
  );

  const removeItem = useCallback((productId: number, variantId: number | null) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, variantId } });
  }, []);

  const updateQuantity = useCallback(
    (productId: number, variantId: number | null, quantity: number) => {
      if (quantity <= 0) {
        dispatch({ type: 'REMOVE_ITEM', payload: { productId, variantId } });
      } else {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, variantId, quantity } });
      }
    },
    [],
  );

  const applyCoupon = useCallback((code: string): boolean => {
    const coupon = getCouponByCode(code);
    if (!coupon) return false;
    dispatch({ type: 'APPLY_COUPON', payload: { code: coupon.code } });
    return true;
  }, []);

  const removeCoupon = useCallback(() => {
    dispatch({ type: 'REMOVE_COUPON' });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const getSubtotal = useCallback((): number => {
    return state.items.reduce((sum, item) => {
      const variantExtra = item.variant?.additionalPrice ?? 0;
      return sum + (item.product.price + variantExtra) * item.quantity;
    }, 0);
  }, [state.items]);

  const getShipping = useCallback((): number => {
    const subtotal = state.items.reduce((sum, item) => {
      const variantExtra = item.variant?.additionalPrice ?? 0;
      return sum + (item.product.price + variantExtra) * item.quantity;
    }, 0);
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  }, [state.items]);

  const getDiscount = useCallback((): number => {
    if (!state.couponCode) return 0;
    const coupon = getCouponByCode(state.couponCode);
    if (!coupon) return 0;
    const subtotal = state.items.reduce((sum, item) => {
      const variantExtra = item.variant?.additionalPrice ?? 0;
      return sum + (item.product.price + variantExtra) * item.quantity;
    }, 0);
    if (subtotal < coupon.minPurchase) return 0;
    if (coupon.discountType === 'percentage') {
      return Math.round(subtotal * (coupon.discountValue / 100));
    }
    return coupon.discountValue;
  }, [state.items, state.couponCode]);

  const getTotal = useCallback((): number => {
    const subtotal = state.items.reduce((sum, item) => {
      const variantExtra = item.variant?.additionalPrice ?? 0;
      return sum + (item.product.price + variantExtra) * item.quantity;
    }, 0);
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    let discount = 0;
    if (state.couponCode) {
      const coupon = getCouponByCode(state.couponCode);
      if (coupon && subtotal >= coupon.minPurchase) {
        discount = coupon.discountType === 'percentage'
          ? Math.round(subtotal * (coupon.discountValue / 100))
          : coupon.discountValue;
      }
    }
    return Math.max(0, subtotal + shipping - discount);
  }, [state.items, state.couponCode]);

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        couponCode: state.couponCode,
        itemCount,
        addItem,
        removeItem,
        updateQuantity,
        applyCoupon,
        removeCoupon,
        clearCart,
        getSubtotal,
        getShipping,
        getDiscount,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
