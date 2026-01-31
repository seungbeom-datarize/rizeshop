'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface BrandFilterProps {
  brands: string[];
  selected: string[];
  onChange: (brands: string[]) => void;
}

export function BrandFilter({ brands, selected, onChange }: BrandFilterProps) {
  function toggle(brand: string) {
    if (selected.includes(brand)) {
      onChange(selected.filter((b) => b !== brand));
    } else {
      onChange([...selected, brand]);
    }
  }

  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold">브랜드</h4>
      <div className="space-y-2">
        {brands.map((brand) => (
          <div key={brand} className="flex items-center gap-2">
            <Checkbox
              id={`brand-${brand}`}
              checked={selected.includes(brand)}
              onCheckedChange={() => toggle(brand)}
            />
            <Label htmlFor={`brand-${brand}`} className="text-sm font-normal cursor-pointer">
              {brand}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
