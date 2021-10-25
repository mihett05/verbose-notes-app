import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function Header() {
  return (
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
  );
}

export default Header;
