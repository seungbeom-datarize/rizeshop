'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
import { getReviewsByProductId } from '@/data/reviews';
import { getCategoryById } from '@/data/categories';
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/lib/format';
import client from '@/lib/client';
import type { Product, ProductVariant } from '@/types';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const productId = Number(params.id);

  const [product, setProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await (client.api.products[':id'] as any).$get({
          param: { id: productId.toString() },
        });

        if (res.ok) {
          const data = await res.json();
          setProduct(data.product);
          setVariants(data.variants || []);
        } else {
          router.push('/products');
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
        router.push('/products');
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [productId, router]);

  if (isLoading) {
    return (
      <div className="py-20 text-center text-muted-foreground">로딩 중...</div>
    );
  }

  if (!product) {
    return null;
  }

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
    if (!product) return;
    const variant = getSelectedVariant();
    addItem(product, variant, quantity);
    toast.success('장바구니에 추가되었습니다', {
      description: `${product.name} x ${quantity}`,
    });
  }

  function handleBuyNow() {
    if (!product) return;
    const variant = getSelectedVariant();
    addItem(product, variant, quantity);
    router.push('/checkout');
  }

  const totalPrice = product
    ? (product.price + (getSelectedVariant()?.additionalPrice ?? 0)) * quantity
    : 0;

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
