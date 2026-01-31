export function formatPrice(price: number): string {
  return `${price.toLocaleString('ko-KR')}원`;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}
