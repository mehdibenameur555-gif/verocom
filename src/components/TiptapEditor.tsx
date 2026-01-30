"use client";
type Level = 1 | 2 | 3 | 4 | 5 | 6;
type CommandItem = { cmd: string; label: string; level?: Level; align?: string };
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';

export default function TiptapEditor({ value, onChange }: { value: string, onChange: (v: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    // Fix SSR hydration error in Next.js
    immediatelyRender: false,
  });
  // type CommandItem already defined at the top

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
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {menu.map((item, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded border text-sm font-semibold transition-all
              ${editor && editor.isActive && item.cmd !== 'align' && editor.isActive(item.cmd) ? 'bg-pink-600 text-white border-pink-600' : 'bg-white text-gray-800 border-gray-300'}
              hover:bg-pink-50 hover:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-200`}
            onClick={() => run(item)}
            type="button"
            disabled={!editor}
            style={{ opacity: editor ? 1 : 0.5, minWidth: 60 }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="bg-white border border-gray-400 rounded shadow p-4 min-h-[240px]">
        <EditorContent 
          editor={editor} 
          className="outline-none text-xl text-gray-900 min-h-[180px] border-none bg-transparent shadow-none focus:ring-0 focus:outline-none"
          style={{ boxShadow: 'none', border: 'none', outline: 'none', background: 'transparent' }}
        />
      </div>
    </div>
  );
}
