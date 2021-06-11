<template>

<!-- ref /children
ref 如果是绑定在组件上的，那么通过 this.$refs.refname 获取到的是一个组件对象
ref 如果是绑定在普通元素上的，那么通过 this.$refs.refname 获取到的是一个元素对象  -->

  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      scroll: {},
      x: null,
      y: null,
      time: null
    }
  },
  methods: {
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo(x, y, time=330) {
      this.scroll.scrollTo(x, y, time)
    }
  },
  mounted() {

//  通过 document.querySelector 获取类元素时，容易出现获取报错，所以得用 ref 来获取
//  使用   $refs.(ref的命名) 来获取

//  this.scroll = new BScroll(document.querySelector('.wrapper'), {})


// 1. 创建BScroll 对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    // this.scroll.scrollTo(x, y)  这个BScroll 的方法是可以方便调用之后回到某个位置
    //   这个方法中，也有第三个参数 (x, y， time（ms）) 以ms 为单位的时间参数



// 2. 监听滚动位置
  // 添加 if 判断 提高性能
    // if (this.probeType === '2' || this.probeType === '3') {

    // }
      this.scroll.on("scroll", (position) => {
          // console.log(position);
          this.$emit('scroll', position)
        })


// 3.监听上拉事件
    if (this.pullUpLoad) {
        this.scroll.on("pullingUp", () => {
          this.$emit('pullingUp')
        })
      }
  }
}
</script>

<style>

</style>