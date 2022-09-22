import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Tree from 'rc-tree';
import { get } from 'lodash';
import 'rc-tree/assets/index.css';
import { queryMyCategories, addCategory, updatePage } from '../apis';

function CategoryModal(props) {
  const {
    page,
    visible = false,
    onClose,
    onOk
  } = props;
  const [categorys, setCategorys] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [selected, setSelected] = useState([page?.categoryId]);

  useEffect(() => {
    async function getData() {
      const categories = await queryMyCategories();
      setCategorys(categories);
    }

    getData();
  }, []);

  const modalProps = {
    isOpen: visible,
    onRequestClose: onClose,
    // className: 'rnotes-modal',
    style: {
      content: {
        top: '0',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, 0)',
        width: '600px',
        height: '60%'
      }
    },
    ariaHideApp: false
  };
  const handleSelect = (selectedKeys) => {
    console.log(selectedKeys)
    if (!selectedKeys.length) {
      return;
    }

    setSelected(selectedKeys);
  };
  const handleChange = (event) => {
    setNewCategory(event.target.value);
  };
  const handleAdd = async () => {
    if (!newCategory) {
      alert('请输入文件夹名称!');
      return;
    }
    
    const id = await addCategory({
      title: newCategory,
      parentId: selected?.id
    });

    const categories = await queryMyCategories();
    setCategorys(categories);
    setNewCategory('');

    setSelected([id]);
  };
  const handleOk = async() => {
    if (!page?.id) {
      alert('页面还未有任何笔记，不能归档！');
      return;
    }

    await updatePage({
      id: page.id,
      categoryId: selected[0]
    });

    onOk();
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
          selectedKeys={selected}
          onSelect={handleSelect}
          showLine
          autoExpandParent
        >
        </Tree>
      </div>
      <div className="rnotes-modal-footer">
        <div className="rnotes-new-category">
          <input placeholder='文件夹名称' value={newCategory} onChange={handleChange} />
          <button onClick={handleAdd}>新文件夹</button>
        </div>
        <div>
          <button onClick={onClose}>取消</button>
          <button onClick={handleOk}>保存</button>
        </div>
      </div>
    </Modal>
  );
}

export default CategoryModal;
