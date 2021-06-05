import {request} from "./request"

export function getHomeMultidata() {
  return request({
    url: "/home/multidata"
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}



// 函数调用 -> 压入函数栈(保存函数调用过程中所有变量)
// 函数调用结束 -> 弹出函数栈(释放函数所有的变量)
// 当函数再次调用时，变量又会被重新创建，调用完又被销毁
/*
function test() {
  const names = ['why', 'aaa']
}

test()
*/


// 把一个数组对象塞进另一个数组中
// const totalNums = []
// const nums1 = [22, 11, 55, 88, 99]
// const nums2 = [25, 11, 555, 882, 991, 333]

//  1.
// for (let n of nums1) {
//   totalNums.push(n)
// }

//  2. 有个push方法的语法   .push(...数组名)
// totalNums.push(...nums1)
