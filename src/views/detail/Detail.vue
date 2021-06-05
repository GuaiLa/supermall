<template>
  <div id="detail">
    <!-- 传入事件时，可以传入驼峰 -->
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>

<!-- better-scroll 进行局部滚动时，需要有固定高度 -->
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <!-- 属性中最好不写驼峰  值可以是驼峰   传入属性时，最好把驼峰的以 - 进行连接 -->
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <!-- <toast :message="message" :show="show"/> -->

  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar"
import DetailSwiper from "./childComps/DetailSwiper"
import DetailBaseInfo from "./childComps/DetailBaseInfo"
import DetailShopInfo from "./childComps/DetailShopInfo"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
import DetailParamInfo from "./childComps/DetailParamInfo"
import DetailCommentInfo from "./childComps/DetailCommentInfo"
import DetailBottomBar from "./childComps/DetailBottomBar"

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
// import Toast from 'components/common/toast/Toast';

import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail"
import {itemListenerMixin, backTopMixin} from "common/mixin"

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,

    Scroll,
    GoodsList,
    // Toast
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: {},
      // message: '',
      // show: false
    }
  },
  created() {
    // 1. 保存传入的iid
    this.iid = this.$route.params.iid

    // 2. 根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.result;

      // 做分离  1. 获取顶部图片轮播数据
      this.topImages = data.itemInfo.topImages

      // 2. 获取商品信息
      // console.log(data.itemInfo.price);
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 3. 创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)

      // 4. 保存商品的详情数据
      this.detailInfo = data.detailInfo
      // console.log(this.detailInfo);

      // 5. 获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 6. 取出评论信息（有一些没有评论信息）
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

      //     // 有一个方法，叫下一帧 this.$nextTick(() => { })
      // this.$nextTick(() => {
      //       // 根据最新的数据，对应的DOM是已经被渲染出来，但是图片依然是没有加载完的
      //       // 目前获取的 offsetTop 不包含其中的图片
      //       // offsetTop值不对的时候，一般都是因为图片问题
      //   this.themeTopYs = []

      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //       // undefined 是因为组件中有v-if 判断，当没有数据时，组件直接就不渲染
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

      //   console.log(this.themeTopYs);
      // })

    })



    // 3.请求详情页中 推荐的数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list
    })
  },
  mounted () {
    // 做了混入 mixin
    // console.log("混入后，在组件内的内容也可展示，使用");
  },
  updated () {
    // 这个函数是指 当元素变化时就会回调的生命周期函数
  },
  methods: {
    imageLoad() {
      this.refresh()

      this.themeTopYs = []

      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // 为了能够更方便的遍历，添加的一个最大值
      this.themeTopYs.push(Number.MAX_VALUE)

      // console.log(this.themeTopYs);
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 370)
    },
    contentScroll(position) {
      // console.log(position);
      //  1. 获取Y值
      const positionY = -position.y

      // 2.positionY 和主题中的值进行对比
      // for(let i in this.themeTopYs) {
        // console.log(i); //这里的 i 是一个str类型
        // if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
        //   console.log(i);
        //  等到最后一个 i+1 时，是undefined 的，最后是无法加载到 i = 3
        // }
      // }

      // 所以最后还是用比较简单的方法，再加反向的判断，从大到小判断就可以了
      // 1. 普通做法
      // let length = this.themeTopYs.length
      // for (let i = 0; i < length; i++) {
      //   // 判断频繁，加上变量一起判断
      //   if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
      //     // console.log(i); // 打印太频繁， 可以设置一个变量保存
      //     this.currentIndex = i;
      //     // console.log(this.currentIndex);
      //     this.$refs.nav.currentIndex = this.currentIndex;
      //   }
      // }

      // 2. hack做法
      // 需要在数组后再加上一个最大值  js里的最大值是 Number.MAX_VALUE
      // 再做一次性的大于等于小的 和 小于大的的判断，最终取值不遍历最后一个即可
      // console.log(Number.MAX_VALUE);
      let length = this.themeTopYs.length
      for (let i = 0; i < length - 1; i++) {
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

    //  3. 是否显示回到顶部
     this.listenShowBackTop(position)
    },
    backClick() {
      this.$refs.scroll.scroll && this.$refs.scroll.scroll.scrollTo(0, 0, 1000)
    },
    addToCart() {
      // 1.获取购物车展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.nowPrice
      product.iid = this.iid

      // 2. 将商品添加到购物车中显示
      // this.$store.cartList.push(produce)  vuex不要在这改，要在mutations 修改值
      // this.$store.commit('addCart', produce)

      // 3.  .dispatch会回调一个promise   可以利用 .then()方法监听商品加入购物车情况
      this.$store.dispatch('addCart', product).then(res => {
          // console.log(res);
        //   this.show = true
        //   this.message = res

        // setTimeout(() => {
        //   // console.log(res);
        //   this.show = false
        //   this.message = ''
        // }, 1500)

        // console.log(this.$toast);
        this.$toast.show(res, 1500)
      })

  /* 除了可以 mapGetters映射， vuex里的所有都可以作映射。如 mapActions，
  同样是 import { mapActions } from 'vuex'  只有中间的 map映射值修改，其他基本不变
      mapGetters 在 computed 里调用
      mapActions 在 methods  里调用
      详见官网  vuex.vuejs.org   */
    }
  }
}
</script>

<style scoped>
  /* 不想下方 navbar 还是原来老样式(首页、分类、购物车、我的) 替换成收藏店铺那些 */
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;

    height: 100vh;
  }

  .detail-nav {
    /* 相对定位一般用于做微调 */
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    /* 利用 calculate 计算高度  css 中calc 代替写法 */
    height: calc(100% - 44px - 58px);
  }
</style>