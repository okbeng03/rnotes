import { useContext } from 'react';
import selection from '../lib/selection';
import { NotesContext } from '../context/notes';

function Action() {
  const { onAdd } = useContext(NotesContext);
  const onLine = () => {
    const { note, wrapper } = selection.note();

    onAdd({
      note,
      wrapper
    });
  };

  return (
    <ul>
      <li>
        <button className="iconfont icon-huaxian" title="划线" onClick={onLine}></button>
      </li>
      {/* <li>
        <button className="iconfont icon-icon_icon_wodebiji" title="写想法" onClick={onNote}></button>
      </li>
      <li>
        <button className="iconfont icon-guidang1" title="归档" onClick={onGroup}></button>
      </li> */}
    </ul>
  )
}

export default Action;
