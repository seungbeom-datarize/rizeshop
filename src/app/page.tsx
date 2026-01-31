'use client';

import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="p-8 font-sans">
      <h1 className="text-2xl font-bold mb-4">RizeShop</h1>
      <p className="mb-4 text-gray-600">Welcome to RizeShop</p>
      <Button onClick={() => alert('Clicked!')}>Click me (shadcn)</Button>
    </div>
  );
}
