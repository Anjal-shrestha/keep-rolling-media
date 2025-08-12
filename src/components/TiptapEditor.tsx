'use client';

import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

// --- A simple toolbar for the editor ---
const TiptapToolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }
  return (
    <div className="border border-gray-300 rounded-t-lg p-2 bg-gray-50 flex flex-wrap gap-2">
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`px-3 py-1 rounded ${editor.isActive('bold') ? 'bg-gray-800 text-white' : 'bg-white'}`}>Bold</button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`px-3 py-1 rounded ${editor.isActive('italic') ? 'bg-gray-800 text-white' : 'bg-white'}`}>Italic</button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`px-3 py-1 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-800 text-white' : 'bg-white'}`}>H2</button>
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`px-3 py-1 rounded ${editor.isActive('bulletList') ? 'bg-gray-800 text-white' : 'bg-white'}`}>List</button>
    </div>
  );
};

// --- The Main Editor Component ---
export default function TiptapEditor({ name, defaultValue = '' }: { name: string, defaultValue?: string }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: defaultValue,
    // **THE FIX IS HERE:**
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none p-4 min-h-[200px] border-x border-b border-gray-300 rounded-b-lg bg-white',
      },
    },
  });

  const html = editor?.getHTML() || '';

  return (
    <div>
      <TiptapToolbar editor={editor} />
      <EditorContent editor={editor} />
      <input type="hidden" name={name} value={html} />
    </div>
  );
}