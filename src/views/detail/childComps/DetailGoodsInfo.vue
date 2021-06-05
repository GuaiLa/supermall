<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">

    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>

    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>

    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" :src="item" @load="imgLoad" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0,
    }
  },
  methods: {
    imgLoad() {
      // 这里用if 是为了让图片全部加载完再调用这个函数 而不用的话图片每加载一张就发射一次，性能不高

      /*
      这里的写法是以下的简写
      this.counter += 1
      if(this.counter === this.imagesLength){
        this.$emit('imageLoad')
      }
      */
      if(++this.counter === this.imagesLength) {
        this.$emit("imageLoad")
      }
    }
  },

  // watch  监听属性的改变  当属性值发生变化就会调用watch 对应的函数
  watch: {
    detailInfo() {
      this.imagesLength = this.detailInfo.detailImage[0].list.length
    }
  }
}
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
    position: inherit;
  }

  /* .info-desc .start {
    margin-left: 13px;
    border-bottom: 1px solid #ccc;
    width: 33%;
  } */
  .info-desc .start {
    position: relative;
    margin-left: 13px;
    margin-bottom: 8px;
    /* height: 1px;
    background-color: #ccc; */
    border-bottom: 1px solid #ccc;
    width: 20%;
  }

  .info-desc .start::before {
    content: "";
    height: 5px;
    width: 5px;
    background-color: #000;
    position: absolute;
    bottom: 0;
  }

  .info-desc .desc {
    margin: 8px 13px;
    font-size: 14px;
  }

  .info-desc .end {
    position: relative;
    float: right;
    margin-right: 13px;
    margin-bottom: 8px;
    border-bottom: 1px solid #ccc;
    width: 20%;
  }

  .info-desc .end::after {
    position: absolute;
    bottom: 0;
    right: 0;
    content: "";
    height: 5px;
    width: 5px;
    background-color: #000;
  }

  .info-key {
    margin: 8px 13px;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>