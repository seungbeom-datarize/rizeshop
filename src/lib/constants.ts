export const SORT_OPTIONS = [
  { value: 'newest', label: '최신순' },
  { value: 'price-asc', label: '가격 낮은순' },
  { value: 'price-desc', label: '가격 높은순' },
  { value: 'popular', label: '인기순' },
] as const;

export const ITEMS_PER_PAGE = 12;
export const SHIPPING_FEE = 3000;
export const FREE_SHIPPING_THRESHOLD = 50000;
