<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control" v-show="isTabFixed"/>
    <scroll class="content" ref="scroll" :probe-type='3' @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']"
                    @tabClick="tabClick"
                    ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- 当需要@ 监听组件的原生事件时，+ .native 才能成功监听
        @ 监听事件是不能监听自定义组件的-->

  </div>
</template>

<script>

import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from "./childComps/RecommendView"
import FeatureView from "./childComps/FeatureView"

import NavBar from "components/common/navbar/NavBar"
import TabControl from "components/content/tabControl/TabControl"
import GoodsList from "components/content/goods/GoodsList"
import Scroll from "components/common/scroll/Scroll"

import {getHomeMultidata, getHomeGoods} from "network/home"
import {itemListenerMixin, backTopMixin} from "common/mixin"

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll
  },
  // mixin 混入 导入之后的使用
  mixins: [itemListenerMixin, backTopMixin],

  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {

    //1.请求多个数据
    this.getHomeMultidata()

    // 2.请求商品数据
    this.getHomeGoods("pop")

    this.getHomeGoods("new")

    this.getHomeGoods("sell")

  },
  mounted() {
    // 3. 监听item中图片加载完成    $bus.$on('事件名', fn)
    // const refresh = debounce(this.$refs.scroll.refresh, 500)

    // this.$bus.$on('itemImageLoad', () => {
      // this.$refs.scroll.scroll && this.$refs.scroll.scroll.refresh()
      // 执行频率很高  使用防抖函数进行一个延时，节流作用
      // refresh()
    // })

    // 这里另外做了混入，这一份重复的代码就可不用了
  },
  destroyed () {

  },

  // 实现了keep-alive之后，用activated 和 deactivated 保持位置
  activated () {
    this.$refs.scroll.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated () {
    // 1、 保存Y值
    this.saveY = this.$refs.scroll.scroll.y //scroll 里有个方法可以获取x，y值

    // 2、 取消全局事件的监听
    // this.$bus.$off('取消的事件名'， 监听使用的函数)
    this.$bus.$off('itemImageLoad', () => refresh())

  },

  // 用 methods 封装，create生命周期函数就可以写的简便些
  methods: {
    /*
        *  事件监听相关的方法
    */
   tabClick(index) {
     switch(index) {
      case 0:
        this.currentType = "pop"
        break
      case 1:
        this.currentType = "new"
        break
      case 2:
        this.currentType = "sell"
        break
     }
    //  设置两个tabControl 的index相同，不会出现两者跳转不同
     this.$refs.tabControl1.currentIndex = index;
     this.$refs.tabControl2.currentIndex = index;
   },
   backClick() {
    // this.$refs.scroll.scroll.scrollTo(0, 0, 1000)    这种不完善，容易出现一些值找不到，之后网页报错

    //     第二种写法：  最严谨的方法
    // this.$refs.scroll.scroll && this.$refs.sroll.scroll.scrollTo && this.$refs.scroll.scroll.scrollTo(0, 0, 1000)

    //   一般使用第三种
    this.$refs.scroll.scroll && this.$refs.scroll.scroll.scrollTo(0, 0, 1000)
   },
   contentScroll(position) {
    //  1. 判断BackTop是否显示
    //  this.isShowBackTop = (-position.y) > 1000
    this.listenShowBackTop(position)

    //  2. 决定tabControl是否吸顶(position: fixed)
    this.isTabFixed = (-position.y) > this.tabOffsetTop
   },
   loadMore() {
     this.getHomeGoods(this.currentType)

    // 图片上拉加载时中途卡顿，是因为BScroll 在异步加载图片时，没有实时刷新
    this.$refs.scroll.scroll && this.$refs.scroll.scroll.refresh()

   },
   swiperImageLoad() {
    //  获取tabControl的offsetTop   获取元素的位置 /高度
    //  这个属性只能用于元素中，无法直接用与组件
    // 所有的组件都有一个属性 $el:  用于获取组件中的元素
    this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
   },
    /**
        *  网络请求相关的方法

    **/
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },

    // 在方法里定义一个变量type，之后调用时就可以调用多个不同数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        // 加载过一次之后就没有了，就得重新调用加载
        this.$refs.scroll.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
/* style 加上 scoped 属性之后，只会对当前文件的定义的标签起效果 */
  #home {
     /* padding-top: 44px; */
    /* 视口高度会将 padding这一部分忽略不计 */

    /* vh  viewport height   译为 视口高度   100vh 即可表示为100%的视口高度*/
    height: 100vh;

    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /*
    在使用浏览器原生滚动时，为了不让导航跟随一起滚动，设置的属性
    而当中间部分被其它插件做了局部滚动时，这个属性可以不用
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
     */
    /* z-index仅能在定位元素上奏效，是用来设置元素的堆叠顺序的，高的会在低的元素前面 */
  }

  .tab-control {
    /* position: sticky; */
    position: relative;
    z-index: 9;
  }

/*
    获取了 offsetTop 之后，动态绑定class 设置style属性
    对于better-scroll是不支持的，所以该方法不能够吸顶
  .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  }
 */

/*
用css 做吸顶效果 这个属性基本适配移动端,但必须是原生滚动，这个样式才起效果
而用better-scroll 之后，这个属性就没法用了
  .tab-control {
    position: sticky;
    top: 44px; // 吸顶效果必须添加的一个数据
    z-index: 9;
  }
*/

/* 2. 使用 定位 */
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /*
  1. 第一种方案，写css样式，需加上 home的 vh height，且无法用padding-top
      第一种  就是使用高度计算

  .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>