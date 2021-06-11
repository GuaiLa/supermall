module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度(开发中标准设计稿宽度：750，但一般是在retina下运行，但正常是375)
      viewportHeight: 667, // 视窗的高度，对应的是我们设计稿的高度(也可以不配置)

      // 设置 视窗宽高度，是为了方便按照某一个数值进行比例缩放  一般是基于某个机型设置的设计稿

      unitPrecision: 5, // 指定`px`转换为视窗单位值小数位数(很多时候无法整除)
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用`vw`
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'], // 指定不需要转换的类，这里也是根据正则去匹配的
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位
      mediaQuery: false, // 允许在媒体查询中转换 `px`
      exclude: [/TabBar/], // 指定不需要转换的文件, 只能以数组或正则的形式，数组内部的也得用正则表达
    },
  }
}


//  1. 在js中使用正则： 须用 // 包裹元素  写法： /正则相关规则/
//  2. 在exclude中存放的元素必须是正则表达式
//  3. 按照要排除的文件写对应的正则：

// 正则规则   注意符号，顺序
//  1>  ^ : 表达匹配的内容，必须是以什么内容开头  ^abc(以abc开头)
//  2>  $ : 表达匹配的内容，必须是以什么内容结尾  abc$(以abc结尾)