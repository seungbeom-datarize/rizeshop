'use client';

import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/lib/format';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/constants';

export function CartSummary() {
  const { getSubtotal, getShipping, getDiscount, getTotal } = useCart();
  const subtotal = getSubtotal();
  const shipping = getShipping();
  const discount = getDiscount();
  const total = getTotal();

  return (
    <Card className="p-6">
      <h3 className="mb-4 font-semibold">주문 요약</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">소계</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">배송비</span>
          <span>{shipping === 0 ? '무료' : formatPrice(shipping)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-destructive">
            <span>할인</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}
      </div>
      {subtotal < FREE_SHIPPING_THRESHOLD && subtotal > 0 && (
        <p className="mt-2 text-xs text-muted-foreground">
          {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} 더 구매하면 무료배송!
        </p>
      )}
      <Separator className="my-4" />
      <div className="flex justify-between text-lg font-bold">
        <span>총 결제금액</span>
        <span>{formatPrice(total)}</span>
      </div>
    </Card>
  );
}
