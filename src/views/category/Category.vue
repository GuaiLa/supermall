<template>
  <div id="category">
    <nav-bar class="category-nav"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories"
                @selectItem="selectItem"></tab-menu>

      <scroll class="tab-content" :data=[categoryData]  ref="scroll" :probe-type='3' :pull-up-load="true" @pullingUp="loadMore">
        <tab-content-category :subcategories="showSubcategory"></tab-content-category>
        <tab-control :titles="['综合', '新品', '销量']"
                      @itemClick="tabClick"></tab-control>
        <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
      </scroll>

    </div>

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from "components/common/scroll/Scroll"

import TabMenu from "./childComps/TabMenu"
import TabContentCategory from "./childComps/TabContentCategory"
import TabControl from 'components/content/tabControl/TabControl'
import TabContentDetail from './childComps/TabContentDetail'


import {getCategory, getSubcategory, getCategoryDetail} from "network/category"

export default {
  name: "Category",
  components: {
    NavBar,
    Scroll,

    TabMenu,
    TabContentCategory,
    TabControl,
    TabContentDetail
  },
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
      currentType: "pop",
    }
  },
  created () {
    // 1. 请求分类数据
    this._getCategory()
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  methods: {
    /*
    * 定义方法 获取网络数据
    */
    _getCategory() {
      getCategory().then(res => {
        //  1. 获取分类数据
        this.categories = res.data.category.list
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        // 3.请求第一个分类的数据
        this._getSubcategories(0)
      })
    },
    _getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then(res => {
        this.categoryData[index].subcategories = res.data
        this.categoryData = {...this.categoryData}
        this._getCategoryDetail('pop')
        this._getCategoryDetail('sell')
        this._getCategoryDetail('new')
      })
    },
      _getCategoryDetail(type) {
		    // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
		      // 3.将获取的数据保存下来
		      this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
    /*
    * 事件响应的相关方法
    */
    selectItem(index) {
      this._getSubcategories(index)
    },
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
    },
    loadMore() {
     this._getCategoryDetail(this.currentType)

    // 图片上拉加载时中途卡顿，是因为BScroll 在异步加载图片时，没有实时刷新
    this.$refs.scroll.scroll && this.$refs.scroll.scroll.refresh()
   },
  }
}
</script>

<style scoped>
  #category {
    height: 100vh;
    position: relative;
  }

  .category-nav {
    background-color: var(--color-tint);
    color: #fff;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }

  .tab-content {
    overflow: hidden;
    height: 100%;
    flex: 1;
  }
</style>