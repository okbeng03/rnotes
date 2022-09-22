import { useTextSelection } from 'use-text-selection';
import { createPortal } from 'react-dom';
import Action from './action';

const Portal = ({ children }) => {
  return createPortal(children, document.body)
}

function Popover() {
  const { clientRect, isCollapsed } = useTextSelection();
  // TODO:: 在table处双击，只会选中table标签，这时候也出现打标不合适
  // <table><tbody><tr><td colspan="2"></td></tr></tbody></table>

  if (!clientRect || isCollapsed) {
    return null
  }

  // 排除侧边栏、分类弹窗的选中
  const selection = window.getSelection()
  
  if (selection.rangeCount) {
    const range = selection.getRangeAt(0);

    if (range) {
      const { commonAncestorContainer } = range;
      
      if (commonAncestorContainer.parentElement.closest('div.rnotes-sidebar') || commonAncestorContainer.parentElement.closest('div.ReactModalPortal')) {
        return null;
      }
    }
  }

  return (
    <Portal>
      <div
        className="rnotes-popover"
        style={{
          left: clientRect.x + clientRect.width / 2,
          top: clientRect.y >= 40 ? clientRect.y - 40 : 0,
          position: 'fixed'
        }}
      >
        <Action></Action>
      </div>
    </Portal>
  )
}

export default Popover;
