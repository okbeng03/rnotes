import { useState } from 'react';
import Notes from './notes';

function Sidebar(props) {
  const [expand, setExpand] = useState(false);
  const [side, setSide] = useState('right');

  let className = 'rnotes-sidebar';

  if (side === 'left') {
    className += ' rnotes-sidebar-left';
  }

  const handleChangeSide = () => {
    setSide(side === 'right' ? 'left' : 'right')
  };

  return (
    <div className={className}>
      {
        expand ? (
          <Notes>
            <>
              <span onClick={handleChangeSide}>
                {
                  side === 'left' ? '右侧' : '左侧'
                }
              </span>
              <span onClick={() => {setExpand(false)}}>收起</span>
            </>
          </Notes>
        ) : (
          <div className="rnotes-sidebar-expand" onClick={() => {setExpand(!expand)}} title="展开">RNotes</div>
        )
      }
    </div>
  )
}

export default Sidebar;
