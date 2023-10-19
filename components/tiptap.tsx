import * as React from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import { Heading2, Bold, Italic, Strikethrough, List, ListOrdered } from 'lucide-react';

import { Toggle } from '@/components/ui/toggle';

export interface TiptapProps {
  value?: string;
  onChange?: (richText: string) => void;
}

const Tiptap: React.FC<TiptapProps> = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Heading.configure({
        HTMLAttributes: {
          class: 'text-xl font-bold',
        },
        levels: [2],
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          'min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      },
    },
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col gap-3">
      {editor ? <TiptapMenuBar editor={editor} /> : null}
      <EditorContent editor={editor} />
    </div>
  );
};
Tiptap.displayName = 'Tiptap';

const TiptapMenuBar: React.FC<{ editor: Editor }> = ({ editor }) => {
  const items = [
    {
      pressed: editor?.isActive('heading'),
      onPressedChange: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
      icon: <Heading2 className="w-4 h-4" />,
    },
    {
      pressed: editor?.isActive('bold'),
      onPressedChange: () => editor?.chain().focus().toggleBold().run(),
      icon: <Bold className="w-4 h-4" />,
    },
    {
      pressed: editor?.isActive('italic'),
      onPressedChange: () => editor?.chain().focus().toggleItalic().run(),
      icon: <Italic className="w-4 h-4" />,
    },
    {
      pressed: editor?.isActive('strike'),
      onPressedChange: () => editor?.chain().focus().toggleStrike().run(),
      icon: <Strikethrough className="w-4 h-4" />,
    },
    {
      pressed: editor?.isActive('bulletList'),
      onPressedChange: () => editor?.chain().focus().toggleBulletList().run(),
      icon: <List className="w-4 h-4" />,
    },
    {
      pressed: editor?.isActive('orderedList'),
      onPressedChange: () => editor?.chain().focus().toggleOrderedList().run(),
      icon: <ListOrdered className="w-4 h-4" />,
    },
  ];

  return (
    <div className="border border-input bg-transparent rounded-md px-3 py-2 text-sm space-x-1">
      {items.map((props, index) => (
        <TiptapMenuBarItem key={index} {...props} />
      ))}
    </div>
  );
};
TiptapMenuBar.displayName = 'TiptapMenuBar';

const TiptapMenuBarItem: React.FC<
  React.ComponentPropsWithRef<typeof Toggle> & { icon: React.ReactNode }
> = ({ icon, ...props }) => {
  return (
    <Toggle size="sm" {...props}>
      {icon}
    </Toggle>
  );
};
TiptapMenuBarItem.displayName = 'TiptapMenuBarItem';

export { Tiptap };
