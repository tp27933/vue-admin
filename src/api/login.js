import service from '@/utils/request.js'

//獲取驗證碼
export function getSms(data){
  console.log(data);
  return  service.request({
    method: 'post',
    url: '/getSms/',
    data
  });
}
//註冊請求
export function register(data){
  return  service.request({
    method: 'post',
    url: '/register/',
    data
  });
}
//登入請求
export function Login(data){
  return  service.request({
    method: 'post',
    url: '/login/',
    data
  });
}