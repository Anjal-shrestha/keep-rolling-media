import NextAuthProvider from '@/components/NextAuthProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ConditionalLayout from '@/components/ConditionalLayout';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Keep Rolling Media - Taking Brands to Places',
  description: 'Bus branding and advertisement company in Nepal.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <ConditionalLayout>

          
           {/* Use the Navbar component */}
          <main>{children}</main>
        
          
          
          </ConditionalLayout>
        </NextAuthProvider>
      </body>
    </html>
  );
}