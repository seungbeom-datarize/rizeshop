'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CartItemRow } from '@/components/cart/cart-item-row';
import { CartSummary } from '@/components/cart/cart-summary';
import { CouponInput } from '@/components/cart/coupon-input';
import { EmptyCart } from '@/components/cart/empty-cart';
import { useCart } from '@/hooks/use-cart';

export default function CartPage() {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-6">
        <h1 className="mb-6 text-2xl font-bold">장바구니</h1>
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold">장바구니</h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Cart items */}
        <div className="flex-1 space-y-3">
          {items.map((item) => (
            <CartItemRow key={`${item.productId}-${item.variantId}`} item={item} />
          ))}
        </div>

        {/* Sidebar */}
        <aside className="w-full space-y-4 lg:w-80">
          <CouponInput />
          <CartSummary />
          <Button className="w-full" size="lg" asChild>
            <Link href="/checkout">주문하기</Link>
          </Button>
          <Separator />
          <Button variant="outline" className="w-full" asChild>
            <Link href="/products">쇼핑 계속하기</Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}
