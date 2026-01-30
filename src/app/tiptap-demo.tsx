"use client";
type Level = 1 | 2 | 3 | 4 | 5 | 6;
type CommandItem = { cmd: string; label: string; level?: Level; align?: string };
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { useState } from 'react';

const menu: CommandItem[] = [
  { cmd: 'bold', label: 'Bold' },
  { cmd: 'italic', label: 'Italic' },
  { cmd: 'underline', label: 'Underline' },
  { cmd: 'strike', label: 'Strike' },
  { cmd: 'heading', level: 1 as Level, label: 'H1' },
  { cmd: 'heading', level: 2 as Level, label: 'H2' },
  { cmd: 'bulletList', label: 'Puces' },
  { cmd: 'orderedList', label: 'Numérotée' },
  { cmd: 'blockquote', label: 'Quote' },
  { cmd: 'codeBlock', label: 'Code' },
  { cmd: 'link', label: 'Lien' },
  { cmd: 'undo', label: 'Undo' },
  { cmd: 'redo', label: 'Redo' },
  { cmd: 'align', align: 'left', label: 'Gauche' },
  { cmd: 'align', align: 'center', label: 'Centre' },
  { cmd: 'align', align: 'right', label: 'Droite' },
  { cmd: 'align', align: 'justify', label: 'Justifier' },
];

export default function TiptapDemo() {
  const [content, setContent] = useState('');
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: '',
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
  });

  // type CommandItem already defined at the top
  const run = (item: CommandItem) => {
    if (!editor) return;
    if (item.cmd === 'heading' && item.level) editor.chain().focus().toggleHeading({ level: item.level }).run();
    else if (item.cmd === 'align' && typeof item.align === 'string') editor.chain().focus().setTextAlign(item.align).run();
    else if (item.cmd === 'link') {
      const url = prompt('Entrer le lien:');
      if (url) editor.chain().focus().setLink({ href: url }).run();
    } else if (item.cmd === 'undo') editor.chain().focus().undo().run();
    else if (item.cmd === 'redo') editor.chain().focus().redo().run();
    else (editor.chain().focus() as unknown as Record<string, () => void>)[`toggle${item.cmd.charAt(0).toUpperCase() + item.cmd.slice(1)}`]?.();
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Tiptap Editor تجربة</h2>
      <div className="flex flex-wrap gap-2 mb-3">
        {menu.map((item, i) => (
          <button
            key={i}
            className="px-3 py-1 rounded border bg-white text-sm hover:bg-pink-50"
            onClick={() => run(item)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="bg-white border rounded shadow p-2 min-h-[180px]">
        <EditorContent editor={editor} />
      </div>
      <div className="mt-6">
        <h3 className="font-bold mb-2">المحتوى الناتج (HTML):</h3>
        <div className="border rounded bg-gray-50 p-3 text-xs whitespace-pre-wrap">
          {content}
        </div>
      </div>
    </div>
  );
}
