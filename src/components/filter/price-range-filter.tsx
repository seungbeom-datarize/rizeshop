'use client';

import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { formatPrice } from '@/lib/format';

interface PriceRangeFilterProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export function PriceRangeFilter({ min, max, value, onChange }: PriceRangeFilterProps) {
  return (
    <div>
      <Label className="mb-3 block text-sm font-semibold">가격 범위</Label>
      <Slider
        min={min}
        max={max}
        step={5000}
        value={value}
        onValueChange={(v) => onChange(v as [number, number])}
        className="mt-2"
      />
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>{formatPrice(value[0])}</span>
        <span>{formatPrice(value[1])}</span>
      </div>
    </div>
  );
}
