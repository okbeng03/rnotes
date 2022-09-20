import { useState } from 'react';
import Modal from 'react-modal';
import Tree from 'rc-tree';
import { get } from 'lodash';
import 'rc-tree/assets/index.css';

function CategoryModal(props) {
  const [categorys, setCategorys] = useState([
    {
      key: 1,
      title: '其他'
    },
    {
      key: 2,
      title: '前端',
      children: [
        {
          key: 3,
          title: 'React'
        }
      ]
    }
  ]);
  const [newCategory, setNewCategory] = useState('');
  const [selected, setSelected] = useState(null);

  const {
    visible = false,
    onClose,
    onOk,
    onCancel
  } = props;

  const modalProps = {
    isOpen: visible,
    onRequestClose: onClose,
    // className: 'rnotes-modal',
    style: {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '80%'
      }
    },
    ariaHideApp: false
  };
  const handleSelect = (selectedKeys, e) => {
    const { selected, node } = e;

    if (selected) {
      setSelected({
        id: node.key,
        pos: node.pos
      });
    } else {
      setSelected(null);
    }
  };
  const handleChange = (event) => {
    setNewCategory(event.target.value);
  };
  const handleAdd = () => {
    if (!newCategory) {
      alert('请输入文件夹名称!');
      return;
    }
    
    // TODO:: 添加新分类接口

    if (!selected) {
      setCategorys([
        ...categorys,
        {
          key: 100,
          title: newCategory
        }
      ])
    } else {
      const category = get(categorys, selected.pos.split('-').slice(1));

      if (!category.children) {
        category.children = [];
      }

      category.children.push({
        key: 100,
        title: newCategory
      });
      setCategorys([
        ...categorys
      ]);

      // TODO:: 自动打开父级，并选择新增的文件夹
    }
  };

  return (
    <Modal
      {...modalProps}
    >
      <div className="rnotes-modal-header">
        <h4>归档</h4>
      </div>
      <div className="rnotes-modal-body">
        <Tree
          className='rnotes-category'
          treeData={categorys}
          onSelect={handleSelect}
          showLine
          autoExpandParent
        >
        </Tree>
      </div>
      <div className="rnotes-modal-footer">
        <input placeholder='文件夹名称' value={newCategory} onChange={handleChange} />
        <button onClick={handleAdd}>新文件夹</button>
        <button>取消</button>
        <button>保存</button>
      </div>
    </Modal>
  );
}

export default CategoryModal;
