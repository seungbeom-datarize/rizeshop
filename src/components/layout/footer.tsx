import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold">RizeShop</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              합리적인 가격, 다양한 상품을 만나보세요.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">쇼핑</h4>
            <nav className="mt-2 flex flex-col gap-1">
              <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground">전체 상품</Link>
              <Link href="/products?sort=newest" className="text-sm text-muted-foreground hover:text-foreground">신상품</Link>
              <Link href="/products?sort=popular" className="text-sm text-muted-foreground hover:text-foreground">인기 상품</Link>
            </nav>
          </div>
          <div>
            <h4 className="font-semibold">고객 지원</h4>
            <nav className="mt-2 flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">FAQ</span>
              <span className="text-sm text-muted-foreground">배송 안내</span>
              <span className="text-sm text-muted-foreground">반품/교환</span>
            </nav>
          </div>
          <div>
            <h4 className="font-semibold">고객센터</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              평일 09:00 ~ 18:00
              <br />
              점심 12:00 ~ 13:00
              <br />
              주말/공휴일 휴무
            </p>
          </div>
        </div>
        <Separator className="my-8" />
        <p className="text-center text-sm text-muted-foreground">
          &copy; 2026 RizeShop. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
