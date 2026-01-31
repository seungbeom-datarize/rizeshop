import type { Coupon } from '@/types';

export const coupons: Coupon[] = [
  {
    id: 1,
    code: 'WELCOME10',
    name: '신규 가입 10% 할인',
    discountType: 'percentage',
    discountValue: 10,
    minPurchase: 30000,
    expiresAt: '2026-12-31T23:59:59Z',
  },
  {
    id: 2,
    code: 'FREESHIP',
    name: '무료 배송 쿠폰',
    discountType: 'fixed',
    discountValue: 3000,
    minPurchase: 0,
    expiresAt: '2026-06-30T23:59:59Z',
  },
  {
    id: 3,
    code: 'SUMMER20',
    name: '여름 특가 20% 할인',
    discountType: 'percentage',
    discountValue: 20,
    minPurchase: 50000,
    expiresAt: '2026-08-31T23:59:59Z',
  },
];

export function getCouponByCode(code: string): Coupon | undefined {
  return coupons.find((c) => c.code.toUpperCase() === code.toUpperCase());
}
