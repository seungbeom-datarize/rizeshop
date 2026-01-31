'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { Category } from '@/types';

interface CategoryFilterProps {
  categories: Category[];
  selected: string[];
  onChange: (slugs: string[]) => void;
}

export function CategoryFilter({ categories, selected, onChange }: CategoryFilterProps) {
  function toggle(slug: string) {
    if (selected.includes(slug)) {
      onChange(selected.filter((s) => s !== slug));
    } else {
      onChange([...selected, slug]);
    }
  }

  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold">카테고리</h4>
      <div className="space-y-2">
        {categories.map((cat) => (
          <div key={cat.id} className="flex items-center gap-2">
            <Checkbox
              id={`cat-${cat.slug}`}
              checked={selected.includes(cat.slug)}
              onCheckedChange={() => toggle(cat.slug)}
            />
            <Label htmlFor={`cat-${cat.slug}`} className="text-sm font-normal cursor-pointer">
              {cat.name}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
