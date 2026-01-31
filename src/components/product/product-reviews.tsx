import { Star, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import type { Review } from '@/types';
import { formatDate } from '@/lib/format';

interface ProductReviewsProps {
  reviews: Review[];
}

export function ProductReviews({ reviews }: ProductReviewsProps) {
  if (reviews.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        아직 리뷰가 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {reviews.map((review, index) => (
        <div key={review.id}>
          {index > 0 && <Separator className="my-4" />}
          <div className="flex gap-3">
            <Avatar className="size-9">
              <AvatarFallback>
                <User className="size-4" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{review.userName}</span>
                <span className="text-xs text-muted-foreground">{formatDate(review.createdAt)}</span>
              </div>
              <div className="mt-0.5 flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-3 ${
                      i < review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-muted text-muted'
                    }`}
                  />
                ))}
              </div>
              {review.content && (
                <p className="mt-2 text-sm text-muted-foreground">{review.content}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
