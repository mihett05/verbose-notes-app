import React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useStore } from 'effector-react';
import { Box, Typography, Link } from '@mui/material';

import { $notes, addNoteAndRoute, uploadAndAddNote, sortNotesByDate } from '../store/notes';

const Home: NextPage = () => {
  const router = useRouter();
  const store = useStore($notes);

  const onAddNote = () => addNoteAndRoute(router);
  const onUpload = () => uploadAndAddNote(router);
  const onSelect = () => {
    if (store.length > 0) {
      router.push(`/${store.sort(sortNotesByDate)[0].uid}`);
    }
  };

  return (
    <div>
      <Box
        sx={{
          p: 0,
          m: 0,
          display: 'flex',
          justifyContent: 'center',
          height: '90vh',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4">
          <Link
            onClick={onAddNote}
            sx={{
              cursor: 'pointer',
            }}
          >
            Add Note
          </Link>
          ,{' '}
          <Link
            onClick={onSelect}
            sx={{
              cursor: 'pointer',
            }}
          >
            Select Note
          </Link>{' '}
          from the sidebar or{' '}
          <Link
            onClick={onUpload}
            sx={{
              cursor: 'pointer',
            }}
          >
            Upload Note
          </Link>
        </Typography>
      </Box>
    </div>
  );
};

export default Home;
