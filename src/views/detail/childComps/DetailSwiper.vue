<template>
    <swiper class="detail-swiper">
      <swiper-item class="swiper-item" v-for="(item, index) in topImages" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper"

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .swiper-item {
    /* 由于图片太大了，所以设置一个固定高度剪裁 */
    height: 330px;
    overflow: hidden;
  }
</style>