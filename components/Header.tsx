import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AppBar, Box, Divider, Drawer, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import LightModeIcon from '@mui/icons-material/LightMode';
import GitHubIcon from '@mui/icons-material/GitHub';

import { changeLanguage, toggleColorMode } from '../store/preferences';

interface HeaderProps {
  children?: React.ReactNode;
}

function Header({ children }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { t } = useTranslation();

  const onLangClose = () => setAnchorEl(null);
  const onLangChange = (lang: string) => {
    changeLanguage(lang);
    onLangClose();
  };

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
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
          >
            <Tooltip title={t('langChange').toString()}>
              <IconButton
                size="large"
                color="inherit"
                aria-controls="i18n-menu"
                aria-haspopup="true"
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                <TranslateIcon />
              </IconButton>
            </Tooltip>
            <Menu
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              id="i18n-menu"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              onClose={onLangClose}
            >
              <MenuItem
                onClick={() => {
                  onLangChange('en');
                }}
              >
                🇺🇸English
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onLangChange('ru');
                }}
              >
                🇷🇺Русский
              </MenuItem>
            </Menu>
            <Tooltip title={t('colorMode').toString()}>
              <IconButton size="large" color="inherit" onClick={() => toggleColorMode()}>
                <LightModeIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('github').toString()}>
              <IconButton
                size="large"
                color="inherit"
                onClick={() => {
                  window.open('https://github.com/mihett05/verbose-notes-app');
                }}
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
          </Box>
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
