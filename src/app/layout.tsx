import NextAuthProvider from '@/components/NextAuthProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

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
          {/* HEADER */}
          <header className="bg-white shadow-md">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
              <div className="text-2xl font-bold text-gray-800">
                <Link href="/">Keep Rolling Media</Link>
              </div>
              <div className="space-x-6">
                <Link href="/" className="text-gray-600 hover:text-red-600">Home</Link>
                <Link href="/about" className="text-gray-600 hover:text-red-600">About Us</Link>
                <Link href="/our-work" className="text-gray-600 hover:text-red-600">Our Work</Link>
                <Link href="/blog" className="text-gray-600 hover:text-red-600">Blog</Link>
                <Link href="/contact" className="text-gray-600 hover:text-red-600">Contact Us</Link>
              </div>
            </nav>
          </header>

          {/* PAGE CONTENT */}
          <main>{children}</main>

          {/* FOOTER */}
          <footer className="bg-gray-800 text-white mt-12">
            <div className="container mx-auto px-6 py-4 text-center">
              © {new Date().getFullYear()} Keep Rolling Media Pvt. Ltd. All Rights Reserved.
            </div>
          </footer>
        </NextAuthProvider>
      </body>
    </html>
  );
}