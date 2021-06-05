// 1.导入
import Vue from "vue"
import Vuex from "vuex"

import getters from "./getters"

// 2. 安装插件
Vue.use(Vuex)

// 3. 创建 store 对象
const store = new Vuex.Store({
  // Vuex 本身建议的就是 state 的数据若是要修改状态，一般先通过 actions 后再由 mutations 修改
  state: {
    cartList: []
  },
  mutations: {
    // mutations 唯一的目的就是修改state中的状态
    // mutations 中的每个方法都尽可能完成的事件单一一些
    addCounter(state, payload) {
      payload.count ++
    },
    AddToCart(state, payload) {
      // 2.
      payload.checked = true,

      // 1.
      state.cartList.push(payload)

    }
  },
  getters,
  actions: {

// 这是原先在 mutations 定义的方法
    // addCart(state, payload) {
    //   // payLoad 新添加的商品
    //   let oldProduce = null;
    //   for(let item of state.cartList) {
    //     if (item.iid === payload.iid) {
    //       oldProduce = item;
    //     }
    //   }

    //   // 2. 判断 oldProduce 是否有值

    //   //  indexOf:  let index = state.cartList.indexOf(payload) {}
    //   // 判断 if(index !== -1)

    //   //  查找之前数组中是否有该商品
    //   //  find() :  let produce = state.cartList.find(item => item.iid === payload.iid) {}
    //   // 判断 if(produce)
    //   if (oldProduce) {
    //     oldProduce.count += 1
    //   } else {
    //     payload.count = 1
    //     state.cartList.push(payload)
    //   }

    //   state.cartList.push(payload)
    // }

    // actions 中定义的方法
    // context 可以解构成 {state, commit}
    addCart(context, payload) {
      return new Promise((resolve, reject) => {
        // 1 查找之前的数组中是否有该商品
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

        // 2 判断 oldProduct
        if (oldProduct) {
              // mutations 进行重构
          // oldProduct.count += 1
          context.commit('addCounter', oldProduct)
          resolve('当前商品数量+1')
        } else {
          payload.count = 1
          // context.state.cartList.push(payload)
          context.commit('AddToCart', payload)
          resolve('添加了新商品')
        }
      })
    }
  },
  modules: {},
})

// 4. 挂载Vue实例上
export default store