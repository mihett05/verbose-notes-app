import React from 'react';
import { useRouter } from 'next/router';

function NoteEdit() {
  const router = useRouter();
  const { uid } = router.query;
  console.log(uid);
  return (
    <div>
      <h1>1234</h1>
    </div>
  );
}

export default NoteEdit;
