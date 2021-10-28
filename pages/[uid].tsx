import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useStore } from 'effector-react';

import { Box, Grid, TextField, Typography } from '@mui/material';

import { $notes, Note } from '../store/notes';
import NoteHeader from '../components/NoteHeader';

function NoteEdit() {
  const router = useRouter();
  const { uid } = router.query;

  const store = useStore($notes);
  const note = store.find((v) => v.uid === uid) || null;

  if (Array.isArray(uid) || uid === undefined || note === null) {
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
          <Typography variant="h3">Note Not Found</Typography>
        </Box>
      </div>
    );
  }

  return (
    <Box
      sx={{
        paddingTop: 5,
      }}
    >
      <NoteHeader note={note} />
    </Box>
  );
}

export default NoteEdit;
