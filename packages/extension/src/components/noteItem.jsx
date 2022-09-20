import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import markdownIt from '../lib/markdown';

function NoteItem(props) {
  const {
    onRemove,
    onComment
  } = props;
  const {
    id,
    note,
    wrapper,
    comment = ''
  } = props.note;
  const [editable, setEditable] = useState(false);
  const [commentValue, setComment] = useState(comment);

  const handlerRemove = () => {
    // TODO:: 删除接口
    wrapper.unwrap();
    onRemove(id);
  };

  const handlerCommentEdit = () => {
    setEditable(true);
  };

  const handleCommentCancel = () => {
    setEditable(false);
    setComment(comment);
  };

  const handlerComment = () => {
    // TODO:: 备注接口
    onComment(id, commentValue);
    setEditable(false);
  };

  const handlerCommentChange = (value) => {
    setComment(value);
  };

  return (
    <div className="rnotes-note-item">
      <div className="rnotes-note-item-content markdown-body"
        dangerouslySetInnerHTML={{
          __html: markdownIt.render(note.md + '\n > ' + comment.replace(/\n/g, '\n > '))
        }}
      >
      </div>
      {
        editable && <div className="rnotes-note-item-comment">
          <MDEditor
            value={commentValue}
            preview='edit'
            onChange={handlerCommentChange}
          />
        </div>
      }
      <ul className="rnotes-note-item-action">
        <li>
          <span onClick={handlerRemove}>删除</span>
        </li>
        {
          editable ? (
            <>
              <li>
                <span onClick={handlerComment}>保存</span>
              </li>
              <li>
                <span onClick={handleCommentCancel}>取消</span>
              </li>
            </>
          ) : (
            <li>
              <span onClick={handlerCommentEdit}>备注</span>
            </li>
          )
        }
      </ul>
    </div>
  )
}

export default NoteItem;
