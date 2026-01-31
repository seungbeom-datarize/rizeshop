import { getProductsByCategory } from '@/data/products';
import { ProductGrid } from './product-grid';

interface RelatedProductsProps {
  categoryId: number;
  currentProductId: number;
}

export function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  const related = getProductsByCategory(categoryId)
    .filter((p) => p.id !== currentProductId)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">관련 상품</h2>
      <ProductGrid products={related} />
    </section>
  );
}
