import { createEvent, createStore, forward } from 'effector';
import { NextRouter } from 'next/router';

export type Note = {
  uid: string;
  name: string;
  content: string;
  createdAt: Date;
};

type NoteAction<T = string> = {
  uid: string;
  data: T;
};

type NotesStore = Note[];

export const $notes = createStore<NotesStore>([]);

export const addNote = createEvent<string>();
export const uploadNote = createEvent<Note>();
export const editNoteName = createEvent<NoteAction>();
export const editNoteContent = createEvent<NoteAction>();
export const deleteNote = createEvent<string>();

const saveNotes = createEvent();
const loadNotes = createEvent();

forward({
  from: [addNote, editNoteName, editNoteContent, deleteNote],
  to: saveNotes,
});

export const generateUid = () => Math.random().toString(16).substr(2, 8).toUpperCase();

export const sortNotesByDate = (a: Note, b: Note): number => {
  if (a.createdAt > b.createdAt) {
    return -1;
  } else if (a.createdAt === b.createdAt) {
    return 0;
  } else {
    return 1;
  }
};

export const addNoteAndRoute = (router: NextRouter) => {
  const uid = generateUid();
  addNote(uid);
  router.push(`/${uid}`);
};

const uploadNoteFromClient = (): Promise<Note> => {
  return new Promise((resolve, reject) => {
    // open file dialog
    const input = document.createElement('input');
    input.type = 'file';
    input.click();

    input.onchange = (event) => {
      // @ts-ignore
      const file: File = event.target.files[0];
      const uid = generateUid();

      // file should be less than 1MB
      if (file.size <= 1024 * 1024) {
        const fileReader = new FileReader();
        fileReader.readAsText(file);

        const name = file.name.endsWith('.txt') ? file.name.slice(0, -4) : file.name;

        fileReader.onload = () => {
          resolve({
            uid,
            name: name,
            content: fileReader.result as string,
            createdAt: new Date(file.lastModified),
          });
        };
        fileReader.onerror = () => {
          reject(fileReader.error);
        };
      }
    };
  });
};

export const uploadAndAddNote = async (router: NextRouter) => {
  const note = await uploadNoteFromClient();
  uploadNote(note);
  router.push(`/${note.uid}`);
};

$notes
  .on(loadNotes, (state) => {
    const rawLoaded = localStorage.getItem('notes');
    console.log(rawLoaded);
    if (rawLoaded !== null) {
      try {
        const loadedJson = JSON.parse(rawLoaded);
        if (Array.isArray(loadedJson)) {
          // parse notes from localStorage
          return (
            loadedJson.filter((v) => v.uid && v.name !== undefined && v.content !== undefined && v.createdAt) as Note[]
          ).map((v) => {
            const { uid, name, content } = v;
            return {
              uid,
              name,
              content,
              createdAt: new Date(v.createdAt),
            };
          });
        }
      } catch (e) {}
    }

    return [];
  })
  .on(saveNotes, (state) => {
    localStorage.setItem('notes', JSON.stringify(state));
    return [...state];
  })
  .on(addNote, (state, uid) => {
    const newNote: Note = {
      uid,
      name: `Untitled note ${uid}`,
      content: '',
      createdAt: new Date(),
    };
    return [...state, newNote];
  })
  .on(uploadNote, (state, note) => {
    return [...state, note];
  })
  .on(editNoteName, (state, action) => {
    const result = state.find((v) => v.uid === action.uid);
    if (result) {
      result.name = action.data;
    }

    return [...state];
  })
  .on(editNoteContent, (state, action) => {
    const result = state.find((v) => v.uid === action.uid);
    if (result) {
      result.content = action.data;
    }

    return [...state];
  })
  .on(deleteNote, (state, uid) => {
    return state.filter((v) => v.uid !== uid);
  });

if (typeof window !== 'undefined') {
  loadNotes();
}
