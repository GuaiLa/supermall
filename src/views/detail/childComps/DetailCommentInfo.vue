<template>
    <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">

      <div class="info-header">
        <div class="header-title">用户评价</div>
        <div class="header-more" @click="跳转">
          更多
          <i class="arrow-right"></i>
        </div>
      </div>

      <div class="info-user">
        <img :src="commentInfo.user.avatar" alt="">
        <span>{{commentInfo.user.uname}}</span>
      </div>

      <div class="info-detail">
        <p>{{commentInfo.content}}</p>
        <div class="info-other">
          <!--
            commentInfo.created 是一个时间戳，所以添加过滤器
           -->
          <span class="data">{{commentInfo.created | showDate}}</span>
          <span>{{commentInfo.style}}</span>
        </div>
        <div class="info-imgs">
          <img v-for="(item, index) in commentInfo.images" :key="index" :src="item" alt="">
        </div>
      </div>

    </div>
</template>

<script>
import {formatDate} from 'common/untils'

export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },

// 时间戳： 以Unix时间元年为起点，返回对应的时间戳。而从服务器返回的时间一般都是时间戳
// 问题： 如何将 时间戳 转换为 时间格式化字符串
/* 解决： 如 时间戳： 1535694719 (时间戳一般是 秒钟 )
 1. 先将时间戳 转成 Date 对象
    const date = new Date(1535694719 * 1000) // 因为date是毫秒，所以要 * 1000

 2. 将date进行格式化，转成对应的字符串
 2.1  date.getYear() + date.getMonth()+1 +   //一个个年月日时分秒取出后再拼接
 2.2  由于 date -> FormatString(格式化字符串)  由于太常见了，可以封装一个组件进行使用

  java 中就已经有一个方法 只需要拿到这个时间戳，假设是fmt，之后使用 .format(), 传入date 即可
  fmt.format(date)
  date后需要加上格式化的格式 如2021-05-31，则表示为 fmt.format(date, 'yyyy-MM-dd')
    若还要时分秒，即 fmt.format(date, 'yyyy-MM-dd hh:mm:ss')
这串的完整表示式是指 将时间戳转换成的 date 对象，转化格式为四位年份，二位月份跟日期，二位数的时分秒，中间的连接 '-' 和 ':' 是连接的符号
  有些表达式，设置时的时候会区分大小写， H/h， 表示一个是24小时制，一个是12小时制

3. 处理实例时，需要将时间戳转换时，需要配置过滤器


*/
  filters: {
    showDate(value) {
      //  1. 将时间戳转换成 date 对象
      const date = new Date(value * 1000)

      //  2. 将date进行格式化
      return formatDate(date, 'yyyy-MM-dd')
    }
  }
}
</script>

<style scoped>
  .comment-info {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }

  .header-title {
    float: left;
    font-size: 15px;
  }

  .header-more {
    float: right;
    margin-right: 10px;
    font-size: 13px;
  }

  .info-user {
    padding: 10px 0 5px;
  }

  .info-user img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }

  .info-user span {
    position: relative;
    font-size: 15px;
    top: -15px;
    margin-left: 10px;
  }

  .info-detail {
    padding: 0 5px 15px;
  }

  .info-detail p {
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }

  .info-detail .info-other {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }

  .info-other .date {
    margin-right: 8px;
  }

  .info-imgs {
    margin-top: 10px;
  }

  .info-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>