<template>
  <div class="profile-i">

    <div class="profile-title">
      <img src="~assets/img/profile/avatar.svg" alt="">
      <span>登录/注册</span>
      <div class="pitem">
        <img src="~assets/img/profile/phone.svg" alt="">
        <p>暂无绑定手机号</p>
      </div>
      <div><img src="~assets/img/common/arrow-left.svg" alt="" class="img"></div>
    </div>

    <div class="mine">
      <div class="balance">
        <div>{{balance}}</div>
        <p>元</p>
        <span>我的余额</span>
      </div>
      <div class="discount">
        <div>{{discount}}</div>
        <p>个</p>
        <span>我的优惠</span>
      </div>
      <div class="integral">
        <div>{{integral}}</div>
        <p>分</p>
        <span>我的积分</span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "ProfileTitle",
  data() {
    return {
      money: 0.00,
      discount: 0,
      integral: 0,
    }
  },
  computed: {
    balance() {
      return this.money.toFixed(2)
    }
  }
}
</script>

<style scoped>
  .profile-i {
    margin-top: 43px;
  }

  .profile-title {
    width: 100%;
    height: 88px;
    background-color: var(--color-tint);

    font-size: 14px;
    color: #fff;
  }

  .profile-title>img {
    margin-left: 20px;
    margin-top: 10px;
    width: 66px;
    height: 66px;
  }

  .profile-title span {
    position: relative;
    font-size: 16px;
    left: 30px;
    top: -40px;
  }

  .pitem img {
    position: relative;
    left: 110px;
    top: -30px;
    height: 20px;
  }

  .pitem p {
    position: relative;
    left: 130px;
    top: -50px;
  }

  .img {
    position: absolute;
    top: 50px;
    right: 10px;

    width: 20px;
    height: 66px;
  }

  .mine {
    width: 100%;
    height: 88px;
    font-size: 14px;
    margin-top: 10px;
    text-align: center;
    display: flex;
    border-bottom: 20px solid #eee;
  }

  .balance {
    flex: 1;
    border-right: 1px solid #eee;
  }

  .balance div {
    color: orangered;
    font-size: 20px;
  }

  .balance p {
    position: relative;
    left: 30px;
    top: -20px;
  }

  .balance span {
    position: relative;
    top: -10px;
    left: 8px;
  }

  .discount {
    flex: 1;
    border-right: 1px solid #eee;
  }

  .discount div {
    color: orangered;
    font-size: 20px;
  }

  .discount p {
    position: relative;
    left: 16px;
    top: -20px;
  }

  .discount span {
    position: relative;
    top: -10px;
    left: 8px;
  }

  .integral {
    flex: 1;
  }

  .integral div {
    color: orangered;
    font-size: 20px;
  }

  .integral p {
    position: relative;
    left: 16px;
    top: -20px;
  }

  .integral span {
    position: relative;
    top: -10px;
    left: 8px;
  }

  .division {
    height: 54px;
    width: 1px;
    background-color: #ccc;
  }
</style>