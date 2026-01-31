import type { Banner } from '@/types';

export const banners: Banner[] = [
  {
    id: 1,
    title: '2026 봄 신상품',
    subtitle: '새로운 시즌, 새로운 스타일을 만나보세요',
    imageUrl: 'https://picsum.photos/seed/banner-spring/1200/400',
    linkUrl: '/products?sort=newest',
  },
  {
    id: 2,
    title: '전자기기 특가',
    subtitle: '최신 스마트폰 & 노트북 할인 이벤트',
    imageUrl: 'https://picsum.photos/seed/banner-electronics/1200/400',
    linkUrl: '/products?category=electronics',
  },
  {
    id: 3,
    title: '신규 가입 10% 할인',
    subtitle: '쿠폰코드 WELCOME10 을 입력하세요',
    imageUrl: 'https://picsum.photos/seed/banner-welcome/1200/400',
    linkUrl: '/products',
  },
];
