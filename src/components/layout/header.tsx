'use client';

import Link from 'next/link';
import { ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SearchBar } from './search-bar';
import { MobileNav } from './mobile-nav';
import { useCart } from '@/hooks/use-cart';
import { getTopLevelCategories } from '@/data/categories';

export function Header() {
  const { itemCount } = useCart();
  const topCategories = getTopLevelCategories();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4">
        {/* Top row */}
        <div className="flex h-16 items-center gap-4">
          <MobileNav />

          <Link href="/" className="shrink-0 text-xl font-bold">
            RizeShop
          </Link>

          <div className="hidden flex-1 justify-center md:flex">
            <SearchBar />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/my-account">
                <User className="size-5" />
                <span className="sr-only">마이페이지</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/cart">
                <ShoppingCart className="size-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -right-1 -top-1 flex size-5 items-center justify-center p-0 text-[10px]">
                    {itemCount}
                  </Badge>
                )}
                <span className="sr-only">장바구니</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="pb-3 md:hidden">
          <SearchBar />
        </div>

        {/* Desktop category nav */}
        <nav className="hidden h-10 items-center gap-6 lg:flex">
          <Link
            href="/products"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            전체 상품
          </Link>
          {topCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {cat.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
