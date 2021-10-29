import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Note, editNoteContent } from '../store/notes';

interface NoteEditorProps {
  note: Note;
}

function NoteEditor({ note: { uid, content } }: NoteEditorProps) {
  const [value, setValue] = useState(content);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
    if (content !== value) {
      setValue(content);
    }
  }, [content]);

  useEffect(() => {
    clearTimer();
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
          enqueueSnackbar('Saved!', {
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
