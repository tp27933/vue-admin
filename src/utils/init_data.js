export function initDate (data) {
  function tran_val (val) {
    if (val < 10) {
      val = "0" + val;
    } return val;
  }
  var date = new Date(data);
  var year = date.getFullYear();
  var month = tran_val(date.getMonth() + 1);
  var day = tran_val(date.getDate());
  var datestr = year + "-" + month + "-" + day;
  return datestr
}
