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
import { products, getAllBrands } from '@/data/products';
import { categories, getCategoryBySlug } from '@/data/categories';
import { ITEMS_PER_PAGE } from '@/lib/constants';

function ProductListContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');
  const initialSort = searchParams.get('sort') || 'newest';

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : [],
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 4000000]);
  const [sortBy, setSortBy] = useState(initialSort);
  const [page, setPage] = useState(1);

  // Sync state when URL search params change (e.g. header category navigation)
  useEffect(() => {
    const cat = searchParams.get('category');
    setSelectedCategories(cat ? [cat] : []);
    const sort = searchParams.get('sort');
    if (sort) setSortBy(sort);
    setPage(1);
  }, [searchParams]);

  const allBrands = useMemo(() => getAllBrands(), []);
  const maxPrice = 4000000;

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategories.length > 0) {
      const catIds = selectedCategories
        .map((slug) => getCategoryBySlug(slug))
        .filter(Boolean)
        .map((c) => c!.id);
      // Include subcategories
      const allCatIds = new Set(catIds);
      categories.forEach((cat) => {
        if (cat.parentId && allCatIds.has(cat.parentId)) {
          allCatIds.add(cat.id);
        }
      });
      result = result.filter((p) => allCatIds.has(p.categoryId));
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
  }, [selectedCategories, selectedBrands, priceRange, sortBy]);

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
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm text-muted-foreground">{filteredProducts.length}개 상품</p>
              <ActiveFilters filters={activeFilters} onRemove={handleRemoveFilter} onClearAll={clearAll} />
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
