import { useState, useEffect } from 'react';
import Content from './components/content';
import Popover from './components/popover';
import Sidebar from './components/sidebar';
import { NotesContext } from './context/notes';

import './App.scss';

function App() {
  const [notes, setNotes] = useState([])
  const href = window.location.href;
  const title = document.title;

  // TODO:: 请求该链接是否有笔记
  // useEffect(async () => {
    
  // }, [])
  const onAdd = (data) => {
    setNotes(notes.concat([data]));
  };

  const onRemove = (id) => {
    const idx = notes.findIndex(note => note.id === id);

    if (idx > -1) {
      notes.splice(idx, 1);
      setNotes([...notes]);
    }
  };

  const onComment = (id, comment) => {
    const idx = notes.findIndex(note => note.id === id);

    if (idx > -1) {
      notes.splice(idx, 1, {
        ...notes[idx],
        comment
      });
      setNotes([...notes]);
    }
  };

  const notesContext = {
    title,
    notes,
    onAdd,
    onRemove,
    onComment
  };

  return (
    <div className="App">
      <NotesContext.Provider value={notesContext}>
        <Sidebar></Sidebar>
      </NotesContext.Provider>
      <Content></Content>
      <NotesContext.Provider value={notesContext}>
        <Popover></Popover>
      </NotesContext.Provider>
    </div>
  );
}

export default App;
