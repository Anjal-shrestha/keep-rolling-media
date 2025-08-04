'use client'; // This needs to be a client component for the signout button

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
       <Toaster position="bottom-right" />
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav>
  <ul>
    <li className="mb-2">
      <Link href="/admin/dashboard" className="block py-1 hover:text-red-400">
        Dashboard
      </Link>
    </li>
    <li className="mb-2">
      <Link href="/admin/dashboard/portfolio" className="block py-1 hover:text-red-400">
        Manage Work
      </Link>
    </li>
     <li className="mb-2">
      <Link href="/admin/dashboard/blog" className="block py-1 hover:text-red-400">
        Manage Blog
      </Link>
    </li>
     <li className="mb-2">
      <Link href="/admin/dashboard/clients" className="block py-1 hover:text-red-400">
        Manage Clients
      </Link>
    </li>
  </ul>
</nav>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="mt-8 bg-red-600 w-full text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Sign Out
        </button>
      </aside>
      <main className="flex-1 p-8 bg-gray-100">{children}</main>
    </div>
  );
}