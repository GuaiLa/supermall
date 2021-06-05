//  这里是为减少重复代码 做了mixin 混入技术  mixin技术是vue里才有的

import {debounce} from './untils'

import BackTop from "components/content/backTop/BackTop"


// 很多东西都可以混入
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null,
    }
  },
  mounted () {
    this.refresh = debounce(this.$refs.scroll.refresh, 330)
    this.itemImgListener = () => {
      this.refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    // console.log("这里是混入内容，会将两个调用的函数，放到一起使用");
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 330)
    },
    listenShowBackTop(position) {
      this.isShowBackTop = -position.y > 770
    }
  }
}