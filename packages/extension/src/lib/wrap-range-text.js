import { serialize, deSerialize } from './identity';

const wrapClassName = 'rnotes-highlight';
const wrapperEl = document.createElement('span');
wrapperEl.classList.add(wrapClassName);

// return all text nodes that are contained within `el`
function getTextNodes(el) {
  el = el || document.body;
  const doc = el.ownerDocument || document;
  const walker = doc.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
  const textNodes = [];
  let node;

  while (node = walker.nextNode()) {
    textNodes.push(node);
  }
  return textNodes;
}

// return true if `rangeA` intersects `rangeB`
function rangesIntersect(rangeA, rangeB) {
  return rangeA.compareBoundaryPoints(Range.END_TO_START, rangeB) === -1 &&
    rangeA.compareBoundaryPoints(Range.START_TO_END, rangeB) === 1;
}

// create and return a range that selects `node`
function createRangeFromNode(node) {
  const range = node.ownerDocument.createRange();
  try {
    range.selectNode(node);
  } catch (e) {
    range.selectNodeContents(node);
  }
  return range;
}

// return true if `node` is fully or partially selected by `range`
function rangeIntersectsNode(range, node) {
  if (range.intersectsNode) {
    return range.intersectsNode(node);
  } else {
    return rangesIntersect(range, createRangeFromNode(node));
  }
}

// return all non-empty text nodes fully or partially selected by `range`
function getRangeTextNodes(range) {
  const container = range.commonAncestorContainer;
  const nodes = getTextNodes((container.nodeType === 3 && container.parentNode) ? container.parentNode : container);

  return nodes.filter(function (node) {
    return rangeIntersectsNode(range, node) && isNonEmptyTextNode(node);
  });
}

// returns true if `node` has text content
function isNonEmptyTextNode(node) {
  return node.textContent.length > 0;
}

// remove `el` from the DOM
function remove(el) {
  if (el.parentNode) {
    el.parentNode.removeChild(el);
  }
}

// replace `node` with `replacementNode`
function replaceNode(replacementNode, node) {
  remove(replacementNode);
  node.parentNode.insertBefore(replacementNode, node);
  remove(node);
}

// unwrap `el` by replacing itself with its contents
function unwrap(el) {
  const range = document.createRange();
  range.selectNodeContents(el);
  replaceNode(range.extractContents(), el);
}

// undo the effect of `wrapRangeText`, given a resulting array of wrapper `nodes`
function undo(nodes) {
  nodes.forEach(function (node) {
    const parent = node.parentNode;
    unwrap(node);
    parent.normalize();
  });
}

// create a node wrapper function
function createWrapperFunction(wrapperEl, range) {
    let startNode = range.startContainer;
    let endNode = range.endContainer;
    let startOffset = range.startOffset;
    let endOffset = range.endOffset;

  return function wrapNode(node) {
    const currentRange = document.createRange();
    const currentWrapper = wrapperEl.cloneNode();

    currentRange.selectNodeContents(node);

    if (node === startNode && startNode.nodeType === 3) {
      currentRange.setStart(node, startOffset);
      startNode = currentWrapper;
      startOffset = 0;
    }
    if (node === endNode && endNode.nodeType === 3) {
      currentRange.setEnd(node, endOffset);
      endNode = currentWrapper;
      endOffset = 1;
    }

    currentRange.surroundContents(currentWrapper);
    return currentWrapper;
  }
}

function wrapRangeText(range, text, id) {
  if (typeof range === 'undefined') {
    // get the current selection if no range is specified
    range = window.getSelection().getRangeAt(0);
  }

  if (range.isCollapsed) {
    // nothing to wrap
    return [];
  }

  const { range: r, note: n } = range instanceof Range ? serialize(range, text, id) : deSerialize(range, text, id);
  range = r;
  const note = n;
  console.log(note, range);

  if (!range) {
    return null
  }

  const wrapNode = createWrapperFunction(wrapperEl, range);

  let nodes = getRangeTextNodes(range);
  nodes = nodes.map(wrapNode);

  const wrapperObj = {};

  wrapperObj.nodes = nodes;
  wrapperObj.unwrap = function () {
    if (this.nodes.length) {
      undo(this.nodes);
      this.nodes = [];
    }
  }

  return {
    note,
    wrapper: wrapperObj
  };
}

export default wrapRangeText;
