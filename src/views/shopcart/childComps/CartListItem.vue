<template>
  <div id="shop-item">

    <div class="item-selector">
      <check-button :is-checked="itemInfo.checked"
                    @checkClick="checkClick"></check-button>
    </div>

    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片">
    </div>

    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{itemInfo.price}}</div>
        <div class="item-count right">x{{itemInfo.count}}</div>
      </div>
    </div>

  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton"

export default {
  name: "CartListItem",
  components: {
    CheckButton
  },
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    checkClick() {
      this.itemInfo.checked = !this.itemInfo.checked
    }
  }
}
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 20px;
    display: flex;
    justify-content: center;

/* align-items 属性定义flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式 */
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;

    /* white-space 属性设置如何处理元素内的空白。 */
    white-space: nowrap;
/* text-overflow  属性规定当文本溢出包含元素时发生的事情  '
   ellipsis	显示省略符号来代表被修剪的文本。 */
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /* border: 1px solid #ccc; */
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-title {
    color: #333;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .item-info .info-bottom .item-price {
    color: rgba(255, 69, 0, 1);
  }
</style>