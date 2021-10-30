import React from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Note } from '../store/notes';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { ListItem, ListItemText } from '@mui/material';

interface NoteListItem {
  note: Note;
}

function NoteListItem({ note }: NoteListItem) {
  // dnd-kit staff for making item draggable
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: note.uid,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // make note name shorter if it doesn't fit
  const shortName = note.name.length > 18 ? note.name.slice(0, 18).trim() + '...' : note.name;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <ListItem button>
        <StickyNote2Icon />
        <ListItemText
          primary={shortName}
          secondary={note.createdAt.toLocaleString()}
          sx={{
            padding: '0 0.5vw',
          }}
        />
      </ListItem>
    </div>
  );
}

export default NoteListItem;
