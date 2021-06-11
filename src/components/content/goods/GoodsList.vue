<template>
  <div class="goods">
    <goods-list-item v-for="(item, index) in goods" :key="index" :goods-item="item"/>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem"

export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>
  /* 为了让商品展示分两行并排展示布局，以下是css样式的写法 */
  .goods {
    /* 1.设置布局 */
    display: flex;

    /* 2.设置宽度大小  这个在GoodsListItem里面设置 */

    /* 3.设置布局包裹，这样会根据宽度大小来进行换行操作 */
    flex-wrap: wrap;

    /* 4.进行布局微调 justify-cotent
     值： space-around  将项目位于各行之前、之间、之后都留有空白*/
    justify-content: space-around;
    padding: 2px;
  }
</style>