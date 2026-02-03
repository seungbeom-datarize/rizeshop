'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatDate, formatPrice } from '@/lib/format';
import client from '@/lib/client';

type OrderItem = {
  id: number;
  quantity: number;
  price: number;
  product: {
    id: number;
    name: string;
    images: string[];
  };
};

type OrderDetail = {
  id: number;
  status: string;
  totalAmount: number;
  createdAt: string;
  paymentMethod: string | null;
  deliveryNotes: string | null;
  shippingAddress: {
    recipientName: string | null;
    phone: string | null;
    postalCode: string | null;
    address: string | null;
    addressDetail: string | null;
  } | null;
  items: OrderItem[];
};

const statusLabels: Record<string, string> = {
  pending: '결제 대기',
  paid: '결제 완료',
  shipped: '배송 중',
  delivered: '배송 완료',
  cancelled: '취소됨',
};

const statusColors: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  pending: 'outline',
  paid: 'secondary',
  shipped: 'default',
  delivered: 'default',
  cancelled: 'destructive',
};

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await (client.api.orders[':id'] as any).$get({
          param: { id: params.id as string },
        });
        if (res.ok) {
          const data = await res.json();
          setOrder(data.order);
        } else {
          router.push('/my-account/orders');
        }
      } catch (error) {
        console.error('Failed to fetch order:', error);
        router.push('/my-account/orders');
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrder();
  }, [params.id, router]);

  if (isLoading) {
    return (
      <div className="py-20 text-center text-muted-foreground">로딩 중...</div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push('/my-account/orders')}
        >
          <ArrowLeft className="size-4" />
        </Button>
        <h1 className="text-2xl font-bold">주문 상세</h1>
      </div>

      {/* Order Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>주문번호 {order.id}</CardTitle>
            <Badge variant={statusColors[order.status]}>
              {statusLabels[order.status]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">주문일</span>
            <span>{formatDate(order.createdAt)}</span>
          </div>
          {order.paymentMethod && (
            <>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">결제 수단</span>
                <span>{order.paymentMethod}</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Shipping Address */}
      {order.shippingAddress && (
        <Card>
          <CardHeader>
            <CardTitle>배송지 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">받는 분</span>
              <span>{order.shippingAddress.recipientName}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">연락처</span>
              <span>{order.shippingAddress.phone}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">우편번호</span>
              <span>{order.shippingAddress.postalCode}</span>
            </div>
            <Separator />
            <div className="space-y-1">
              <div className="text-muted-foreground">배송지</div>
              <div>
                {order.shippingAddress.address}
                {order.shippingAddress.addressDetail &&
                  `, ${order.shippingAddress.addressDetail}`}
              </div>
            </div>
            {order.deliveryNotes && (
              <>
                <Separator />
                <div className="space-y-1">
                  <div className="text-muted-foreground">배송 메모</div>
                  <div>{order.deliveryNotes}</div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>주문 상품</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="relative size-20 flex-shrink-0 overflow-hidden rounded-md border">
                {item.product.images?.[0] ? (
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center bg-muted">
                    <Package className="size-8 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="font-medium">{item.product.name}</div>
                  <div className="text-sm text-muted-foreground">
                    수량: {item.quantity}개
                  </div>
                </div>
                <div className="font-medium">{formatPrice(item.price)}</div>
              </div>
            </div>
          ))}
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>총 결제 금액</span>
            <span>{formatPrice(order.totalAmount)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
