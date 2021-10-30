import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { Button, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import DeleteDialog from './DeleteDialog';
import { Note, editNoteName, deleteNote } from '../store/notes';

interface NoteHeaderProps {
  note: Note;
}

function NoteHeader({ note }: NoteHeaderProps) {
  // Component for editing notes name and doing another actions with note
  const [isEditing, setEditing] = useState(false);
  const [editingValue, setEditingValue] = useState('');
  const [isDeleteOpen, setDeleteOpen] = useState(false);

  const router = useRouter();
  const { t } = useTranslation();

  // editing note name by clicking it
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
    // push before deleting because user see Note Not Found if delete before pushing
    router.push('/');
    deleteNote(note.uid);
  };

  const downloadNote = () => {
    // create download link and click on it for downloading note
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
        <Typography
          variant="h6"
          onClick={startEditing}
          sx={{
            color: 'text.primary',
          }}
        >
          {note.name} <EditIcon fontSize="small" />
        </Typography>
      )}
      <Button onClick={startEditing}>{t('edit')}</Button>
      <Button onClick={openDelete}>{t('delete')}</Button>
      <Button onClick={downloadNote}>{t('download')}</Button>
      <DeleteDialog open={isDeleteOpen} setOpen={setDeleteOpen} onDelete={deleteCurrentNote} />
    </>
  );
}

export default NoteHeader;
