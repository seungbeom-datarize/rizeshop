import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/format';
import { getAverageRating, getReviewCount } from '@/data/reviews';
import { getCategoryById } from '@/data/categories';

interface ProductCardProps {
  product: Product;
  showCategory?: boolean;
}

export function ProductCard({ product, showCategory }: ProductCardProps) {
  const rating = getAverageRating(product.id);
  const reviewCount = getReviewCount(product.id);
  const category = showCategory ? getCategoryById(product.categoryId) : null;

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-md">
      <Link href={`/products/${product.id}`}>
      <Link href={`/products/${product.id}`} data-dtr-track={product.id}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Badge variant="destructive">품절</Badge>
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-3">
        {category && (
          <Badge variant="secondary" className="mb-1 text-[10px]">
            {category.name}
          </Badge>
        )}
        <Link href={`/products/${product.id}`}>
        <Link href={`/products/${product.id}`} data-dtr-track={product.id}>
            {product.name}
          </h3>
        </Link>
        {reviewCount > 0 && (
          <div className="mt-1 flex items-center gap-1">
            <Star className="size-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-muted-foreground">
              {rating} ({reviewCount})
            </span>
          </div>
        )}
        <p className="mt-1 font-bold">{formatPrice(product.price)}</p>
        {product.brand && (
          <p className="text-xs text-muted-foreground">{product.brand}</p>
        )}
      </CardContent>
    </Card>
  );
}
