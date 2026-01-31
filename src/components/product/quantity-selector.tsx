'use client';

import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuantitySelectorProps {
  value: number;
  max?: number;
  onChange: (value: number) => void;
}

export function QuantitySelector({ value, max = 99, onChange }: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="size-8"
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={value <= 1}
      >
        <Minus className="size-3" />
      </Button>
      <span className="w-10 text-center text-sm font-medium">{value}</span>
      <Button
        variant="outline"
        size="icon"
        className="size-8"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
      >
        <Plus className="size-3" />
      </Button>
    </div>
  );
}
