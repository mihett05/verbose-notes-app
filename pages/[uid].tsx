import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useStore } from 'effector-react';

import { Box, Grid, Tab, Tabs, TextField, Typography } from '@mui/material';

import { $notes, Note } from '../store/notes';
import NoteHeader from '../components/NoteHeader';
import NoteEditor from '../components/NoteEditor';

const a11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function NoteEdit() {
  const router = useRouter();
  const { uid } = router.query;

  const [tab, setTab] = useState(0);

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
      <Box
        sx={{
          paddingTop: 5,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="Note" {...a11yProps(0)} />
          <Tab label="Markdown" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0}>
        <NoteEditor note={note} />
      </TabPanel>
    </Box>
  );
}

export default NoteEdit;
