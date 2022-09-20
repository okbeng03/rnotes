import { useContext, useState } from 'react';
import { NotesContext } from '../context/notes';
import NoteItem from './noteItem';
import CategoryModal from './category';

function Notes(props) {
  const {
    title,
    notes,
    onRemove,
    onComment
  } = useContext(NotesContext);
  const [visible, setVisible] = useState(false);

  const handleCategory = () => {
    // TODO:: 分类归档
    setVisible(true);
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
      <CategoryModal
        visible={visible}
        onClose={() => {setVisible(false)}}
      ></CategoryModal>
    </div>
  )
}

export default Notes;
