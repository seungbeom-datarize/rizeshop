import type { Product, ProductVariant } from '@/types';

export const products: Product[] = [
  // Electronics - Smartphones
  { id: 1, categoryId: 5, name: '갤럭시 S25 울트라', description: '최신 AI 기능이 탑재된 프리미엄 스마트폰. 2억 화소 카메라와 티타늄 프레임으로 완성된 플래그십 모델입니다.', price: 1599000, stock: 15, images: ['https://picsum.photos/seed/galaxy-s25-1/600/600', 'https://picsum.photos/seed/galaxy-s25-2/600/600', 'https://picsum.photos/seed/galaxy-s25-3/600/600'], brand: 'Samsung', createdAt: '2026-01-15T09:00:00Z' },
  { id: 2, categoryId: 5, name: '아이폰 17 프로', description: '차세대 A19 Pro 칩과 혁신적인 카메라 시스템. ProMotion 디스플레이와 올데이 배터리 라이프.', price: 1790000, stock: 10, images: ['https://picsum.photos/seed/iphone17-1/600/600', 'https://picsum.photos/seed/iphone17-2/600/600', 'https://picsum.photos/seed/iphone17-3/600/600'], brand: 'Apple', createdAt: '2026-01-20T09:00:00Z' },
  { id: 3, categoryId: 5, name: '픽셀 10 프로', description: 'Google AI가 만든 최고의 스마트폰 경험. Tensor G5 칩과 놀라운 사진 편집 기능.', price: 1290000, stock: 8, images: ['https://picsum.photos/seed/pixel10-1/600/600', 'https://picsum.photos/seed/pixel10-2/600/600'], brand: 'Google', createdAt: '2026-01-10T09:00:00Z' },

  // Electronics - Laptops
  { id: 4, categoryId: 6, name: '맥북 프로 16인치 M5', description: 'M5 Pro 칩 탑재, 40GB 통합 메모리. 크리에이티브 전문가를 위한 궁극의 노트북.', price: 3490000, stock: 5, images: ['https://picsum.photos/seed/macbook-m5-1/600/600', 'https://picsum.photos/seed/macbook-m5-2/600/600', 'https://picsum.photos/seed/macbook-m5-3/600/600'], brand: 'Apple', createdAt: '2026-01-18T09:00:00Z' },
  { id: 5, categoryId: 6, name: '갤럭시북 4 프로', description: '인텔 코어 울트라 프로세서와 AMOLED 디스플레이. 가볍고 강력한 비즈니스 노트북.', price: 1890000, stock: 12, images: ['https://picsum.photos/seed/galaxybook4-1/600/600', 'https://picsum.photos/seed/galaxybook4-2/600/600'], brand: 'Samsung', createdAt: '2026-01-12T09:00:00Z' },
  { id: 6, categoryId: 6, name: 'LG 그램 17', description: '17인치 대화면에 1.35kg 초경량. 하루 종일 쓸 수 있는 80Wh 대용량 배터리.', price: 1690000, stock: 7, images: ['https://picsum.photos/seed/lg-gram17-1/600/600', 'https://picsum.photos/seed/lg-gram17-2/600/600'], brand: 'LG', createdAt: '2026-01-08T09:00:00Z' },

  // Clothing - Men
  { id: 7, categoryId: 7, name: '에어리즘 코튼 오버사이즈 티셔츠', description: '쾌적한 에어리즘 소재의 오버사이즈 핏. 일상에서 편안하게 입을 수 있는 기본 아이템.', price: 19900, stock: 50, images: ['https://picsum.photos/seed/airism-tee-1/600/600', 'https://picsum.photos/seed/airism-tee-2/600/600', 'https://picsum.photos/seed/airism-tee-3/600/600'], brand: 'Uniqlo', createdAt: '2026-01-25T09:00:00Z' },
  { id: 8, categoryId: 7, name: '울트라 스트레치 데님 팬츠', description: '360도 스트레치 소재로 어떤 움직임에도 편안한 데님. 슬림핏 디자인.', price: 49900, stock: 30, images: ['https://picsum.photos/seed/stretch-denim-1/600/600', 'https://picsum.photos/seed/stretch-denim-2/600/600'], brand: 'Uniqlo', createdAt: '2026-01-22T09:00:00Z' },
  { id: 9, categoryId: 7, name: '나이키 테크 플리스 조거', description: '가볍고 따뜻한 테크 플리스 소재. 현대적인 실루엣의 조거 팬츠.', price: 129000, stock: 20, images: ['https://picsum.photos/seed/nike-jogger-1/600/600', 'https://picsum.photos/seed/nike-jogger-2/600/600', 'https://picsum.photos/seed/nike-jogger-3/600/600'], brand: 'Nike', createdAt: '2026-01-19T09:00:00Z' },
  { id: 10, categoryId: 7, name: '아디다스 울트라부스트 5', description: '최고의 쿠셔닝을 제공하는 부스트 미드솔. 일상과 러닝 모두에 완벽한 스니커즈.', price: 219000, stock: 15, images: ['https://picsum.photos/seed/ultraboost5-1/600/600', 'https://picsum.photos/seed/ultraboost5-2/600/600'], brand: 'Adidas', createdAt: '2026-01-17T09:00:00Z' },

  // Clothing - Women
  { id: 11, categoryId: 8, name: '캐시미어 블렌드 니트 가디건', description: '부드러운 캐시미어 블렌드 소재. 어디에나 어울리는 클래식한 디자인.', price: 89900, stock: 25, images: ['https://picsum.photos/seed/cashmere-cardigan-1/600/600', 'https://picsum.photos/seed/cashmere-cardigan-2/600/600', 'https://picsum.photos/seed/cashmere-cardigan-3/600/600'], brand: 'Muji', createdAt: '2026-01-28T09:00:00Z' },
  { id: 12, categoryId: 8, name: '하이웨이스트 와이드 슬랙스', description: '깔끔한 실루엣의 와이드 핏 슬랙스. 오피스룩부터 캐주얼까지 다용도.', price: 59900, stock: 35, images: ['https://picsum.photos/seed/wide-slacks-1/600/600', 'https://picsum.photos/seed/wide-slacks-2/600/600'], brand: 'Zara', createdAt: '2026-01-26T09:00:00Z' },
  { id: 13, categoryId: 8, name: '플리츠 미디 스커트', description: '우아한 플리츠 디테일의 미디 길이 스커트. 시즌리스 아이템.', price: 45900, stock: 40, images: ['https://picsum.photos/seed/pleats-skirt-1/600/600', 'https://picsum.photos/seed/pleats-skirt-2/600/600'], brand: 'Zara', createdAt: '2026-01-24T09:00:00Z' },
  { id: 14, categoryId: 8, name: '나이키 에어맥스 97 여성', description: '아이코닉한 에어맥스 97 디자인. 풀 렝스 에어 유닛으로 편안한 착화감.', price: 189000, stock: 10, images: ['https://picsum.photos/seed/airmax97w-1/600/600', 'https://picsum.photos/seed/airmax97w-2/600/600'], brand: 'Nike', createdAt: '2026-01-21T09:00:00Z' },

  // Fashion Accessories
  { id: 15, categoryId: 3, name: '미니멀 가죽 토트백', description: '고급 풀그레인 가죽으로 제작된 미니멀한 디자인의 토트백. 노트북 수납 가능.', price: 159000, stock: 18, images: ['https://picsum.photos/seed/leather-tote-1/600/600', 'https://picsum.photos/seed/leather-tote-2/600/600', 'https://picsum.photos/seed/leather-tote-3/600/600'], brand: 'Muji', createdAt: '2026-01-27T09:00:00Z' },
  { id: 16, categoryId: 3, name: '클래식 메탈 선글라스', description: '가벼운 메탈 프레임과 UV400 렌즈. 클래식한 라운드 디자인.', price: 89000, stock: 22, images: ['https://picsum.photos/seed/sunglasses-1/600/600', 'https://picsum.photos/seed/sunglasses-2/600/600'], brand: 'Gentle Monster', createdAt: '2026-01-23T09:00:00Z' },
  { id: 17, categoryId: 3, name: '스테인리스 미니멀 워치', description: '심플한 다이얼과 스테인리스 스틸 밴드. 일상에서 빛나는 미니멀 시계.', price: 249000, stock: 12, images: ['https://picsum.photos/seed/minimal-watch-1/600/600', 'https://picsum.photos/seed/minimal-watch-2/600/600'], brand: 'Daniel Wellington', createdAt: '2026-01-16T09:00:00Z' },
  { id: 18, categoryId: 3, name: '캔버스 크로스백', description: '가벼운 캔버스 소재의 데일리 크로스백. 실용적인 멀티 포켓 디자인.', price: 39900, stock: 45, images: ['https://picsum.photos/seed/canvas-crossbag-1/600/600', 'https://picsum.photos/seed/canvas-crossbag-2/600/600'], brand: 'Muji', createdAt: '2026-01-14T09:00:00Z' },

  // Home & Living
  { id: 19, categoryId: 4, name: '아로마 디퓨저 세트', description: '천연 에센셜 오일과 리드 디퓨저 세트. 편안한 향기로 가득한 공간을 만들어줍니다.', price: 35900, stock: 30, images: ['https://picsum.photos/seed/diffuser-1/600/600', 'https://picsum.photos/seed/diffuser-2/600/600'], brand: 'Muji', createdAt: '2026-01-29T09:00:00Z' },
  { id: 20, categoryId: 4, name: '코튼 이불 세트 (퀸)', description: '100% 오가닉 코튼 이불 + 베개커버 세트. 사계절 사용 가능.', price: 129000, stock: 20, images: ['https://picsum.photos/seed/bedding-set-1/600/600', 'https://picsum.photos/seed/bedding-set-2/600/600', 'https://picsum.photos/seed/bedding-set-3/600/600'], brand: 'Muji', createdAt: '2026-01-11T09:00:00Z' },
  { id: 21, categoryId: 4, name: '세라믹 디너 플레이트 세트', description: '수작업 느낌의 세라믹 플레이트 4개 세트. 식탁을 더 아름답게.', price: 58000, stock: 25, images: ['https://picsum.photos/seed/ceramic-plate-1/600/600', 'https://picsum.photos/seed/ceramic-plate-2/600/600'], brand: 'Zara Home', createdAt: '2026-01-09T09:00:00Z' },
  { id: 22, categoryId: 4, name: 'LED 데스크 램프', description: '밝기 5단계 조절, 색온도 3단계 변경 가능. 접이식 디자인으로 공간 절약.', price: 45000, stock: 35, images: ['https://picsum.photos/seed/desk-lamp-1/600/600', 'https://picsum.photos/seed/desk-lamp-2/600/600'], brand: 'Xiaomi', createdAt: '2026-01-07T09:00:00Z' },
  { id: 23, categoryId: 4, name: '스테인리스 텀블러 500ml', description: '진공 단열 구조로 12시간 보온/보냉. BPA-free 소재.', price: 28900, stock: 50, images: ['https://picsum.photos/seed/tumbler-1/600/600', 'https://picsum.photos/seed/tumbler-2/600/600'], brand: 'Stanley', createdAt: '2026-01-06T09:00:00Z' },
  { id: 24, categoryId: 4, name: '원목 수납 선반', description: '천연 원목으로 제작된 3단 오픈 선반. 모던한 인테리어에 어울리는 디자인.', price: 189000, stock: 8, images: ['https://picsum.photos/seed/wood-shelf-1/600/600', 'https://picsum.photos/seed/wood-shelf-2/600/600'], brand: 'IKEA', createdAt: '2026-01-05T09:00:00Z' },
];

export const productVariants: ProductVariant[] = [
  // Galaxy S25 Ultra - Colors
  { id: 1, productId: 1, name: '색상', value: '팬텀 블랙', additionalPrice: 0, stock: 5 },
  { id: 2, productId: 1, name: '색상', value: '티타늄 그레이', additionalPrice: 0, stock: 5 },
  { id: 3, productId: 1, name: '색상', value: '바이올렛', additionalPrice: 0, stock: 5 },
  // iPhone 17 Pro - Colors
  { id: 4, productId: 2, name: '색상', value: '내추럴 티타늄', additionalPrice: 0, stock: 4 },
  { id: 5, productId: 2, name: '색상', value: '블랙 티타늄', additionalPrice: 0, stock: 3 },
  { id: 6, productId: 2, name: '색상', value: '화이트 티타늄', additionalPrice: 0, stock: 3 },
  // Airism T-shirt - Sizes + Colors
  { id: 7, productId: 7, name: '사이즈', value: 'S', additionalPrice: 0, stock: 10 },
  { id: 8, productId: 7, name: '사이즈', value: 'M', additionalPrice: 0, stock: 15 },
  { id: 9, productId: 7, name: '사이즈', value: 'L', additionalPrice: 0, stock: 15 },
  { id: 10, productId: 7, name: '사이즈', value: 'XL', additionalPrice: 0, stock: 10 },
  { id: 11, productId: 7, name: '색상', value: '화이트', additionalPrice: 0, stock: 25 },
  { id: 12, productId: 7, name: '색상', value: '블랙', additionalPrice: 0, stock: 25 },
  // Nike Jogger - Sizes
  { id: 13, productId: 9, name: '사이즈', value: 'S', additionalPrice: 0, stock: 5 },
  { id: 14, productId: 9, name: '사이즈', value: 'M', additionalPrice: 0, stock: 8 },
  { id: 15, productId: 9, name: '사이즈', value: 'L', additionalPrice: 0, stock: 5 },
  { id: 16, productId: 9, name: '사이즈', value: 'XL', additionalPrice: 0, stock: 2 },
  // Cashmere Cardigan - Sizes + Colors
  { id: 17, productId: 11, name: '사이즈', value: 'S', additionalPrice: 0, stock: 5 },
  { id: 18, productId: 11, name: '사이즈', value: 'M', additionalPrice: 0, stock: 10 },
  { id: 19, productId: 11, name: '사이즈', value: 'L', additionalPrice: 0, stock: 10 },
  { id: 20, productId: 11, name: '색상', value: '베이지', additionalPrice: 0, stock: 10 },
  { id: 21, productId: 11, name: '색상', value: '그레이', additionalPrice: 0, stock: 8 },
  { id: 22, productId: 11, name: '색상', value: '네이비', additionalPrice: 0, stock: 7 },
  // Ultraboost 5 - Sizes
  { id: 23, productId: 10, name: '사이즈', value: '260', additionalPrice: 0, stock: 3 },
  { id: 24, productId: 10, name: '사이즈', value: '270', additionalPrice: 0, stock: 5 },
  { id: 25, productId: 10, name: '사이즈', value: '280', additionalPrice: 0, stock: 5 },
  { id: 26, productId: 10, name: '사이즈', value: '290', additionalPrice: 0, stock: 2 },
];

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getVariantsByProductId(productId: number): ProductVariant[] {
  return productVariants.filter((v) => v.productId === productId);
}

export function getProductsByCategory(categoryId: number): Product[] {
  return products.filter((p) => p.categoryId === categoryId);
}

export function getNewArrivals(count: number): Product[] {
  return [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, count);
}

export function getPopularProducts(count: number): Product[] {
  // Mock: use a fixed "popular" order based on IDs
  const popularIds = [1, 2, 7, 11, 15, 9, 19, 4, 10, 16, 20, 23];
  return popularIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined)
    .slice(0, count);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      (p.brand && p.brand.toLowerCase().includes(q)),
  );
}

export function getAllBrands(): string[] {
  const brands = new Set(products.map((p) => p.brand).filter((b): b is string => b !== null));
  return [...brands].sort();
}
