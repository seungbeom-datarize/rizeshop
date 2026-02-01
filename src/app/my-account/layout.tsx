import { Breadcrumbs } from '@/components/layout/breadcrumbs';

export default function MyAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <Breadcrumbs items={[{ label: '홈', href: '/' }, { label: '마이페이지' }]} />
      <div className="mt-6">{children}</div>
    </div>
  );
}
