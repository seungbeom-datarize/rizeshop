'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/product/product-grid';
import { SortDropdown } from '@/components/filter/sort-dropdown';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { searchProducts, getPopularProducts } from '@/data/products';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [sortBy, setSortBy] = useState('newest');

  const results = useMemo(() => {
    const found = searchProducts(query);

    switch (sortBy) {
      case 'price-asc':
        return [...found].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...found].sort((a, b) => b.price - a.price);
      case 'newest':
        return [...found].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      default:
        return found;
    }
  }, [query, sortBy]);

  const popularProducts = useMemo(() => getPopularProducts(4), []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <Breadcrumbs items={[{ label: '홈', href: '/' }, { label: '검색' }]} />

      <div className="mt-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-bold">
            &ldquo;{query}&rdquo; 검색 결과{' '}
            <span className="text-muted-foreground font-normal text-base">({results.length}건)</span>
          </h1>
          {results.length > 0 && <SortDropdown value={sortBy} onChange={setSortBy} />}
        </div>

        {results.length > 0 ? (
          <ProductGrid products={results} showCategory />
        ) : (
          <div className="py-20 text-center">
            <Search className="mx-auto mb-4 size-12 text-muted-foreground" />
            <h2 className="mb-2 text-lg font-bold">
              &ldquo;{query}&rdquo;에 대한 검색 결과가 없습니다
            </h2>
            <p className="mb-6 text-muted-foreground">
              다른 검색어를 시도하거나 전체 상품을 둘러보세요.
            </p>
            <Button asChild>
              <Link href="/products">전체 상품 보기</Link>
            </Button>

            {/* Popular products */}
            <div className="mt-12">
              <h3 className="mb-4 text-lg font-semibold">인기 상품</h3>
              <ProductGrid products={popularProducts} showCategory />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
