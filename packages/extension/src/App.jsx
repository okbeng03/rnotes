import { useState, useEffect } from 'react';
import Content from './components/content';
import Popover from './components/popover';
import Sidebar from './components/sidebar';
import { NotesContext } from './context/notes';
import wrapRange from './lib/wrap-range-text';
import { login, queryNotes, addNote, queryMyCategories } from './apis';

import './App.scss';

function App() {
  const [pageState, setPage] = useState();
  const [notesState, setNotes] = useState([]);
  const href = window.location.href;
  const title = document.title;

  useEffect(() => {
    async function fetch() {
      // TODO:: 换成JWT
      await login();

      const page = await queryNotes(href);

      if (page) {
        setPage({
          id: page.id,
          title: page.title,
          categoryId: page.categoryId
        });
      } else {
        // 默认将分类归档为用户默认分组
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

    if (pageState.id) {
      params.pageId = pageState.id;
    } else {
      params.href = href;
      params.title = title;
      params.categoryId = pageState.categoryId;
    }

    const id = await addNote(params);

    setNotes(notesState.concat([{
      id,
      ...data
    }]));
  };

  // 移除笔记
  const onRemove = (id) => {
    const idx = notesState.findIndex(note => note.id === id);

    if (idx > -1) {
      notesState.splice(idx, 1);
      setNotes([...notesState]);
    }
  };

  // 添加笔记备注
  const onComment = (id, comment) => {
    const idx = notesState.findIndex(note => note.id === id);

    if (idx > -1) {
      const note = notesState[idx];
      note.note.comment = comment;
      notesState.splice(idx, 1, {
        ...notesState[idx]
      });
      setNotes([...notesState]);
    }
  };

  const notesContext = {
    page: pageState,
    notes: notesState,
    onAdd,
    onRemove,
    onComment
  };

  return (
    <div className="App">
      <NotesContext.Provider value={notesContext}>
        <Sidebar></Sidebar>
      </NotesContext.Provider>
      {/* mock:: mock content */}
      <Content></Content>
      <NotesContext.Provider value={notesContext}>
        <Popover></Popover>
      </NotesContext.Provider>
    </div>
  );
}

export default App;
