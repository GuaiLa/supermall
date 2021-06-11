<template>
  <div class="goods-item" @click="itemClick">

    <!-- <img :src="showImage" alt="" @load="imageLoad">
      安装了 vue-lazyload 之后，要实现图片懒加载就得使用 v-lazy -->
    <img v-lazy="showImage" alt="" @load="imageLoad" :key="showImage">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  mounted () {
  },
  computed: {
    showImage() {
      return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    // vue 解决better-scroll 中出现的可滚动区域多少的问题

    // 这里需要取到 $scroll，使用 $bus 事件总线  这个方法去获取
    imageLoad() {
      // 发射 事件总线事件   $bus.$emit("事件名称")
      // 由于这个文件复用问题，所以可以添加判断进行针对各自组件的事件

      // this.$bus.$emit('itemImageLoad')

      /* 1 第一种做法
      if(this.$route.path.indexOf('/home')) {
        this.$bus.$emit('homeItemImageLoad')
      } else if (this.$route.path.indexOf('/detail')) {
        this.$bus.$emit('detailItemImageLoad')
      }
      */

      // 2、第二种做法,在各自的组件中写各自的监听事件
      // 这里是  首页中 取消全局事件监听； 详情页里监听事件
      this.$bus.$emit('itemImageLoad')
    },

    // 监听点击，跳转详情
    itemClick() {
      this.$router.push('/detail/' + this.goodsItem.iid)

      // let iid = this.goodsItem.iid;
      // // query 动态获取

      // this.$router.push({
      //   path: "/detail",
      //   query: {
      //     iid
      //   }
      // })
    }
  }
}
</script>

<style>
  .goods-item {
    padding-bottom: 40px;
    position: relative;/* 子绝父相，定位时必用的，否则子的绝对定位就会根据root定位了 */

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {/* 这个伪类是为了设置文字前方的小星星图标的 */
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>