'use client';

import { Suspense, useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { ProductGrid } from '@/components/product/product-grid';
import { FilterSidebar } from '@/components/filter/filter-sidebar';
import { ActiveFilters } from '@/components/filter/active-filters';
import { SortDropdown } from '@/components/filter/sort-dropdown';
import { categories, getCategoryBySlug } from '@/data/categories';
import { ITEMS_PER_PAGE } from '@/lib/constants';
import client from '@/lib/client';
import type { Product } from '@/types';

function ProductListContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const sortParam = searchParams.get('sort');

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 4000000]);
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);

  // Fetch products when component mounts or category changes
  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      setIsLoading(true);
      try {
        const categoryData = categoryParam
          ? getCategoryBySlug(categoryParam)
          : null;

        const query: any = {};
        if (categoryData) {
          query.categoryId = categoryData.id.toString();
        }

        console.log('Fetching products:', { categoryParam, query });

        const res = await client.api.products.$get({ query });
        if (res.ok && !cancelled) {
          const data = await res.json();
          console.log('Products loaded:', {
            category: categoryParam,
            count: data.products.length,
          });
          setProducts(data.products as Product[]);
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Failed to fetch products:', error);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, [categoryParam]);

  // Sync filter state when URL search params change
  useEffect(() => {
    setSelectedCategories(categoryParam ? [categoryParam] : []);
    setSortBy(sortParam || 'newest');
    setSelectedBrands([]);
    setPriceRange([0, 4000000]);
    setPage(1);
  }, [categoryParam, sortParam]);

  const allBrands = useMemo(() => {
    const brands = new Set<string>();
    products.forEach((p) => {
      if (p.brand) brands.add(p.brand);
    });
    return Array.from(brands).sort();
  }, [products]);

  const maxPrice = 4000000;

  const filteredProducts = useMemo(() => {
    console.log('Filtering products:', {
      totalProducts: products.length,
      selectedCategories,
      selectedBrands,
      priceRange,
    });

    let result = [...products];

    // Filter by category
    if (selectedCategories.length > 0) {
      const catIds = selectedCategories
        .map((slug) => getCategoryBySlug(slug))
        .filter(Boolean)
        .map((c) => c!.id);

      console.log('Category filter:', { selectedCategories, catIds });
      result = result.filter((p) => catIds.includes(p.categoryId));
    }

    // Filter by brand
    if (selectedBrands.length > 0) {
      result = result.filter((p) => p.brand && selectedBrands.includes(p.brand));
    }

    // Filter by price
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popular':
      default:
        break;
    }

    return result;
  }, [products, selectedCategories, selectedBrands, priceRange, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  // Active filters for display
  const activeFilters = [
    ...selectedCategories.map((slug) => {
      const cat = getCategoryBySlug(slug);
      return { key: `cat-${slug}`, label: cat?.name || slug };
    }),
    ...selectedBrands.map((brand) => ({ key: `brand-${brand}`, label: brand })),
  ];

  function handleRemoveFilter(key: string) {
    if (key.startsWith('cat-')) {
      const slug = key.replace('cat-', '');
      setSelectedCategories((prev) => prev.filter((s) => s !== slug));
    } else if (key.startsWith('brand-')) {
      const brand = key.replace('brand-', '');
      setSelectedBrands((prev) => prev.filter((b) => b !== brand));
    }
  }

  function clearAll() {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, maxPrice]);
    setPage(1);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <Breadcrumbs items={[{ label: '홈', href: '/' }, { label: '전체 상품' }]} />

      <div className="mt-6 flex flex-col gap-8 lg:flex-row">
        {/* Mobile filter button */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="mr-2 size-4" />
                필터
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>필터</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <FilterSidebar
                  categories={categories}
                  brands={allBrands}
                  selectedCategories={selectedCategories}
                  selectedBrands={selectedBrands}
                  priceRange={priceRange}
                  maxPrice={maxPrice}
                  onCategoryChange={setSelectedCategories}
                  onBrandChange={setSelectedBrands}
                  onPriceChange={setPriceRange}
                  onClearAll={clearAll}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <FilterSidebar
            categories={categories}
            brands={allBrands}
            selectedCategories={selectedCategories}
            selectedBrands={selectedBrands}
            priceRange={priceRange}
            maxPrice={maxPrice}
            onCategoryChange={setSelectedCategories}
            onBrandChange={setSelectedBrands}
            onPriceChange={setPriceRange}
            onClearAll={clearAll}
          />
        </div>

        {/* Main content */}
        <div className="flex-1">
          {isLoading ? (
            <div className="py-20 text-center text-muted-foreground">
              로딩 중...
            </div>
          ) : (
            <>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-sm text-muted-foreground">
                    {filteredProducts.length}개 상품
                  </p>
                  <ActiveFilters
                    filters={activeFilters}
                    onRemove={handleRemoveFilter}
                    onClearAll={clearAll}
                  />
                </div>
                <SortDropdown value={sortBy} onChange={setSortBy} />
              </div>

              {paginatedProducts.length === 0 ? (
                <div className="py-20 text-center text-muted-foreground">
                  조건에 맞는 상품이 없습니다.
                </div>
              ) : (
                <ProductGrid products={paginatedProducts} />
              )}
            </>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                이전
              </Button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i}
                  variant={page === i + 1 ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                다음
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductListPage() {
  return (
    <Suspense>
      <ProductListContent />
    </Suspense>
  );
}
