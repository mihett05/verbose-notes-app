import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { Button, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import DeleteDialog from './DeleteDialog';
import { Note, editNoteName, deleteNote } from '../store/notes';

interface NoteHeaderProps {
  note: Note;
}

function NoteHeader({ note }: NoteHeaderProps) {
  const [isEditing, setEditing] = useState(false);
  const [editingValue, setEditingValue] = useState('');
  const [isDeleteOpen, setDeleteOpen] = useState(false);

  const router = useRouter();

  const startEditing = () => {
    setEditing(true);
    setEditingValue(note.name);
  };

  const finishEditing = () => {
    editNoteName({
      uid: note.uid,
      data: editingValue.trim(),
    });
    setEditing(false);
  };

  const openDelete = () => {
    setDeleteOpen(true);
  };

  const deleteCurrentNote = () => {
    router.push('/');
    deleteNote(note.uid);
  };

  const downloadNote = () => {
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(note.content);
    link.download = `${note.name}.txt`;

    link.click();
    link.remove();
  };

  return (
    <>
      {isEditing ? (
        <TextField
          variant="outlined"
          size="small"
          value={editingValue}
          onChange={(e) => setEditingValue(e.target.value)}
          onKeyPress={(event) => {
            if (event.code === 'Enter') {
              finishEditing();
            }
          }}
          onBlur={finishEditing}
          autoFocus
          fullWidth
        />
      ) : (
        <Typography variant="h6" onClick={startEditing}>
          {note.name} <EditIcon fontSize="small" />
        </Typography>
      )}
      <Button onClick={startEditing}>Edit</Button>
      <Button onClick={openDelete}>Delete</Button>
      <Button onClick={downloadNote}>Download</Button>
      <DeleteDialog open={isDeleteOpen} setOpen={setDeleteOpen} onDelete={deleteCurrentNote} />
    </>
  );
}

export default NoteHeader;
