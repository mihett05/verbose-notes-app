import React from 'react';
import { Box, styled } from '@mui/material';

import Header from './Header';
import NotesSide from './NotesSide';

interface LayoutProps {
  children?: React.ReactNode;
}

// From MUI documentation. Used for padding for header and sidebar
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(6),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header>
        <NotesSide />
      </Header>
      <Main>{children}</Main>
    </Box>
  );
}

export default Layout;
