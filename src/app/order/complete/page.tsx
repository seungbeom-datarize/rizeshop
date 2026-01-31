'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/format';

export default function OrderCompletePage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'RIZE-000000';
  const total = Number(searchParams.get('total')) || 0;

  // Estimated delivery: 3-5 business days
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4);
  const estimatedDelivery = deliveryDate.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-green-100">
        <CheckCircle2 className="size-8 text-green-600" />
      </div>

      <h1 className="text-2xl font-bold">주문이 완료되었습니다!</h1>
      <p className="mt-2 text-muted-foreground">
        감사합니다. 주문이 성공적으로 접수되었습니다.
      </p>

      <Card className="mt-8 p-6 text-left">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">주문번호</span>
            <span className="font-mono font-bold">{orderId}</span>
          </div>
          <Separator />
          {total > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">결제금액</span>
              <span className="font-bold">{formatPrice(total)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">배송 예정일</span>
            <span>{estimatedDelivery}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">주문 상태</span>
            <Badge variant="secondary">접수 완료</Badge>
          </div>
        </div>
      </Card>

      <p className="mt-6 text-sm text-muted-foreground">
        주문 확인 이메일이 발송됩니다. (목업)
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button asChild>
          <Link href="/">쇼핑 계속하기</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/products">상품 둘러보기</Link>
        </Button>
      </div>
    </div>
  );
}
