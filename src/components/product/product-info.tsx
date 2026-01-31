import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/format';
import { getAverageRating, getReviewCount } from '@/data/reviews';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const rating = getAverageRating(product.id);
  const reviewCount = getReviewCount(product.id);

  return (
    <div className="space-y-3">
      {product.brand && (
        <p className="text-sm text-muted-foreground">{product.brand}</p>
      )}
      <h1 className="text-2xl font-bold">{product.name}</h1>

      {reviewCount > 0 && (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`size-4 ${
                  i < Math.round(rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-muted text-muted'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {rating} ({reviewCount}개 리뷰)
          </span>
        </div>
      )}

      <p className="text-3xl font-bold">{formatPrice(product.price)}</p>

      <Badge variant={product.stock > 0 ? 'secondary' : 'destructive'}>
        {product.stock > 0 ? `재고 ${product.stock}개` : '품절'}
      </Badge>
    </div>
  );
}
