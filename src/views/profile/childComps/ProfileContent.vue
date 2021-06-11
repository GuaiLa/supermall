<template>
  <div class="content">
    <div>
      <img src="~assets/img/profile/message.svg" alt="">
      <p>我的消息</p>
    </div>
    <div>
      <img src="~assets/img/profile/pointer.svg" alt="">
      <p>积分商城</p>
    </div>
    <div class="vip">
      <img src="~assets/img/profile/vip.svg" alt="">
      <p>会员卡</p>
    </div>
    <div @click="toCartClick">
      <img src="~assets/img/profile/cart.svg" alt="">
      <p>我的购物车</p>
    </div>
    <div>
      <img src="~assets/img/profile/shopping.svg" alt="">
      <p>下载购物APP</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileContent",
  methods: {
    toCartClick() {
      this.$emit("toCartClick")
    }
  }
  }
</script>

<style scoped>
  .content {
    overflow: hidden;
    font-size: 14px;
  }

  .content img {
    width: 20px;
    margin: 10px 0 0 10px;
  }

  .content div {
    line-height: 12px;
    border-top: 1px solid #eee;
  }

  .content div p {
    position: relative;
    left: 40px;
    top: -18px;
  }

  .vip {
    border-bottom: 20px solid #eee;
  }
</style>