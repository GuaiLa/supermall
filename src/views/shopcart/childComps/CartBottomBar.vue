<template>
  <div class="bottom-bar">
    <div class="check-button">
      <CheckButton class="check-toolbar"
                    :is-checked="isSelectAll"
                    @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计 ￥{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去结算 ({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton"
// import { mapGetters } from "vuex"

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  // ...mapGetters(["cartList"]),
  computed: {
    totalPrice() {
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if(this.$store.state.cartList.length === 0) return false

      // 1 使用 filter 高阶函数
      // return !(this.$store.state.cartList.filter(item => !item.checked).length)

      // 2 使用find 方法
      return !(this.$store.state.cartList.find(item => !item.checked))
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) { // 全部选中
  // forEach() 方法用于调用数组的每个元素，并将元素传递给回调函数。
        this.$store.state.cartList.forEach(item => item.checked = false)
      } else {  // 部分或全部没选中
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show('请选择想要购买的商品', 2000)
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;

    background-color: #eee;

    font-size: 15px;
  }

  .check-button {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 66px;
  }

  .check-toolbar {
    width: 18px;
    height: 18px;
    line-height: 18px;
    border: 1px solid #aaa;
  }

  .price {
    margin-left: 20px;
    flex: 1;
  }

  .calculate {
    width: 99px;
    background-color: #ff5154;
    color: #fff;
    text-align: center;
  }
</style>