'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { QuantitySelector } from '@/components/product/quantity-selector';
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/lib/format';
import type { CartItem } from '@/types';

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeItem } = useCart();
  const unitPrice = item.product.price + (item.variant?.additionalPrice ?? 0);
  const lineTotal = unitPrice * item.quantity;

  return (
    <Card className="p-4">
      <div className="flex gap-4">
        <Link href={`/products/${item.productId}`} className="shrink-0">
          <div className="relative size-20 overflow-hidden rounded-md bg-muted">
            <Image
              src={item.product.images[0]}
              alt={item.product.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
        </Link>
        <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <Link href={`/products/${item.productId}`} className="font-medium hover:underline">
              {item.product.name}
            </Link>
            {item.variant && (
              <p className="text-sm text-muted-foreground">
                {item.variant.name}: {item.variant.value}
              </p>
            )}
            <p className="text-sm font-medium">{formatPrice(unitPrice)}</p>
          </div>
          <div className="flex items-center gap-4">
            <QuantitySelector
              value={item.quantity}
              max={item.product.stock}
              onChange={(qty) => updateQuantity(item.productId, item.variantId, qty)}
            />
            <p className="w-24 text-right font-bold">{formatPrice(lineTotal)}</p>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground hover:text-destructive"
              onClick={() => removeItem(item.productId, item.variantId)}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
