'use client';

// Import ReactQuill dynamically to avoid issues with server-side rendering
import dynamic from 'next/dynamic';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css'; // Import the styles for the editor

// This ensures the component is only loaded on the client
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface RichTextEditorProps {
  name: string;
  defaultValue?: string;
}

export default function RichTextEditor({ name, defaultValue }: RichTextEditorProps) {
  const [value, setValue] = useState(defaultValue || '');

  return (
    <div className="bg-white">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
      />
      {/* This hidden input is crucial. It passes the editor's HTML content to your Server Action */}
      <input type="hidden" name={name} value={value} />
    </div>
  );
}