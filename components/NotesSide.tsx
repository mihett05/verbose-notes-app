import React from 'react';
import { useRouter } from 'next/router';

import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers';

import { Divider, List, ListItem, ListItemText } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import { $notes, addNoteAndRoute, uploadAndAddNote, moveNotes } from '../store/notes';
import NoteListItem from './NoteListItem';

function NotesSide() {
  const router = useRouter();
  const store = useStore($notes);
  const { t } = useTranslation();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over !== null) {
      if (active.id !== over.id) {
        // if note was moved
        moveNotes({
          fromUid: active.id,
          toUid: over.id,
        });
      } else if (active.id === over.id) {
        // if user clicked on note
        router.push(`/${active.id}`);
      }
    }
  };

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
          {t('addNote')}
        </ListItemText>
      </ListItem>
      <ListItem button onClick={onUpload}>
        <UploadFileIcon />
        <ListItemText
          sx={{
            padding: '0 0.5vw',
          }}
        >
          {t('uploadNote')}
        </ListItemText>
      </ListItem>
      <Divider />
      <List>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
        >
          <SortableContext items={store.map((v) => v.uid)} strategy={verticalListSortingStrategy}>
            {store.map((note) => (
              <NoteListItem note={note} key={note.uid} />
            ))}
          </SortableContext>
        </DndContext>
      </List>
    </>
  );
}

export default NotesSide;
