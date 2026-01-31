'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShippingForm } from '@/components/checkout/shipping-form';
import { OrderSummaryPanel } from '@/components/checkout/order-summary-panel';
import { PaymentMethodSelector } from '@/components/checkout/payment-method-selector';
import { TermsCheckboxes } from '@/components/checkout/terms-checkboxes';
import { CouponInput } from '@/components/cart/coupon-input';
import { EmptyCart } from '@/components/cart/empty-cart';
import { useCart } from '@/hooks/use-cart';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart, getTotal } = useCart();

  const [shipping, setShipping] = useState({
    recipientName: '',
    phone: '',
    postalCode: '',
    address: '',
    addressDetail: '',
    deliveryNotes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('card');

  const [terms, setTerms] = useState({
    orderConfirm: false,
    termsOfService: false,
    privacyPolicy: false,
  });

  const allTermsAccepted = terms.orderConfirm && terms.termsOfService && terms.privacyPolicy;
  const isFormValid =
    shipping.recipientName.trim() !== '' &&
    shipping.phone.trim() !== '' &&
    shipping.address.trim() !== '' &&
    allTermsAccepted;

  function handlePlaceOrder() {
    const orderId = `RIZE-${Date.now()}`;
    const total = getTotal();
    clearCart();
    router.push(`/order/complete?orderId=${orderId}&total=${total}`);
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-6">
        <h1 className="mb-6 text-2xl font-bold">주문/결제</h1>
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold">주문/결제</h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Left: Forms */}
        <div className="flex-1 space-y-8">
          <ShippingForm data={shipping} onChange={setShipping} />
          <Separator />
          <PaymentMethodSelector value={paymentMethod} onChange={setPaymentMethod} />
          <Separator />
          <TermsCheckboxes state={terms} onChange={setTerms} />
        </div>

        {/* Right: Summary */}
        <aside className="w-full space-y-4 lg:w-96">
          <OrderSummaryPanel />
          <CouponInput />
          <Button
            className="w-full"
            size="lg"
            onClick={handlePlaceOrder}
            disabled={!isFormValid}
          >
            주문하기
          </Button>
          {!allTermsAccepted && (
            <p className="text-center text-xs text-muted-foreground">
              모든 약관에 동의해주세요
            </p>
          )}
          <Button variant="ghost" className="w-full" asChild>
            <Link href="/cart">장바구니로 돌아가기</Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}
