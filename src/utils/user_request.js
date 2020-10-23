import axios from 'axios'


const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/userApi'
//創建 axios,賦給變量service
const service = axios.create({
  baseURL: BASEURL
});



// 添加请求拦截器
service.interceptors.request.use(function (config) {

  // config.data=JSON.stringify(config.data)
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});



// 添加响应拦截器
service.interceptors.response.use(function (response) {

  // 对响应数据做点什么
  return response;


}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


export default service