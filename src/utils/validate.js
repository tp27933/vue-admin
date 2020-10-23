/*過濾特殊符號
*/
export function stripscript(str) {
  var pattern = new RegExp(
    '[`!@%#$^&*()=|{}’:;’, .<>/?！@#￥……&*（）——|{}&【】‘；：”“’。，、？]',
  )
  var rs = ''
  for (var i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(pattern, '')
  }
  return rs
}
/*驗證信箱 */
export function validateEmail(value){
    let reg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
 return !reg.test(value)? true:false
}
/*驗證密碼*/
export function validatePass(value){
    let reg=/^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
 return !reg.test(value)? true:false
}
/*驗證碼*/
export function validateCo(value){
    let reg=/^[a-z0-9]{6}$/
 return !reg.test(value)? true:false
}
