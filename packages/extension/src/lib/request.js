import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://127.0.0.1:7096'
});

instance.interceptors.request.use(request => {
  // const token = Vue.ls.get(ACCESS_TOKEN)

  // if (token) {
  //   request.headers.token = token
  // }

  return request
}, err => {
  return Promise.reject(err)
})

instance.interceptors.response.use(function (response) {
  const { status, data } = response

  if (status >= 200 && status <= 300) {
    return data;
  } else {
    Promise.reject(new Error('网络异常，请稍后再试'));
  }
}, function (error) {
  return Promise.reject(error);
});

export default instance;
