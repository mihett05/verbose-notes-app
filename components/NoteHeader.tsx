import React, { useEffect, useRef, useState } from 'react';

import { Box, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { Note, editNoteName } from '../store/notes';

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
      size="small"
      value={editingValue}
      onChange={(e) => setEditingValue(e.target.value)}
      onKeyPress={(event) => {
        if (event.code === 'Enter') {
          onFinishEditing();
        }
      }}
      onBlur={onFinishEditing}
      autoFocus
      fullWidth
    />
  ) : (
    <Typography variant="h6" onClick={onHeaderClick}>
      {note.name} <EditIcon fontSize="small" />
    </Typography>
  );
}

export default NoteHeader;
