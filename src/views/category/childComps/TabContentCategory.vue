<template>
  <div>
    <grid-view :cols="3" :lineSpace="10" :v-margin="10" v-if="subcategories.list">
      <div class="item" v-for="(item, index) in subcategories.list" :key="index">
        <a :href="item.link">
          <img class="item-img" :src="item.image" alt="">
          <div class="item-text">{{item.title}}</div>
        </a>
      </div>
    </grid-view>
  </div>
</template>

<script>
import GridView from "components/common/gridView/GridView"

export default {
  name: "TabContentCategory",
  components: {
    GridView
  },
  props: {
    subcategories: {
      type: Object,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .item {
    text-align: center;
    font-size: 12px;
  }

  .item-img {
    width: 40%;
  }

  .item-text {
    margin-top: 15px;
  }
</style>