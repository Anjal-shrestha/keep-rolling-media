// app/blog/layout.tsx
import React from 'react';

export const metadata = {
  title: 'Blog',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="container mx-auto px-4 py-8">
      {children}
    </section>
  );
}
