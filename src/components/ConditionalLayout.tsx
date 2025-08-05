'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

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
      {children}
      {!isAdminPage && (
        <footer className="bg-gray-800 text-white mt-12">
          <div className="container mx-auto px-6 py-4 text-center">
            © {new Date().getFullYear()} Keep Rolling Media Pvt. Ltd. All Rights Reserved.
          </div>
        </footer>
      )}
    </>
  );
}