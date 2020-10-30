import cookie from 'cookie_js';

export function getToken() {
  return cookie.get('admin_toToken');
}
export function setToken(token) {
  return cookie.set('admin_toToken', token);
}
export function removeToken(token) {
  return cookie.remove('admin_toToken');
}
export function setUserName(val) {
  return cookie.set('username', val);
}
export function removeUserName(val) {
  return cookie.remove('username');
}
export function getUserName() {
  return cookie.get('username');
}
