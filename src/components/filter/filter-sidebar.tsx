'use client';

import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { CategoryFilter } from './category-filter';
import { PriceRangeFilter } from './price-range-filter';
import { BrandFilter } from './brand-filter';
import type { Category } from '@/types';

interface FilterSidebarProps {
  categories: Category[];
  brands: string[];
  selectedCategories: string[];
  selectedBrands: string[];
  priceRange: [number, number];
  maxPrice: number;
  onCategoryChange: (slugs: string[]) => void;
  onBrandChange: (brands: string[]) => void;
  onPriceChange: (range: [number, number]) => void;
  onClearAll: () => void;
}

export function FilterSidebar({
  categories,
  brands,
  selectedCategories,
  selectedBrands,
  priceRange,
  maxPrice,
  onCategoryChange,
  onBrandChange,
  onPriceChange,
  onClearAll,
}: FilterSidebarProps) {
  return (
    <aside className="w-full space-y-6 lg:w-60">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">필터</h3>
        <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={onClearAll}>
          초기화
        </Button>
      </div>
      <Separator />
      <CategoryFilter categories={categories} selected={selectedCategories} onChange={onCategoryChange} />
      <Separator />
      <PriceRangeFilter min={0} max={maxPrice} value={priceRange} onChange={onPriceChange} />
      <Separator />
      <BrandFilter brands={brands} selected={selectedBrands} onChange={onBrandChange} />
    </aside>
  );
}
