'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { href: '/admin/dashboard', label: 'Dashboard' },
    { href: '/admin/dashboard/portfolio', label: 'Manage Work' },
    { href: '/admin/dashboard/blog', label: 'Manage Blog' },
    { href: '/admin/dashboard/clients', label: 'Manage Clients' },
    { href: '/admin/dashboard/testimonials', label: 'Manage Testimonials' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Toaster position="bottom-right" />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white pt-10 p-4 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href} className="mb-2">
                <Link
                  href={link.href}
                  className="block py-1 hover:text-red-400"
                  onClick={() => setSidebarOpen(false)} // Close on navigation
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="mt-8 bg-red-600 w-full text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden bg-white shadow-md pt p-4 flex justify-between items-center">
          <span className="text-xl font-bold">Admin</span>
          <button onClick={() => setSidebarOpen(true)} className="text-gray-800">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}