'use client';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import type { ProductVariant } from '@/types';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selected: Record<string, string>;
  onChange: (name: string, value: string) => void;
}

export function VariantSelector({ variants, selected, onChange }: VariantSelectorProps) {
  // Group variants by name (e.g., "사이즈", "색상")
  const groups = variants.reduce<Record<string, ProductVariant[]>>((acc, v) => {
    if (!acc[v.name]) acc[v.name] = [];
    acc[v.name].push(v);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {Object.entries(groups).map(([name, options]) => (
        <div key={name}>
          <p className="mb-2 text-sm font-medium">
            {name}: <span className="text-muted-foreground">{selected[name] || '선택해주세요'}</span>
          </p>
          <ToggleGroup
            type="single"
            value={selected[name] || ''}
            onValueChange={(value) => {
              if (value) onChange(name, value);
            }}
            className="flex flex-wrap gap-2"
          >
            {options.map((opt) => (
              <ToggleGroupItem
                key={opt.id}
                value={opt.value}
                disabled={opt.stock === 0}
                className="border px-3 py-1 text-sm data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                {opt.value}
                {opt.stock === 0 && ' (품절)'}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      ))}
    </div>
  );
}
