import { createEvent, createStore, forward } from 'effector';

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

$notes
  .on(loadNotes, (state) => {
    const rawLoaded = localStorage.getItem('notes');
    console.log(rawLoaded);
    if (rawLoaded !== null) {
      try {
        const loadedJson = JSON.parse(rawLoaded);
        if (Array.isArray(loadedJson)) {
          // parse notes from localStorage
          const parsed = (
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
          return parsed;
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
