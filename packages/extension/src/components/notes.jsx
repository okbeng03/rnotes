import { useContext, useState } from 'react';
import { NotesContext } from '../context/notes';
import NoteItem from './noteItem';
import CategoryModal from './category';

function Notes(props) {
  const {
    page,
    notes,
    onRemove,
    onComment
  } = useContext(NotesContext);
  const [visible, setVisible] = useState(false);

  const handleCategory = () => {
    setVisible(true);
  };

  return (
    <div className="rnotes-notes">
      <div className="rnotes-notes-header">
        <h3>{page.title}</h3>
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
        page={page}
        visible={visible}
        onClose={() => {setVisible(false)}}
        onOk={() => {setVisible(false)}}
      ></CategoryModal>
    </div>
  )
}

export default Notes;
