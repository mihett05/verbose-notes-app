import React from 'react';
import { NextRouter, useRouter } from 'next/router';
import { useStore } from 'effector-react';

import { Divider, List, ListItem, ListItemText } from '@mui/material';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import { $notes, addNoteAndRoute, uploadAndAddNote, sortNotesByDate } from '../store/notes';

function NotesSide() {
  const router = useRouter();
  const store = useStore($notes);

  const onAddNote = () => addNoteAndRoute(router);
  const onUpload = () => uploadAndAddNote(router);

  return (
    <>
      <ListItem button onClick={onAddNote}>
        <NoteAddIcon />
        <ListItemText
          sx={{
            padding: '0 0.5vw',
          }}
        >
          Add Note
        </ListItemText>
      </ListItem>
      <ListItem button onClick={onUpload}>
        <UploadFileIcon />
        <ListItemText
          sx={{
            padding: '0 0.5vw',
          }}
        >
          Upload Note
        </ListItemText>
      </ListItem>
      <Divider />
      <List>
        {store.sort(sortNotesByDate).map((note, i) => (
          <ListItem
            button
            key={i}
            onClick={() => {
              router.push(`/${note.uid}`);
            }}
          >
            <StickyNote2Icon />
            <ListItemText
              primary={note.name.length > 18 ? note.name.slice(0, 18).trim() + '...' : note.name}
              secondary={note.createdAt.toLocaleString()}
              sx={{
                padding: '0 0.5vw',
              }}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default NotesSide;
