import { createContext } from 'react';

export const NotesContext = createContext({
  title: '',
  notes: [],
  onAdd: () => {},
  onRemove: () => {},
  onComment: () => {}
});
