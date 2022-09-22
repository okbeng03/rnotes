import { createContext } from 'react';

export const NotesContext = createContext({
  page: {},
  notes: [],
  onAdd: () => {},
  onRemove: () => {},
  onComment: () => {}
});
