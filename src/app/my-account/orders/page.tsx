'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate, formatPrice } from '@/lib/format';
import client from '@/lib/client';

type Order = {
  id: number;
  status: string;
  totalAmount: number;
  createdAt: string;
  paymentMethod: string | null;
  shippingAddress: {
    recipientName: string | null;
    phone: string | null;
    address: string | null;
    addressDetail: string | null;
  } | null;
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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await client.api.orders.$get();
        if (res.ok) {
          const data = await res.json();
          setOrders(data.orders);
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="py-20 text-center text-muted-foreground">로딩 중...</div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">주문 내역</h1>
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-20">
            <Package className="size-12 text-muted-foreground" />
            <div className="text-center">
              <p className="font-medium">주문 내역이 없습니다.</p>
              <p className="text-sm text-muted-foreground">
                첫 주문을 시작해보세요!
              </p>
            </div>
            <Link
              href="/"
              className="text-sm font-medium text-primary hover:underline"
            >
              쇼핑 시작하기
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">주문 내역</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <Link key={order.id} href={`/my-account/orders/${order.id}`}>
            <Card className="transition-colors hover:bg-muted/50">
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">주문번호 {order.id}</span>
                    <Badge variant={statusColors[order.status]}>
                      {statusLabels[order.status]}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(order.createdAt)}
                  </div>
                  {order.shippingAddress && (
                    <div className="text-sm text-muted-foreground">
                      {order.shippingAddress.recipientName} ·{' '}
                      {order.shippingAddress.address}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg font-bold">
                      {formatPrice(order.totalAmount)}
                    </div>
                    {order.paymentMethod && (
                      <div className="text-sm text-muted-foreground">
                        {order.paymentMethod}
                      </div>
                    )}
                  </div>
                  <ChevronRight className="size-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
