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
              {
                side === 'left' ? <span onClick={handleChangeSide} title="右侧">&#xeb1e;</span>
                  : <span onClick={handleChangeSide} title="左侧">&#xeb28;</span>
              }
              <span onClick={() => {setExpand(false)}} title="收起">&#xe609;</span>
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
