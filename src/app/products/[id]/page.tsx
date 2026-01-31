'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import { ShoppingCart, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { ProductImageGallery } from '@/components/product/product-image-gallery';
import { ProductInfo } from '@/components/product/product-info';
import { VariantSelector } from '@/components/product/variant-selector';
import { QuantitySelector } from '@/components/product/quantity-selector';
import { ProductReviews } from '@/components/product/product-reviews';
import { RelatedProducts } from '@/components/product/related-products';
import { getProductById, getVariantsByProductId } from '@/data/products';
import { getReviewsByProductId } from '@/data/reviews';
import { getCategoryById } from '@/data/categories';
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/lib/format';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const productId = Number(params.id);

  const maybeProduct = useMemo(() => getProductById(productId), [productId]);

  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);

  if (!maybeProduct) {
    notFound();
    throw new Error('Product not found');
  }

  const product = maybeProduct;
  const variants = getVariantsByProductId(productId);
  const reviews = getReviewsByProductId(productId);
  const category = getCategoryById(product.categoryId);

  function handleVariantChange(name: string, value: string) {
    setSelectedVariants((prev) => ({ ...prev, [name]: value }));
  }

  function getSelectedVariant() {
    if (variants.length === 0) return null;
    return variants.find((v) =>
      Object.entries(selectedVariants).some(
        ([name, value]) => v.name === name && v.value === value,
      ),
    ) ?? null;
  }

  function handleAddToCart() {
    const variant = getSelectedVariant();
    addItem(product, variant, quantity);
    toast.success('장바구니에 추가되었습니다', {
      description: `${product.name} x ${quantity}`,
    });
  }

  function handleBuyNow() {
    const variant = getSelectedVariant();
    addItem(product, variant, quantity);
    router.push('/checkout');
  }

  const totalPrice = (product.price + (getSelectedVariant()?.additionalPrice ?? 0)) * quantity;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <Breadcrumbs
        items={[
          { label: '홈', href: '/' },
          { label: category?.name ?? '상품', href: `/products?category=${category?.slug}` },
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        {/* Left: Images */}
        <ProductImageGallery images={product.images} productName={product.name} />

        {/* Right: Product Info + Actions */}
        <div className="space-y-6">
          <ProductInfo product={product} />

          {variants.length > 0 && (
            <>
              <Separator />
              <VariantSelector
                variants={variants}
                selected={selectedVariants}
                onChange={handleVariantChange}
              />
            </>
          )}

          <Separator />

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">수량</span>
            <QuantitySelector value={quantity} max={product.stock} onChange={setQuantity} />
          </div>

          <div className="text-xl font-bold">
            총 금액: {formatPrice(totalPrice)}
          </div>

          <div className="flex gap-3">
            <Button
              className="flex-1"
              size="lg"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 size-4" />
              장바구니 담기
            </Button>
            <Button
              className="flex-1"
              size="lg"
              variant="outline"
              onClick={handleBuyNow}
              disabled={product.stock === 0}
            >
              <Zap className="mr-2 size-4" />
              바로 구매
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs: Description / Reviews */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList>
            <TabsTrigger value="description">상세 정보</TabsTrigger>
            <TabsTrigger value="reviews">리뷰 ({reviews.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4">
            <div className="prose max-w-none">
              <p className="text-muted-foreground">{product.description || '상품 설명이 없습니다.'}</p>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            <ProductReviews reviews={reviews} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <RelatedProducts categoryId={product.categoryId} currentProductId={product.id} />
      </div>
    </div>
  );
}
