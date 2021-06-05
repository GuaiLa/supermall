<template>
  <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
          <!-- @load  监听图片加载 -->
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper"

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  // 这里是为了减少 img 的 @load 事件的次数，提高性能
  // 因为这里是只需要 一次的数据，并非是为了让他缓一缓，所以不用防抖函数
  data() {
    return {
      isLoad: false
    }
  },
  methods: {
    imageLoad() {
      if(!this.isLoad) {
        this.$emit("swiperImageLoad")
        this.isLoad = true
      }
    }
  }
}
</script>

<style>

</style>