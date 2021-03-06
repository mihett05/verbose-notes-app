import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TextField } from '@mui/material';
import { useSnackbar } from 'notistack';

import { Note, editNoteContent } from '../store/notes';

interface NoteEditorProps {
  note: Note;
}

function NoteEditor({ note: { uid, content } }: NoteEditorProps) {
  // Component for editing note content. It saves new content only after 0.1s of inactive
  const [value, setValue] = useState(content); // current value of text field
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const clearTimer = () => {
    if (timer !== null) clearTimeout(timer);
  };

  const saveValue = () => {
    editNoteContent({
      uid,
      data: value,
    });
  };

  useEffect(() => {
    // if note content was updated outside of editor
    if (content !== value) {
      setValue(content);
    }
  }, [content]);

  useEffect(() => {
    clearTimer();
    // Updating state only after 0.1s of inactive
    setTimer(setTimeout(saveValue, 100));
    return clearTimer;
  }, [value]);

  return (
    <TextField
      multiline
      fullWidth
      rows={25}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onKeyDownCapture={(event) => {
        if (event.key === 's' && event.ctrlKey) {
          event.preventDefault();
          enqueueSnackbar(t('saved'), {
            variant: 'success',
            preventDuplicate: true,
            autoHideDuration: 1000,
          });

          clearTimer();
          saveValue();
        }
      }}
    />
  );
}

export default NoteEditor;
