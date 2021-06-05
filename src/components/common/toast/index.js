// 自定义插件

//  在 main.js 文件导入这个文件
//  用 Vue.use(名称) 安装
//  在 该文件 定义安装的内容  obj.install = function (默认导入参数 Vue) {}

import Toast from "./Toast"

const obj = {}

obj.install = function(Vue) {
  // console.log('执行了obj的install函数', Vue);
  // Vue.prototype.$toast = 对象;

  // 添加标签 .appendChild() 方法向节点添加最后一个子节点  但一般构造组件树时使用 Vue.extend() 构造
  // console.log(Toast.$el);  // 打印是一个 undefined  因为执行 install函数时，el还未挂载
  // document.body.appendChild(Toast.$el)  // 此方法无法使用

  // 1. 创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  // 2. 用 new 的方式， 根据组件构造器，可以创建出来一个组件对象
  const toast = new toastContrustor()

  // 3. 将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  // 4. 此时 toast.$el 对应的就是 div 了, 这时才可以使用添加节点
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast;
}

export default obj