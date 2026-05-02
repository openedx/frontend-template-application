/* eslint-disable react/prop-types */
import { useMemo, useRef, useState } from 'react';
import './RichTextEditor.scss';

const insertWrappedSelection = (input, openTag, closeTag = '') => {
  const start = input.selectionStart ?? 0;
  const end = input.selectionEnd ?? 0;
  const value = input.value || '';
  const selected = value.slice(start, end);
  const nextSelected = selected || 'text';
  const insertion = `${openTag}${nextSelected}${closeTag}`;
  return {
    value: `${value.slice(0, start)}${insertion}${value.slice(end)}`,
    cursorStart: start + openTag.length,
    cursorEnd: start + openTag.length + nextSelected.length,
  };
};

const insertListSelection = (input) => {
  const start = input.selectionStart ?? 0;
  const end = input.selectionEnd ?? 0;
  const value = input.value || '';
  const selected = value.slice(start, end).trim();
  const rows = (selected || 'List item').split('\n').map(item => item.trim()).filter(Boolean);
  const listHtml = `<ul>${rows.map(item => `<li>${item}</li>`).join('')}</ul>`;
  return {
    value: `${value.slice(0, start)}${listHtml}${value.slice(end)}`,
    cursorStart: start,
    cursorEnd: start + listHtml.length,
  };
};

const RichTextEditor = ({
  value,
  onChange,
  placeholder,
  disabled = false,
  labels,
}) => {
  const [mode, setMode] = useState('editor');
  const inputRef = useRef(null);

  const toolbarItems = useMemo(() => ([
    { key: 'bold', label: labels.bold, apply: input => insertWrappedSelection(input, '<strong>', '</strong>') },
    { key: 'italic', label: labels.italic, apply: input => insertWrappedSelection(input, '<em>', '</em>') },
    { key: 'underline', label: labels.underline, apply: input => insertWrappedSelection(input, '<u>', '</u>') },
    { key: 'list', label: labels.list, apply: input => insertListSelection(input) },
    { key: 'h3', label: labels.heading3, apply: input => insertWrappedSelection(input, '<h3>', '</h3>') },
  ]), [labels.bold, labels.heading3, labels.italic, labels.list, labels.underline]);

  const handleToolbarClick = (apply) => {
    if (!inputRef.current || disabled) {
      return;
    }
    const next = apply(inputRef.current);
    onChange(next.value);
    window.requestAnimationFrame(() => {
      if (!inputRef.current) {
        return;
      }
      inputRef.current.focus();
      inputRef.current.setSelectionRange(next.cursorStart, next.cursorEnd);
    });
  };

  return (
    <div className="app-rich-text-editor">
      <div className="app-rich-text-editor__toolbar">
        <button
          type="button"
          className={`app-rich-text-editor__mode ${mode === 'editor' ? 'is-active' : ''}`}
          onClick={() => setMode('editor')}
        >
          {labels.editor}
        </button>
        <button
          type="button"
          className={`app-rich-text-editor__mode ${mode === 'preview' ? 'is-active' : ''}`}
          onClick={() => setMode('preview')}
        >
          {labels.preview}
        </button>

        {mode === 'editor' && (
          <div className="app-rich-text-editor__actions">
            {toolbarItems.map(item => (
              <button
                key={item.key}
                type="button"
                className="app-rich-text-editor__action"
                disabled={disabled}
                onClick={() => handleToolbarClick(item.apply)}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {mode === 'editor' ? (
        <textarea
          ref={inputRef}
          className="app-rich-text-editor__input"
          rows={4}
          value={value}
          placeholder={placeholder}
          onChange={event => onChange(event.target.value)}
          disabled={disabled}
        />
      ) : (
        <div className="app-rich-text-editor__preview" dangerouslySetInnerHTML={{ __html: value || '' }} />
      )}
    </div>
  );
};

export default RichTextEditor;
