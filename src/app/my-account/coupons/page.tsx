'use client';

import { useEffect, useState } from 'react';
import { Ticket, Calendar, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatDate, formatPrice } from '@/lib/format';
import client from '@/lib/client';

type UserCoupon = {
  id: number;
  status: string;
  usedAt: string | null;
  createdAt: string;
  coupon: {
    id: number;
    code: string;
    name: string;
    discountType: string;
    discountValue: number;
    minPurchase: number;
    expiresAt: string | null;
  };
};

const statusLabels: Record<string, string> = {
  available: '사용 가능',
  used: '사용 완료',
  expired: '만료됨',
};

const statusColors: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  available: 'default',
  used: 'secondary',
  expired: 'destructive',
};

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<UserCoupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCoupons() {
      try {
        const res = await client.api.coupons.$get();
        if (res.ok) {
          const data = await res.json();
          // Check if coupons are expired
          const now = new Date();
          const processedCoupons = data.coupons.map((c: UserCoupon) => {
            if (
              c.status === 'available' &&
              c.coupon.expiresAt &&
              new Date(c.coupon.expiresAt) < now
            ) {
              return { ...c, status: 'expired' };
            }
            return c;
          });
          setCoupons(processedCoupons);
        }
      } catch (error) {
        console.error('Failed to fetch coupons:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCoupons();
  }, []);

  if (isLoading) {
    return (
      <div className="py-20 text-center text-muted-foreground">로딩 중...</div>
    );
  }

  const availableCoupons = coupons.filter((c) => c.status === 'available');
  const usedCoupons = coupons.filter((c) => c.status !== 'available');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">쿠폰</h1>

      {availableCoupons.length === 0 && usedCoupons.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-20">
            <Ticket className="size-12 text-muted-foreground" />
            <div className="text-center">
              <p className="font-medium">보유한 쿠폰이 없습니다.</p>
              <p className="text-sm text-muted-foreground">
                쿠폰을 받아 할인 혜택을 누려보세요!
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Available Coupons */}
          {availableCoupons.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">
                사용 가능한 쿠폰 ({availableCoupons.length})
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {availableCoupons.map((userCoupon) => (
                  <CouponCard
                    key={userCoupon.id}
                    userCoupon={userCoupon}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Used/Expired Coupons */}
          {usedCoupons.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">
                사용 완료 / 만료 ({usedCoupons.length})
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {usedCoupons.map((userCoupon) => (
                  <CouponCard
                    key={userCoupon.id}
                    userCoupon={userCoupon}
                    disabled
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function CouponCard({
  userCoupon,
  disabled = false,
}: {
  userCoupon: UserCoupon;
  disabled?: boolean;
}) {
  const { coupon, status, usedAt } = userCoupon;

  const discountText =
    coupon.discountType === 'percentage'
      ? `${coupon.discountValue}% 할인`
      : `${formatPrice(coupon.discountValue)} 할인`;

  return (
    <Card className={disabled ? 'opacity-60' : ''}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{coupon.name}</CardTitle>
            <div className="mt-1 text-2xl font-bold text-primary">
              {discountText}
            </div>
          </div>
          <Badge variant={statusColors[status]}>{statusLabels[status]}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Separator />
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="size-4" />
            <span>
              {coupon.minPurchase > 0
                ? `${formatPrice(coupon.minPurchase)} 이상 구매 시`
                : '최소 구매 금액 없음'}
            </span>
          </div>
          {coupon.expiresAt && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="size-4" />
              <span>~{formatDate(coupon.expiresAt)}</span>
            </div>
          )}
          {usedAt && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Ticket className="size-4" />
              <span>사용일: {formatDate(usedAt)}</span>
            </div>
          )}
        </div>
        <Separator />
        <div className="rounded-md border border-dashed p-2 text-center">
          <code className="text-sm font-mono font-semibold">
            {coupon.code}
          </code>
        </div>
      </CardContent>
    </Card>
  );
}
