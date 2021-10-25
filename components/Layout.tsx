import React from 'react';
import { Box } from '@mui/material';

import Header from './Header';
import NotesSide from './NotesSide';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <NotesSide />
      {children}
    </Box>
  );
}

export default Layout;
