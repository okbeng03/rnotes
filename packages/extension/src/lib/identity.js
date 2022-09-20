import unique from 'unique-selector';
import turndownService from './htmltomd';

// 反序列化时获取offset相应的节点+偏移量
function getRangeNote(node, offset) {
  let childNodes = [...node.childNodes];
  let idx = 0;
  let child;
  let textNode;
  let off;

  while (child = childNodes.shift()) {
    const len = child.textContent.length;

    if (idx + len >= offset) {
      // 获取Text node，range的字符偏移量只认Text node
      if (child.nodeType !== 3) {
        childNodes = [...child.childNodes];
        continue;
      }

      textNode = child;
      off = offset - idx;
      break;
    }

    idx = idx + len;
  }

  if (textNode) {
    return {
      node: textNode,
      offset: off
    };
  }

  return {
    node,
    offset
  };
}

// 序列化时获取节点偏移相对于父级的偏移量
function getOffset(parent, node, offset) {
  const childNodes = parent.childNodes;
  let idx = 0;

  for (const child of childNodes) {
    if (child.textContent === node.textContent) {
      return idx + offset;
    }

    idx = idx + child.textContent.length;
  }
}

// 反序列化
export function deSerialize(note) {
  const { container, startContainer, startOffset, endContainer, endOffset } = note;
  // if (startOffset === 0 && endOffset === 0) {
  //   // 完整节点文本
  //   const node = document.querySelector(container);

  //   if (node) {
  //     const range = document.createRange();
  //     range.selectNodeContents(node);

  //     return {
  //       note,
  //       range
  //     };
  //   }

  //   return {};
  // }

  if (!startContainer && !endContainer) {
    // debugger
    // 同父级
    const node = document.querySelector(container);

    if (node) {
      const {node: startNode, offset: startOff} = getRangeNote(node, startOffset);
      const {node: endNode, offset: endOff} = getRangeNote(node, endOffset);

      if (startNode && endNode) {
        const range = document.createRange();

        range.setStart(startNode, startOff);
        range.setEnd(endNode, endOff);

        return {
          note,
          range
        };
      }

      return {};
    }
  }

  // 不同父级
  const node = document.querySelector(container);

  if (node) {
    const startParent = document.querySelector(startContainer);
    const endParent = document.querySelector(endContainer);

    if (startParent && endParent) {
      const {node: startNode, offset: startOff} = getRangeNote(startParent, startOffset);
      const {node: endNode, offset: endOff} = getRangeNote(endParent, endOffset);

      if (startNode && endNode) {
        const range = document.createRange();

        range.setStart(startNode, startOff);
        range.setEnd(endNode, endOff);

        return {
          note,
          range
        };
      }
    }

    return {};
  }

  return {}
}

// 序列化
export function serialize(range, text) {
  const note = {
    text,
    md: turndownService.turndown(range.cloneContents())
  };
  const { startContainer, startOffset, endContainer, endOffset, commonAncestorContainer } = range;
  let startParent = startContainer;
  let start = startOffset;

  // debugger
  if (startContainer.nodeType === 3) {
    startParent = startContainer.parentNode;
  } else {
    if (startContainer === commonAncestorContainer) {
      startParent = commonAncestorContainer.childNodes[startOffset];
      start = 0;
    }
  }

  let endParent = endContainer;
  let end = endOffset;

  if (endContainer.nodeType === 3) {
    endParent = endContainer.parentNode;
  } else {
    if (endContainer === commonAncestorContainer) {
      const childNodes = commonAncestorContainer.childNodes;
      const len = childNodes.length;

      // fixed: 如果鼠标划到文档末尾，endOffset会超过子节点个数，所以要修正
      endParent = childNodes[endOffset >= len ? len - 1 : endOffset];
      end = 0;
    }
  }

  // 完整节点文本
  // if (start === 0) {
  //   if (endParent.nodeType !== 3 && end === 0) {
  //     const previousSibling = endParent.previousSibling;

  //     if (previousSibling === startParent || previousSibling.textContent.indexOf(startParent.textContent) === 0) {
  //       note.container = unique(previousSibling);
  //       note.startOffset = 0;
  //       note.endOffset = 0;
  //       note.text = previousSibling.textContent;

  //       const r = document.createRange();
  //       r.selectNodeContents(previousSibling);

  //       return {
  //         range: r,
  //         note
  //       };
  //     }
  //   }

  //   if (startParent.textContent === text) {
  //     note.container = unique(startParent);
  //     note.startOffset = 0;
  //     note.endOffset = 0;
  //     note.text = startParent.textContent;

  //     const r = document.createRange();
  //     r.selectNodeContents(startParent);

  //     return {
  //       range: r,
  //       note
  //     };
  //   }
  // }

  if (commonAncestorContainer.nodeType === 3
    || startParent === endParent
    || startParent === commonAncestorContainer || endParent === commonAncestorContainer) {
    // 同父级节点
    note.container = unique(startParent);
    note.startOffset = startParent.textContent.indexOf(text);
    note.endOffset = note.startOffset + text.length;

    return {
      range,
      note
    };
  } else {
    // 不同父节点
    // debugger
    note.container = unique(commonAncestorContainer);
    note.startContainer = unique(startParent);
    note.endContainer = unique(endParent);
    note.startOffset = startContainer.nodeType === 3 ? getOffset(startParent, startContainer, startOffset)
      : start;
    note.endOffset = endContainer.nodeType === 3 ? getOffset(endParent, endContainer, endOffset)
      : end + endParent.textContent.length;

    return {
      range,
      note
    };
  }
}
