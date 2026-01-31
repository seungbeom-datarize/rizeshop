import type { Category } from '@/types';

export const categories: Category[] = [
  { id: 1, name: '전자기기', slug: 'electronics', parentId: null },
  { id: 2, name: '의류', slug: 'clothing', parentId: null },
  { id: 3, name: '패션잡화', slug: 'fashion-accessories', parentId: null },
  { id: 4, name: '홈/리빙', slug: 'home-living', parentId: null },
  { id: 5, name: '스마트폰', slug: 'smartphones', parentId: 1 },
  { id: 6, name: '노트북', slug: 'laptops', parentId: 1 },
  { id: 7, name: '남성의류', slug: 'men-clothing', parentId: 2 },
  { id: 8, name: '여성의류', slug: 'women-clothing', parentId: 2 },
];

export function getCategoryById(id: number): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getTopLevelCategories(): Category[] {
  return categories.filter((c) => c.parentId === null);
}

export function getSubcategories(parentId: number): Category[] {
  return categories.filter((c) => c.parentId === parentId);
}
