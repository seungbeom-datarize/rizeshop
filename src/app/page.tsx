import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ProductGrid } from '@/components/product/product-grid';
import { getNewArrivals, getPopularProducts } from '@/data/products';
import { getTopLevelCategories } from '@/data/categories';
import { banners } from '@/data/banners';

export default function HomePage() {
  const newArrivals = getNewArrivals(8);
  const popularProducts = getPopularProducts(8);
  const topCategories = getTopLevelCategories();

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-[300px] overflow-hidden bg-muted sm:h-[400px]">
        <Image
          src={banners[0].imageUrl}
          alt={banners[0].title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-3xl font-bold sm:text-5xl">{banners[0].title}</h1>
          <p className="mt-2 text-lg sm:text-xl">{banners[0].subtitle}</p>
          <Button className="mt-6" size="lg" asChild>
            <Link href={banners[0].linkUrl}>
              쇼핑하기 <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Category Navigation */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-bold">카테고리</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {topCategories.map((cat) => (
              <Link key={cat.id} href={`/products?category=${cat.slug}`}>
                <Card className="group cursor-pointer transition-shadow hover:shadow-md">
                  <CardContent className="flex items-center justify-center p-6">
                    <span className="text-sm font-medium group-hover:text-primary">
                      {cat.name}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* New Arrivals */}
        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">신상품</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/products?sort=newest">
                전체보기 <ArrowRight className="ml-1 size-3" />
              </Link>
            </Button>
          </div>
          <ProductGrid products={newArrivals} showCategory />
        </section>

        <Separator className="my-10" />

        {/* Popular Products */}
        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">인기 상품</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/products?sort=popular">
                전체보기 <ArrowRight className="ml-1 size-3" />
              </Link>
            </Button>
          </div>
          <ProductGrid products={popularProducts} showCategory />
        </section>

        {/* Promo Banner */}
        <section className="relative overflow-hidden rounded-lg bg-primary p-8 text-center text-primary-foreground sm:p-12">
          <h2 className="text-2xl font-bold">신규 가입 10% 할인</h2>
          <p className="mt-2">쿠폰코드 WELCOME10을 입력하세요</p>
          <Button variant="secondary" className="mt-4" asChild>
            <Link href="/products">상품 둘러보기</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
