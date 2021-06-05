<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  // props: {
  //   message: {
  //     type: String,
  //     default: ''
  //   },
  //   show: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  // 自定义插件
  data() {
    return {
      message: "",
      isShow: false
    }
  },
  methods: {
    show(message, duration=1000) {
      // duration = duration || 2000   ES6以前赋默认值

      this.isShow = true;
      this.message = message;

      setTimeout(() => {
      this.isShow = false;
      this.message = "";
      }, duration)
    }
  }
}
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;

    /* 根据自身宽高度 调正位置 */
    transform: translate(-50%, -50%);

    padding: 8px 10px;
    text-align: center;

    z-index: 999;

    color: #fff;
    background-color: rgba(0, 0, 0, .6);
  }
</style>