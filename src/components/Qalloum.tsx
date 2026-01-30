"use client";
"use client";
import React, { useRef } from "react";

type QalloumProps = {
  id?: string;
  name?: string;
  placeholder?: string;
}
const toolbarBtnStyle: React.CSSProperties = {
  padding: '4px 10px',
  borderRadius: 6,
  border: '1px solid #e5e7eb',
  background: '#f8f9fa',
  fontWeight: 600,
  cursor: 'pointer',
  color: '#222',
  marginBottom: 4,
};

export default function Qalloum(props: QalloumProps) {
  const textareaRef = useRef<HTMLDivElement>(null);

  function formatText(command: string, value?: string) {
    if (textareaRef.current) {
      textareaRef.current.focus();
      document.execCommand(command, false, value);
    }
  }

  return (
    <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #eee', marginBottom: 18, padding: 18, boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
      <div style={{
        marginBottom: 12,
        display: 'flex',
        gap: 4,
        flexWrap: 'wrap',
        background: '#f4f6fa',
        border: '1.2px solid #e5e7eb',
        borderRadius: 8,
        padding: '4px 6px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
      }}>
        <button type="button" onClick={() => formatText('bold')} style={toolbarBtnStyle}>B</button>
        <button type="button" onClick={() => formatText('italic')} style={toolbarBtnStyle}>I</button>
        <button type="button" onClick={() => formatText('underline')} style={toolbarBtnStyle}>U</button>
        <button type="button" onClick={() => formatText('strikeThrough')} style={toolbarBtnStyle}><span style={{ textDecoration: 'line-through' }}>S</span></button>
        <button type="button" onClick={() => formatText('insertUnorderedList')} style={toolbarBtnStyle}>• Liste</button>
        <button type="button" onClick={() => formatText('insertOrderedList')} style={toolbarBtnStyle}>1. Liste</button>
        <button type="button" onClick={() => {
          const url = prompt('Entrez le lien :');
          if (url) formatText('createLink', url);
        }} style={toolbarBtnStyle}>🔗 Lien</button>
        <button type="button" onClick={() => formatText('justifyLeft')} style={toolbarBtnStyle}>Gauche</button>
        <button type="button" onClick={() => formatText('justifyRight')} style={toolbarBtnStyle}>Droite</button>
        <button type="button" onClick={() => formatText('justifyCenter')} style={toolbarBtnStyle}>Centre</button>
        <label style={{ ...toolbarBtnStyle, display: 'inline-block', cursor: 'pointer', paddingRight: 0, paddingLeft: 0 }}>
          <span style={{padding: '0 10px'}}>🎨 Couleur</span>
          <input
            type="color"
            style={{ width: 28, height: 28, border: 'none', background: 'transparent', verticalAlign: 'middle', cursor: 'pointer' }}
            onChange={e => formatText('foreColor', e.target.value)}
            title="Choisir une couleur"
          />
        </label>
        <label style={{ ...toolbarBtnStyle, display: 'inline-block', cursor: 'pointer' }}>
          🖼️ Image
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={async (e) => {
              const file = e.target.files && e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = function (event) {
                  const imgBase64 = event.target?.result as string;
                  formatText('insertImage', imgBase64);
                };
                reader.readAsDataURL(file);
                // إعادة تعيين قيمة input حتى يمكن رفع نفس الصورة لاحقاً
                e.target.value = '';
              }
            }}
          />
        </label>
      </div>
      <div
        ref={textareaRef}
        id={props.id}
        contentEditable
        suppressContentEditableWarning
        data-placeholder={props.placeholder}
        style={{
          width: '100%',
          minHeight: 120,
          border: '1.5px solid #e5e7eb',
          borderRadius: 8,
          fontSize: 18,
          outline: 'none',
          background: '#fafbfc',
          color: '#222',
          fontWeight: 400,
          boxSizing: 'border-box',
          padding: '14px 16px',
          resize: 'vertical',
          overflowY: 'auto',
        }}
      />
    </div>
  );
}
