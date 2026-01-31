'use client';

import { useState } from 'react';
import { Tag, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { getCouponByCode } from '@/data/coupons';

export function CouponInput() {
  const { couponCode, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const activeCoupon = couponCode ? getCouponByCode(couponCode) : null;

  function handleApply() {
    setError('');
    const trimmed = code.trim();
    if (!trimmed) return;
    const success = applyCoupon(trimmed);
    if (success) {
      setCode('');
    } else {
      setError('유효하지 않은 쿠폰 코드입니다.');
    }
  }

  if (activeCoupon) {
    return (
      <div className="flex items-center gap-2 rounded-md border bg-muted/50 p-3 text-sm">
        <Tag className="size-4 text-primary" />
        <span className="flex-1">{activeCoupon.name}</span>
        <Button variant="ghost" size="icon" className="size-6" onClick={removeCoupon}>
          <X className="size-3" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div className="flex gap-2">
        <Input
          placeholder="쿠폰 코드 입력"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setError('');
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleApply()}
        />
        <Button variant="outline" size="sm" onClick={handleApply}>
          적용
        </Button>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
