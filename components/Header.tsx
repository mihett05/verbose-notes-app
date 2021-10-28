import React from 'react';
import { AppBar, Divider, Drawer, Toolbar, Typography } from '@mui/material';

interface HeaderProps {
  children?: React.ReactNode;
}

function Header({ children }: HeaderProps) {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          ml: `${240}px`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div">
            Verbose Notes
          </Typography>
        </Toolbar>
      </AppBar>
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
        {children}
      </Drawer>
    </>
  );
}

export default Header;
