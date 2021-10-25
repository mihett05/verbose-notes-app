import React from 'react';
import { Divider, Drawer, List, ListItem, ListItemText, Toolbar } from '@mui/material';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

function NotesSide() {
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <ListItem button>
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
        {['Note 1', "Very Long Note Name that doesn't into sidebar"].map((note, i) => (
          <ListItem button key={i}>
            <StickyNote2Icon />
            <ListItemText
              primary={note.length > 18 ? note.slice(0, 18).trim() + '...' : note}
              sx={{
                padding: '0 0.5vw',
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default NotesSide;
