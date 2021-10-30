import React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Link } from '@mui/material';

import { $notes, addNoteAndRoute, uploadAndAddNote, sortNotesByDate } from '../store/notes';

const Home: NextPage = () => {
  const router = useRouter();
  const store = useStore($notes);
  const { t } = useTranslation();

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
        <Typography
          variant="h4"
          sx={{
            color: 'text.primary',
          }}
        >
          <Link
            onClick={onAddNote}
            sx={{
              cursor: 'pointer',
            }}
          >
            {t('indexAddNote')}
          </Link>
          ,{' '}
          <Link
            onClick={onSelect}
            sx={{
              cursor: 'pointer',
            }}
          >
            {t('indexSelectNote')}
          </Link>{' '}
          {t('indexMessage')}{' '}
          <Link
            onClick={onUpload}
            sx={{
              cursor: 'pointer',
            }}
          >
            {t('indexUploadNote')}
          </Link>
        </Typography>
      </Box>
    </div>
  );
};

export default Home;
