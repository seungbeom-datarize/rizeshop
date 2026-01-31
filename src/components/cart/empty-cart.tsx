import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <ShoppingCart className="mb-4 size-16 text-muted-foreground" />
      <h2 className="mb-2 text-xl font-bold">장바구니가 비어있습니다</h2>
      <p className="mb-6 text-muted-foreground">마음에 드는 상품을 담아보세요.</p>
      <Button asChild>
        <Link href="/products">쇼핑하러 가기</Link>
      </Button>
    </div>
  );
}
