import React, { useEffect, useMemo, useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { useStore } from 'effector-react';
import { DndContext } from '@dnd-kit/core';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

import Layout from '../components/Layout';
import { $preferences } from '../store/preferences';
import { SnackbarProvider } from 'notistack';

import 'highlight.js/styles/github.css';

import '../i18n';

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore($preferences);
  // there is a bug with store and next.js(i guess) and I should to store color mode in another variable to prevent ssr bug
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setColorMode(store.colorMode);
  }, [store]);

  // updating mui theme on switching color mode
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: colorMode,
      },
    });
  }, [colorMode]);

  return (
    <>
      <Head>
        <title>Verbose Notes</title>
        <meta name="description" content="Create and store your notes for later purpose!" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}
export default MyApp;
