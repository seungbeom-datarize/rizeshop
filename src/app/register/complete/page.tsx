import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function RegisterCompletePage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md items-center px-4 py-12">
      <Card className="w-full">
        <CardContent className="pt-8 text-center">
          <CheckCircle2 className="mx-auto mb-4 size-16 text-green-500" />
          <h1 className="mb-2 text-2xl font-bold">회원가입 완료!</h1>
          <p className="mb-8 text-muted-foreground">
            RizeShop에 오신 것을 환영합니다.
            <br />
            로그인하여 다양한 상품을 만나보세요.
          </p>
          <div className="flex flex-col gap-3">
            <Button asChild>
              <Link href="/login">로그인하기</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">쇼핑 시작하기</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
