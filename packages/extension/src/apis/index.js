import axios from '../lib/request';

export const login = async function() {
  return await axios({
    method: 'post',
    url: '/api/user/login',
    data: {
      loginName: 'okbeng',
      password: 'test1234'
    }
  });
};

// 查询页面是否有笔记
export const queryNotes = async function(href) {
  return await axios({
    method: 'post',
    url: '/api/page/query',
    data: {
      href
    }
  });
};

// 添加笔记
export const addNote = async function(data) {
  return await axios({
    method: 'post',
    url: '/api/note/add',
    data
  });
};

// 移除笔记
export const removeNote = async function(data) {
  return await axios({
    method: 'post',
    url: '/api/note/remove',
    data
  });
};

// 更新笔记
export const updateNote = async function(data) {
  return await axios({
    method: 'post',
    url: '/api/note/update',
    data
  });
};

// 获取我的分组
export const queryMyCategories = async function() {
  return await axios.get('/api/user/category');
};

// 添加分类
export const addCategory = async function(data) {
  return await axios({
    method: 'post',
    url: '/api/category/add',
    data
  });
};

// 移除分类
export const removeCategory = async function(data) {
  return await axios({
    method: 'post',
    url: '/api/category/remove',
    data
  });
};

// 更新分类
export const updateCategory = async function(data) {
  return await axios({
    method: 'post',
    url: '/api/category/update',
    data
  });
};

// 更新页面
export const updatePage = async function(data) {
  return await axios({
    method: 'post',
    url: '/api/page/update',
    data
  });
};
