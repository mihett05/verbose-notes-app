import React from 'react';
import { useRouter } from 'next/router';
import { useStore } from 'effector-react';

import { Divider, Drawer, List, ListItem, ListItemText, Toolbar } from '@mui/material';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

import { $notes, addNote, generateUid } from '../store/notes';

function NotesSide() {
  const router = useRouter();
  const store = useStore($notes);

  const onAddNote = () => {
    const uid = generateUid();
    addNote(uid);
    router.push(`/${uid}`);
  };

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
      <Divider />
      <List>
        {store.map((note, i) => (
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
