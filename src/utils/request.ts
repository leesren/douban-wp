import axios from 'axios';
import { projectConfig } from '../config';
import Cookies from 'js-cookie';
// 创建 axios 实例
const service = axios.create({
  baseURL: projectConfig.baseURL, // api base_url
  timeout: 9000, // 请求超时时间
});
const tokenName = projectConfig.ACCESS_TOKEN;

// request interceptor
service.interceptors.request.use(
  config => {
    const token = Cookies.get(tokenName);
    if (token) {
      config.headers[tokenName] = token; // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  response => {
    return response.data.status == 0
      ? response.data.data
      : Promise.reject(response.data.data);
  },
  error => {
    if (error.response) {
      let data = error.response.data;
      const token = Cookies.get(tokenName);
      // console.log('------异常响应------', token)
      // console.log('------异常响应------', error.response.status)
      switch (error.response.status) {
        case 403:
          console.error({
            message: '系统提示',
            description: '拒绝访问',
            duration: 4,
          });
          break;
        case 500:
          console.error({
            message: '系统提示',
            description: 'Token失效，请重新登录!',
            duration: 4,
          });
          if (token && data.message == 'Token失效，请重新登录') {
            console.error('很抱歉，登录已过期，请重新登录');
          }
          break;
        case 404:
          console.error({
            message: '系统提示',
            description: '很抱歉，资源未找到!',
            duration: 4,
          });
          break;
        case 504:
          console.error({ message: '系统提示', description: '网络超时' });
          break;
        case 401:
          console.error({
            message: '系统提示',
            description: '未授权，请重新登录',
            duration: 4,
          });
          if (token) {
            console.log('未授权，请重新登录');
            // window.location.reload();
          }
          break;
        default:
          console.error({
            message: '系统提示',
            description: data.message,
            duration: 4,
          });
          break;
      }
    }
    return Promise.reject(error);
  },
);

export default service;
