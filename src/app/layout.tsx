import type { Metadata } from 'next';
import Script from 'next/script';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/auth-context';
import { CartProvider } from '@/contexts/cart-context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'RizeShop',
  description: '합리적인 가격, 다양한 상품을 만나보세요.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
      <head>
        <Script id="datarize-sdk" strategy="beforeInteractive">
          {`(function(d,s,i) {
            var se = d.createElement(s);se.type='text/javascript';se.async=true;se.src='https://cdn.datarize.io/logger/genesis.'+i+'.min.js';
            var x = d.getElementsByTagName(s)[0];x.parentNode.insertBefore(se,x);
          })(document, 'script', '14286');`}
        </Script>
        <meta name="user_id" content="{{userId}}" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
