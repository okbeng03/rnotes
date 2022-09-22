import wrapRange from './wrap-range-text';

export default {
  selection: null,
  range: null,
  init() {
    this.bindEvent();
  },
  bindEvent() {
    document.onselectionchange = () => {
      const selection = window.getSelection();
      const txt = selection.toString();
      this.selection = null;
      this.range = null;

      if (selection && selection.rangeCount) {
        if (txt.length) {
          this.range = selection.getRangeAt(0);
          this.selection = selection;
        } else {
          // 只包含图片的处理
          this.range = selection.getRangeAt(0);
          this.selection = selection;
        }
      }
    }
  },
  note() {
    const { range, selection } = this;
    const { note, wrapper } = wrapRange(range, selection.toString());

    return {
      note,
      wrapper
    };
  }
};
