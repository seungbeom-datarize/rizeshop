import type { Category } from '@/types';

export const categories: Category[] = [
  { id: 1, name: '스마트폰', slug: 'smartphones', parentId: null },
  { id: 2, name: '노트북', slug: 'laptops', parentId: null },
  { id: 3, name: '남성의류', slug: 'men-clothing', parentId: null },
  { id: 4, name: '여성의류', slug: 'women-clothing', parentId: null },
  { id: 5, name: '패션잡화', slug: 'fashion-accessories', parentId: null },
  { id: 6, name: '홈/리빙', slug: 'home-living', parentId: null },
];

export function getCategoryById(id: number): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getTopLevelCategories(): Category[] {
  return categories;
}
