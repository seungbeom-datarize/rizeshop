'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Package,
  Ticket,
  UserPen,
  MapPin,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/use-auth';
import { formatDate } from '@/lib/format';

const quickLinks = [
  { href: '/my-account/edit', icon: UserPen, label: '프로필 수정' },
  { href: '#', icon: Package, label: '주문 내역' },
  { href: '#', icon: Ticket, label: '쿠폰' },
  { href: '#', icon: MapPin, label: '배송지 관리' },
];

export default function MyAccountPage() {
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="py-20 text-center text-muted-foreground">로딩 중...</div>
    );
  }

  if (!user) return null;

  async function handleLogout() {
    await logout();
    router.push('/');
  }

  return (
    <div className="space-y-6">
      {/* Profile card */}
      <Card>
        <CardHeader>
          <CardTitle>내 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">이름</span>
              <span>{user.name || '-'}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">이메일</span>
              <span>{user.email}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">전화번호</span>
              <span>{user.phone || '-'}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">가입일</span>
              <span>{formatDate(user.createdAt)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {quickLinks.map((link) => (
          <Link key={link.label} href={link.href}>
            <Card className="transition-colors hover:bg-muted/50">
              <CardContent className="flex flex-col items-center gap-2 py-6">
                <link.icon className="size-6 text-muted-foreground" />
                <span className="text-sm font-medium">{link.label}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Logout */}
      <div className="flex justify-center">
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 size-4" />
          로그아웃
        </Button>
      </div>
    </div>
  );
}
