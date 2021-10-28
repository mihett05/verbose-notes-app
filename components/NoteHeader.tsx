import React, { useEffect, useRef, useState } from 'react';
import { Note, editNoteName } from '../store/notes';
import { Box, TextField, Typography } from '@mui/material';

interface NoteHeaderProps {
  note: Note;
}

function NoteHeader({ note }: NoteHeaderProps) {
  const [isEditing, setEditing] = useState(false);
  const [editingValue, setEditingValue] = useState('');

  const onHeaderClick = () => {
    setEditing(true);
    setEditingValue(note.name);
  };

  const onFinishEditing = () => {
    editNoteName({
      uid: note.uid,
      data: editingValue.trim(),
    });
    setEditing(false);
  };

  return isEditing ? (
    <TextField
      variant="outlined"
      value={editingValue}
      onChange={(e) => setEditingValue(e.target.value)}
      onKeyPress={(event) => {
        if (event.code === 'Enter') {
          onFinishEditing();
        }
      }}
      onBlur={onFinishEditing}
      autoFocus
    />
  ) : (
    <Typography variant="h6" onClick={onHeaderClick}>
      {note.name}
    </Typography>
  );
}

export default NoteHeader;
