import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"

import FastClick from "fastclick"
import VueLazyLoad from "vue-lazyload"

import toast from "components/common/toast";

Vue.config.productionTip = false

// 事件总线 $bus 是不存在的 所以需要自己创建一个 $bus  而Vue实例是可以作为事件总线的
Vue.prototype.$bus = new Vue()

// 安装 toast 插件  (全局组件)
Vue.use(toast)

//  解决移动端的 300ms 延迟
FastClick.attach(document.body)

// 安装懒加载
// Vue.use(VueLazyLoad)   vue-lazyload 在安装时还可导入其他的一些元素，例如占位图
Vue.use(VueLazyLoad, {
  // 占位图属性  loading
  loading: require("./assets/img/common/plmm.jpg")
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')


/*
console.log('aaaa');

setTimeout(() => {
  console.log("bbbb");
})

console.log('cccc');
*/

// 打印顺序会是 aaaa -> cccc -> bbbb
//  setTimeout默认是等浏览器空闲下来再执行的， 所以setTimeout里的东西只会在最后面执行


/* 继承代码   为了减少重复代码
 mixin     也是 mix in  混入。也是为了减少重复代码所使用的技术*/

// 1. 使用ES6 语法写继承 下面是举例给 类 的继承
/*
class Animal {
  run() {

  }
}
// ES6中，用 extends 可以直接继承
class Person extends Animal {
  // run() {

  // }
}

class dog extends Animal {
  // run() {

  // }
}
*/
