import React, { useEffect, useRef } from 'react';
import marked from 'marked';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';

import { Note } from '../store/notes';

interface NoteMarkedProps {
  note: Note;
}

function NoteMarked({ note: { content } }: NoteMarkedProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.innerHTML = DOMPurify.sanitize(
        marked(content, {
          sanitize: true,
          highlight: (code, lang) => hljs.highlightAuto(code, [lang]).value,
        }),
      );
    }
  }, [content, ref]);

  return <div ref={ref} />;
}

export default NoteMarked;
