import wrapRange from './wrap-range-text';

export default {
  selection: null,
  range: null,
  init() {
    this.bindEvent();

    setTimeout(() => {
      const wraps = [
        // {id: 1, text: 'Create React App 是一个用于学习 React 的舒适环境，也是用 React 创建新的单页应用的最佳方式。', container: '.content > :nth-child(5)', startOffset: 0, endOffset: 0},
        // {id: 2, text: '推荐', container: '.content > :nth-child(2)', startOffset: 10, endOffset: 12},
        // {id: 3, text: '你需要在你的机器上安装 Node >= 14.0.0 和 npm >= 5.6。', container: '.content > :nth-child(6)', startOffset: 62, endOffset: 102},
        // {id: 4, text: 'JavaScript', container: '.content > :nth-child(6)', startOffset: 23, endOffset: 33},
        // {id: 5, text: '如果你是在学习 React 或创建一个新的单页应用，请使用 Create React App。\n如果你是在用 Node.js 构建服务端渲染的网站，试试 Next.js。', container: '.content > ul', startContainer: '.content > ul > :nth-child(1)', endContainer: '.content > ul > :nth-child(2)', startOffset: 0, endOffset: 37},
        // {id: 6, text: '构建内容主导的静态网站，试试 Gatsby。\n如果你是在打造组件', container: '.content > ul', startContainer: '.content > ul > :nth-child(3)', endContainer: 'ul > :nth-child(4) > :nth-child(1)', startOffset: 5, endOffset: 2},
        // {id: 7, text: '-react-app my-appcd', container: 'pre.gatsby-code-bash > .gatsby-code-bash', startOffset: 10, endOffset: 29},
        // {id: 8, text: '姓名年龄小花11小明12哈哈', container: '.content > :nth-child(9)', startOffset: 0, endOffset: 0},
        // // {id: 9, text: '\n姓名\t年龄\n小花\t11\n小明\t12\n哈哈\n111111', container: '.content', startContainer: '.content > :nth-child(9)', endContainer: '.content > :nth-child(10)', startOffset: 0, endOffset: 6}
        // {id: 10, text: '1111\n\n姓名\t年龄\n小花\t11\n小明\t12\n哈哈\n', container: '.content', startContainer: '.content > :nth-child(10)', endContainer: '.content > :nth-child(11)', startOffset: 2, endOffset: 14}
      ].map(item => {
        return wrapRange(item, item.text, item.id);
      });
    }, 0)
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
