'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const PAYMENT_METHODS = [
  { value: 'card', label: '신용/체크카드' },
  { value: 'bank', label: '계좌이체' },
  { value: 'toss', label: '토스페이' },
  { value: 'kakao', label: '카카오페이' },
];

interface PaymentMethodSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function PaymentMethodSelector({ value, onChange }: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">결제 수단</h2>
      <RadioGroup value={value} onValueChange={onChange} className="grid grid-cols-2 gap-3">
        {PAYMENT_METHODS.map((method) => (
          <Label
            key={method.value}
            htmlFor={`pay-${method.value}`}
            className="flex cursor-pointer items-center gap-2 rounded-md border p-3 text-sm [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5"
          >
            <RadioGroupItem value={method.value} id={`pay-${method.value}`} />
            {method.label}
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
}
