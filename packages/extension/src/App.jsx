import { useState, useEffect } from 'react';
import Content from './components/content';
import Popover from './components/popover';
import Sidebar from './components/sidebar';
import { NotesContext } from './context/notes';
import wrapRange from './lib/wrap-range-text';
import { login, queryNotes, addNote, queryMyCategories } from './apis';

import './App.scss';

function App() {
  const [page, setPage] = useState();
  const [notes, setNotes] = useState([]);
  const href = window.location.href;
  const title = document.title;

  useEffect(() => {
    async function fetch() {
      await login();

      const page = await queryNotes(href);

      if (page) {
        setPage({
          id: page.id,
          title: page.title,
          categoryId: page.categoryId
        });
      } else {
        const categories = await queryMyCategories();

        setPage({
          title,
          categoryId: categories[0]?.id
        });
      }

      if (page?.notes?.length) {
        const wraps = page.notes.map((item) => {
          return {
            id: item.id,
            ...wrapRange(item)
          };
        });

        setNotes(wraps);
      }
    };

    fetch();
  }, []);

  // 添加笔记
  const onAdd = async (data) => {
    const params = {
      note: data.note
    };

    if (page.id) {
      params.pageId = page.id;
    } else {
      params.href = href;
      params.title = title;
      params.categoryId = page.categoryId;
    }

    const id = await addNote(params);

    setNotes(notes.concat([{
      id,
      ...data
    }]));
  };

  // 移除笔记
  const onRemove = (id) => {
    const idx = notes.findIndex(note => note.id === id);

    if (idx > -1) {
      notes.splice(idx, 1);
      setNotes([...notes]);
    }
  };

  // 添加笔记备注
  const onComment = (id, comment) => {
    const idx = notes.findIndex(note => note.id === id);

    if (idx > -1) {
      const note = notes[idx];
      note.note.comment = comment;
      notes.splice(idx, 1, {
        ...notes[idx]
      });
      setNotes([...notes]);
    }
  };

  const notesContext = {
    page,
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
