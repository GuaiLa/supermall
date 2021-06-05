//  debounce 防抖函数  做的一个延时装置
export function debounce(func, delay) {
   let timer = null
   return function(...args) {
     if (timer) clearTimeout(timer)
     timer = setTimeout(() => {
      //  .apply  改变 this 的指向
       func.apply(this, args)
     }, delay)
   }
 }

//  formatDate 时间戳转换date 对象后，使用formatDate 方法转换时间格式字符串
//  formaDate 的封装，基本上是用正则写的，正则表达式是一个 字符串匹配的利器
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + ' ').substr(4 - RegExp.$1.length));
  };
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),   // 有时候会需要区分h/H 12小时制/24小时制
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};