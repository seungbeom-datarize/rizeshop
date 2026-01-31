import type { Review } from '@/types';

export const reviews: Review[] = [
  // Galaxy S25 Ultra (id: 1)
  { id: 1, userId: 1, productId: 1, rating: 5, content: '카메라 성능이 정말 놀랍습니다. AI 기능도 매우 유용해요.', createdAt: '2026-01-20T14:30:00Z', userName: '김민수', userImage: null },
  { id: 2, userId: 2, productId: 1, rating: 4, content: '배터리 사용 시간이 길어서 좋습니다. 다만 가격이 조금 부담스러워요.', createdAt: '2026-01-22T10:15:00Z', userName: '이지은', userImage: null },
  { id: 3, userId: 3, productId: 1, rating: 5, content: '티타늄 프레임 덕분에 튼튼하면서도 가볍습니다.', createdAt: '2026-01-25T09:00:00Z', userName: '박준영', userImage: null },

  // iPhone 17 Pro (id: 2)
  { id: 4, userId: 4, productId: 2, rating: 5, content: '영상 촬영 퀄리티가 전작보다 크게 향상되었어요.', createdAt: '2026-01-25T16:00:00Z', userName: '최수진', userImage: null },
  { id: 5, userId: 5, productId: 2, rating: 4, content: '디자인이 세련되고 성능도 만족스럽습니다.', createdAt: '2026-01-26T11:30:00Z', userName: '정현우', userImage: null },

  // MacBook Pro M5 (id: 4)
  { id: 6, userId: 6, productId: 4, rating: 5, content: '영상 편집 작업이 정말 빨라졌습니다. M5 칩 대단하네요.', createdAt: '2026-01-22T08:45:00Z', userName: '한지원', userImage: null },
  { id: 7, userId: 7, productId: 4, rating: 5, content: '배터리 사용 시간도 길고 발열도 적어서 만족합니다.', createdAt: '2026-01-24T13:20:00Z', userName: '송태현', userImage: null },

  // Airism T-shirt (id: 7)
  { id: 8, userId: 8, productId: 7, rating: 4, content: '여름에 입기 딱 좋은 소재입니다. 통기성이 좋아요.', createdAt: '2026-01-27T15:00:00Z', userName: '윤서연', userImage: null },
  { id: 9, userId: 9, productId: 7, rating: 5, content: '가격 대비 퀄리티가 최고입니다. 색상별로 다 사고 싶어요.', createdAt: '2026-01-28T10:00:00Z', userName: '임동현', userImage: null },
  { id: 10, userId: 10, productId: 7, rating: 3, content: '사이즈가 좀 크게 나옵니다. 한 사이즈 작게 주문하세요.', createdAt: '2026-01-29T17:30:00Z', userName: '강은비', userImage: null },

  // Nike Jogger (id: 9)
  { id: 11, userId: 1, productId: 9, rating: 5, content: '착용감이 정말 좋고 따뜻합니다. 겨울 운동용으로 최고.', createdAt: '2026-01-23T14:00:00Z', userName: '김민수', userImage: null },
  { id: 12, userId: 3, productId: 9, rating: 4, content: '디자인이 깔끔하고 활동하기 편합니다.', createdAt: '2026-01-25T11:00:00Z', userName: '박준영', userImage: null },

  // Cashmere Cardigan (id: 11)
  { id: 13, userId: 2, productId: 11, rating: 5, content: '너무 부드럽고 따뜻해요. 색상도 예쁘고 어디에나 잘 어울려요.', createdAt: '2026-01-29T09:30:00Z', userName: '이지은', userImage: null },
  { id: 14, userId: 4, productId: 11, rating: 4, content: '캐시미어 블렌드라 가격대비 퀄리티가 좋습니다.', createdAt: '2026-01-30T15:00:00Z', userName: '최수진', userImage: null },

  // Leather Tote (id: 15)
  { id: 15, userId: 6, productId: 15, rating: 5, content: '가죽 질감이 고급스럽고 수납공간도 넉넉합니다.', createdAt: '2026-01-28T08:00:00Z', userName: '한지원', userImage: null },
  { id: 16, userId: 8, productId: 15, rating: 4, content: '노트북도 들어가서 출퇴근용으로 완벽해요.', createdAt: '2026-01-29T14:30:00Z', userName: '윤서연', userImage: null },
  { id: 17, userId: 10, productId: 15, rating: 5, content: '디자인이 심플해서 어떤 옷에도 잘 맞아요.', createdAt: '2026-01-30T10:00:00Z', userName: '강은비', userImage: null },

  // Diffuser (id: 19)
  { id: 18, userId: 5, productId: 19, rating: 4, content: '향이 은은하고 오래 갑니다. 방 분위기가 달라져요.', createdAt: '2026-01-30T16:00:00Z', userName: '정현우', userImage: null },
  { id: 19, userId: 7, productId: 19, rating: 5, content: '선물용으로 구매했는데 포장도 예쁘고 좋아했어요.', createdAt: '2026-01-30T20:00:00Z', userName: '송태현', userImage: null },

  // Bedding Set (id: 20)
  { id: 20, userId: 9, productId: 20, rating: 5, content: '오가닉 코튼이라 피부에 부드럽고 쾌적합니다.', createdAt: '2026-01-15T09:00:00Z', userName: '임동현', userImage: null },
  { id: 21, userId: 1, productId: 20, rating: 4, content: '세탁해도 형태가 잘 유지됩니다. 추천해요.', createdAt: '2026-01-18T11:00:00Z', userName: '김민수', userImage: null },

  // Desk Lamp (id: 22)
  { id: 22, userId: 3, productId: 22, rating: 4, content: '밝기 조절이 세밀하게 되어서 좋습니다. 충전식이면 더 좋겠어요.', createdAt: '2026-01-12T14:00:00Z', userName: '박준영', userImage: null },

  // Minimal Watch (id: 17)
  { id: 23, userId: 2, productId: 17, rating: 5, content: '심플하면서도 고급스러워요. 매일 착용하고 있습니다.', createdAt: '2026-01-20T10:00:00Z', userName: '이지은', userImage: null },
  { id: 24, userId: 6, productId: 17, rating: 4, content: '가벼워서 착용감이 좋습니다. 밴드 조절도 편해요.', createdAt: '2026-01-22T16:00:00Z', userName: '한지원', userImage: null },

  // Ultraboost 5 (id: 10)
  { id: 25, userId: 5, productId: 10, rating: 5, content: '쿠셔닝이 환상적입니다. 오래 걸어도 발이 편해요.', createdAt: '2026-01-21T09:00:00Z', userName: '정현우', userImage: null },
  { id: 26, userId: 7, productId: 10, rating: 4, content: '디자인도 예쁘고 러닝할 때 정말 좋습니다.', createdAt: '2026-01-23T17:00:00Z', userName: '송태현', userImage: null },

  // Tumbler (id: 23)
  { id: 27, userId: 8, productId: 23, rating: 5, content: '보온력이 정말 대단해요. 아침에 넣은 커피가 저녁까지 따뜻해요.', createdAt: '2026-01-10T08:00:00Z', userName: '윤서연', userImage: null },
  { id: 28, userId: 9, productId: 23, rating: 5, content: '튼튼하고 디자인도 심플해서 마음에 듭니다.', createdAt: '2026-01-13T14:00:00Z', userName: '임동현', userImage: null },

  // Sunglasses (id: 16)
  { id: 29, userId: 4, productId: 16, rating: 4, content: '가볍고 착용감이 좋습니다. 자외선 차단도 확실해요.', createdAt: '2026-01-26T12:00:00Z', userName: '최수진', userImage: null },

  // Wood Shelf (id: 24)
  { id: 30, userId: 10, productId: 24, rating: 4, content: '조립이 간단하고 원목 질감이 예쁩니다. 무거운 물건도 잘 견뎌요.', createdAt: '2026-01-08T10:00:00Z', userName: '강은비', userImage: null },
];

export function getReviewsByProductId(productId: number): Review[] {
  return reviews.filter((r) => r.productId === productId);
}

export function getAverageRating(productId: number): number {
  const productReviews = getReviewsByProductId(productId);
  if (productReviews.length === 0) return 0;
  const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / productReviews.length) * 10) / 10;
}

export function getReviewCount(productId: number): number {
  return reviews.filter((r) => r.productId === productId).length;
}
