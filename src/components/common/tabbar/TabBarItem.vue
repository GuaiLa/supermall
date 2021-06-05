<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 要展示的item，不是每个都一样的 -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeColor: {
        type: String,
        default: "red"
      }
    },
    data() {
      return {
        // isActive: true
      }
    },
    computed: {//计算属性，相当于变量
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1
        //  indexOf == -1 表示这个是undefind
      },

      // 动态绑定style属性
      activeStyle() {
        // 该表达式意思是：
        // 判断this.isActive 是否处于活跃状态。是的话显示默认样式，不是的话则没有style样式呈现
        return this.isActive ? {color: this.activeColor} : {}
        //       三元运算符
        // ? 判断 this.isActive   ?后是表示判断为true时 被判断物的表现， : 是? 判断为false时的表现
      }
    },
    methods: {
      itemClick() {
        // this.$router.replace(this.link)  使用这个，当页面双击同个路径时，会报错
        //  所以使用下方这个，把 .err错误丢掉
        this.$router.push(this.path).catch(err=>{})

        // console.log("itemClick");
        // console.log(this.link);
      }
    }
  }
</script>

<style>
  .tab-bar-item {
    flex: 1;
    /* flex: 1   可以让多个标签进行均等分布*/
    text-align: center;
    /* tabbar 的高度，一般是 49px */
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    height: 20px;
    width: 20px;
    margin-top: 3px;
    /* 图片下方默认有 3px 空白，可以用 vertical-align 处理*/
    vertical-align: middle;
    margin-bottom: 2px;
  }
/*
:class="{active: isActive}"
  .active {
    color: red;
  } */
</style>