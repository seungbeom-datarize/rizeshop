'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/lib/format';

export function OrderSummaryPanel() {
  const { items, getSubtotal, getShipping, getDiscount, getTotal } = useCart();
  const subtotal = getSubtotal();
  const shipping = getShipping();
  const discount = getDiscount();
  const total = getTotal();

  return (
    <Card className="p-6">
      <h3 className="mb-4 font-semibold">주문 상품</h3>
      <div className="space-y-3">
        {items.map((item) => {
          const unitPrice = item.product.price + (item.variant?.additionalPrice ?? 0);
          return (
            <div
              key={`${item.productId}-${item.variantId}`}
              className="flex items-center gap-3"
            >
              <div className="relative size-12 shrink-0 overflow-hidden rounded-md bg-muted">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="flex-1 text-sm">
                <p className="line-clamp-1 font-medium">{item.product.name}</p>
                {item.variant && (
                  <p className="text-xs text-muted-foreground">
                    {item.variant.name}: {item.variant.value}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">수량: {item.quantity}</p>
              </div>
              <p className="text-sm font-medium">{formatPrice(unitPrice * item.quantity)}</p>
            </div>
          );
        })}
      </div>
      <Separator className="my-4" />
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
      <Separator className="my-4" />
      <div className="flex justify-between text-lg font-bold">
        <span>총 결제금액</span>
        <span>{formatPrice(total)}</span>
      </div>
    </Card>
  );
}
