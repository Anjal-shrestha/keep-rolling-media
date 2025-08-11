'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer'; // 1. Import the new Footer component

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <>
      {!isAdminPage && <Navbar />}

      <main>{children}</main> {/* It's better to keep <main> here */}

      {/* 2. Conditionally render the new Footer component */}
      {!isAdminPage && <Footer />}
    </>
  );
}