import { useContext } from 'react';
import { NotesContext } from '../context/notes';
import NoteItem from './noteItem';

function Notes(props) {
  const {
    title,
    notes,
    onRemove,
    onComment
  } = useContext(NotesContext);
  console.log(999, notes)

  const handleCategory = () => {
    // TODO:: 分类归档
  };

  return (
    <div className="rnotes-notes">
      <div className="rnotes-notes-header">
        <h3>{title}</h3>
        <div className="rnotes-notes-header-action">
          {
            props.children
          }
          <span onClick={handleCategory}>归档</span>
        </div>
      </div>
      <div className="rnotes-notes-body">
        {
          notes.map(note => {
            return (
              <NoteItem
                note={note}
                key={note.id}
                onRemove={onRemove}
                onComment={onComment}
              ></NoteItem>
            )
          })
        }
      </div>
    </div>
  )
}

export default Notes;