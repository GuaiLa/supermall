<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <!-- 商品列表展示 -->
    <cart-list></cart-list>

    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"

import CartList from "./childComps/CartList"
import CartBottomBar from "./childComps/CartBottomBar"

// Vuex 里有个方法，可以直接获取 getters 里定义的属性，可以不用两边都定义 计算属性
import { mapGetters } from "vuex"

export default {
  name: "Shopcart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // cartLength() {
    //   return this.$store.state.cartList.length
    // }
    // 两种语法  vuex.vuejs.org
    //  ...mapGetters([])  直接导入定义的属性
    //  ...mapGetters({})  可以把定义的属性 重新定义一个名
    ...mapGetters([
      'cartLength',
      'cartList'
    ])
  }
}
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    /* font-weight: 700; */
  }
</style>