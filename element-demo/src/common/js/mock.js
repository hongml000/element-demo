// 用法可参考： https://www.jianshu.com/p/d812ce349265
var Mock = require('Mock')

export const sell = Mock.mock({
  // 随机生成1-10条list
  'list|1-10': [{
    // id，递增+1，初始值为1
    'id|+1': 1,
    // 随机生成邮箱
    'email': '@email'
  }]
})
export const goods = Mock.mock({
  'list|1-20': [{
    'title': '@ctitle(10)',
    'type|0-2': 1,
    'foods|1-10': [{
      // id
      'goodId|+1': 1,
      // name
      'name': '@name',
      // 商品售价
      'price|3-30': 3,
      // 描述
      'description|5-10': '这是一些食物',
      // 信息
      'info|10-15': '这是一些介绍食物的信息',
      // 评价
      'goodsStar|1-5': '★',
      // 商品图片
      'goodsImg': "@Image('100x100','@color','小甜甜')",
      // 邮箱：
      'email': '@email',
      // 颜色
      'color': '@color',
      // 评论
      'commont': '@name'
    }]
  }]
})
console.loge(JSON.stringify(sell, null, 4))
