'use client';

import { useEffect, useState } from 'react';
import client from '@/lib/client';
import { InferResponseType } from 'hono';
import { Button } from '@/components/ui/button';

// Infer response type from the client to ensure type safety
type ResType = InferResponseType<typeof client.api.posts.$get>;

export default function Home() {
  const [data, setData] = useState<ResType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await client.api.posts.$get();
      const json = await res.json();
      setData(json);
    };
    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-8 font-sans">
      <h1 className="text-2xl font-bold mb-4">Next.js + Hono RPC + shadcn/ui</h1>
      <ul className="list-disc list-inside mb-4">
        {data.posts.map((post) => (
          <li key={post.id} className="mb-2">
            {post.title}
          </li>
        ))}
      </ul>
      <Button onClick={() => alert('Clicked!')}>Click me (shadcn)</Button>
    </div>
  );
}
