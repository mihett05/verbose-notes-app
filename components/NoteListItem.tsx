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
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: note.uid,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <ListItem button>
        <StickyNote2Icon />
        <ListItemText
          primary={note.name.length > 18 ? note.name.slice(0, 18).trim() + '...' : note.name}
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
