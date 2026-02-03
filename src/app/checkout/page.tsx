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
import client from '@/lib/client';
import { useToast } from '@/hooks/use-toast';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart, getTotal } = useCart();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  async function handlePlaceOrder() {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const orderData = {
        items: items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId || undefined,
          quantity: item.quantity,
          price: item.variant?.additionalPrice
            ? item.product.price + item.variant.additionalPrice
            : item.product.price,
        })),
        shippingAddress: {
          recipientName: shipping.recipientName,
          phone: shipping.phone,
          postalCode: shipping.postalCode,
          address: shipping.address,
          addressDetail: shipping.addressDetail || undefined,
        },
        paymentMethod,
        deliveryNotes: shipping.deliveryNotes || undefined,
        totalAmount: getTotal(),
      };

      console.log('Order data:', orderData);

      const res = await client.api.orders.$post({
        json: orderData,
      });

      if (!res.ok) {
        const error = await res.json();
        console.error('Order API error:', error);
        throw new Error(error.error || '주문에 실패했습니다.');
      }

      const { order } = await res.json();
      clearCart();
      router.push(`/order/complete?orderId=${order.id}&total=${order.totalAmount}`);
    } catch (error: any) {
      console.error('Order error:', error);
      toast({
        title: '주문 실패',
        description: error.message || '주문 중 오류가 발생했습니다.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
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
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? '주문 처리 중...' : '주문하기'}
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
