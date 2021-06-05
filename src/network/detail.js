import {request} from "./request"

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

// ES5 跟 ES6 定义的语法比较
/* ES5
  function Person() {

  }
*/
/* ES6
class Person {
  // 构造器
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
const p = new Person(name, age)

p.name
p.age

 这里的ES6 语法就已经表示，new 了一个 Person类了
 当const p = new Person()时，就会调用前面的Person类
 如果还需要传入一个参数，那么就可以在类里 constructor() 一个参数

*/
export function getRecommend() {
  return request({
    url: '/recommend'
  })
}

export class Goods {
  // 因为商品基本信息的数据太杂乱，可以把它们整合在一个对象里
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.nowPrice = itemInfo.highNowPrice
    this.discount = itemInfo.discountDesc


    this.columns = columns
    this.services = services

  }
}

export class GoodsParam {
  constructor(info, rule) {
    // 注： images可能没有值(某些商品有值，有些商品没有)
    this.image = info.images ? info.images[0] : ' ' ;
    this.info = info.set
    this.size = rule.tables
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}


// 判断某个对象是否为null
/*
const obj = {

}

判断
Object.keys(obj).length === 0 当这个为true时，表示obj 对象为null

即用 Object.keys(要判断的对象) 来判断 对象里有没有 key
用 .length 判断长度来进行 true 跟 false 的判断切换
*/