'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { getTopLevelCategories, getSubcategories } from '@/data/categories';

export function MobileNav() {
  const topCategories = getTopLevelCategories();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="size-5" />
          <span className="sr-only">메뉴</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle>
            <Link href="/" className="text-xl font-bold">
              RizeShop
            </Link>
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-1">
          <Link
            href="/products"
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
          >
            전체 상품
          </Link>
          <Separator className="my-2" />
          {topCategories.map((cat) => {
            const subs = getSubcategories(cat.id);
            return (
              <div key={cat.id}>
                <Link
                  href={`/products?category=${cat.slug}`}
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent block"
                >
                  {cat.name}
                </Link>
                {subs.length > 0 && (
                  <div className="ml-4 flex flex-col gap-1">
                    {subs.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/products?category=${sub.slug}`}
                        className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground block"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
