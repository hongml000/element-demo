# 安装
1. 安装node
  node -v
2. 安装vue cli
```
  npm install -g vue-cli
```
# 创建项目
vue init template project-name，根据什么模板，创建一个项目，模板可以使用vue-cli提供的选项，也可以使用自定义模板
```
  vue init webpack element-demo
  >>>
  ? Project name element-demo
  ? Project description element app
  ? Author hongml000 <286995954@qq.com>
  ? Vue build standalone
  ? Install vue-router? Yes
  ? Use ESLint to lint your code? Yes
  ? Pick an ESLint preset Standard
  ? Set up unit tests No
  ? Setup e2e tests with Nightwatch? No
  ? Should we run `npm install` for you after the project has been created? (recommended) npm

  cd element-demo
  npm run dev
```

## 目录解析
1. config
  用来放置一些webpack配置项
2. src资源目录
3. .babelrc
  因为很多浏览器都不支持es6解析，所以我一般都是使用babel将es6编译成浏览器认识的es5语法，这个文件放置的就是babel文件的配置
  ```js
  // .babelrc
  {
    // presets表示预设，babel转换预先需要安装的一些插件
    "presets": [
      ["env", {
        "modules": false,
        "targets": {
          "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
        }
      }],
      "stage-2"
    ],
    "plugins": ["transform-vue-jsx", "transform-runtime"]
  }
  ```
 4. .editorconfig 编辑器的配置
 5. .eslintignore，忽略语法检查的文件
  ```
    /build/
    /config/
    /dist/
    /*.js
  ```
6. .eslintrc.js，eslint配置文件
 
# 实战
## 关于资源准备
可以看到resource下，有2x图和3x图，一般用来适应不同dpr（device pixel ratio）手机，介绍可以参照： https://www.zhangxinxu.com/wordpress/2012/08/window-devicepixelratio/  

## iconmoon制作图标字体：将svg文件转换成字体图标
1. 官网：https://icomoon.io/
2. 点击"iconMoon App"
3. 点击import icons，将本地所有svg文件上传上去，就会生成对应的字体图标
4. 单击将所有生成的字体图标选中后，点击右下角generate font
5. 在页面中，可以点击图标对应的get code，可以看到使用这个图标的用法
6. 点击download,将图标下载到本地
7. 参照demo.html，用法如下：
```html
  <span class="icon-arrow_lift"></span>
```

## mock数据
1. 安装： npm i mockjs
2. 使用方法可参考：https://www.jianshu.com/p/d812ce349265

## 引入初始化的css样式，并设置meta
1. 下载css初始化文件：https://meyerweb.com/eric/tools/css/reset/
2. 进行meta设置
```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <!-- 移动端需要配置此项，注意是maximum，不是num，不能有空格 -->
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no" />
    <!-- 引入覆盖的样式 -->
    <link rel="stylesheet" href="./src/common/css/reset.css">
    <title>element-demo</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```
## 使用less
1. npm i less less-loader --save  
2. /build/webpack.dev.conf.js中rules下加
```
{ test: /.less$/, loader: 'style-loader!css-loader!less-loader' },
```
3. 页面中  
```less
<style lang="less">
.tab {
  display: flex;
  .tab-item {

  }
}
</style>
```
4. 重启项目  
如果还报错，可能是less-loader的版本过高问题，卸载less-loader，重装：  
npm install less-loader@4.1.0 --save   
参考：https://blog.csdn.net/shujiaw/article/details/105863069  

## vue-router路由
1. 安装：npm i vue-router --save
2. 引入
```js
// main.js
import router from './router'
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
```
3. 使用  
1.2步骤如果在使用vue-cli安装时，选项了vue-router,是不需要再进行的，模块会自动安装和配置
```js
// src/router/index.js
import Vue from 'vue'
import Router from 'vue-router'
import goods from '@/components/goods'
import rating from '@/components/rating'
import sellers from '@/components/sellers'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/rating',
      name: 'rating',
      component: rating
    },
    {
      path: '/sellers',
      name: 'sellers',
      component: sellers
    }
  ]
})
```
```vue
<template>
  <div id="app">
    <!-- 注意,header是原生的html标签，不能使用小写的header作为自定义组件，需要更改下名字 -->
    <Header></Header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/rating">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/sellers">商家</router-link>
      </div>
    </div>
    <!-- 当点击上面tab标签时，下面的内容根据vue-router去变化 -->
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/header/header.vue'
export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style lang="less">
.tab {
  display: flex;
  width: 100%;
  // 所有移动端的大小都是按2倍来设计的，所以虽然写着80px，实际代码里要写40
  height: 40px;
  line-height: 40px;
  .tab-item {
    flex: 1;
    text-align: center;
  }
}
</style>
```

## 关于1px边框问题
在做移动端1px边框时，并不能直接写:
```less
// App.vue
.tab {
  border:1px solid grey;
}
```
### 手机访问页面的技巧
因为在不同手机上看到的效果并不一定一样，在Iphone6上看，可能是2px边框，我们访问时，默认是使用localhost访问的，我们可以使用ip来访问
1. 查看本地ip地址：ifconfig 192.168.205.25
2. 将localhost替换成ip地址
  * 发现说ip拒绝了访问！！
    这是因为webpack配置问题，将config下的index中的localhost改为0.0.0.0，再重启项目，访问，就可以使用ip访问了
    ```js
      // element-demo/config/index.js
    module.exports = {
      dev: {
        host: '0.0.0.0', // 将localhost 改为 0.0.0.0 ,允许其它设备连接
      }
    }
    ```
3. 手机访问，要保证手机和pc在同一个局域网
  * 1. 直接手动输入地址，访问即可
  * 2. 第二种访问，通过草料网站“ https://cli.im/ ”生成二维码，将访问地址copy生成二维码，由手机扫描即可

### 解决1px在某些手机上偏粗的总是
dpr = 物理像素（设备实际的物理像素）/设备独立像素（也就是css设置的px）  
dpr = window.devicePixelRatio 可通过devicePixelRatio获取
通俗来说，就是在css设置1px的边框，但在2倍屏或3倍屏上，会显示2px或3px，所以看起来要比设计的粗

#### 解决方案1，使用伪类 + transform 进行缩放
1. 先设置伪类，达到与之前的效果一致
```less
// src/common/css/mixins.less
// 使用less中的mixins特性，@virable设置变量， 参见：https://less.bootcss.com/#%E5%8F%98%E9%87%8F%EF%BC%88variables%EF%BC%89
.border-1px(@color) {
  position: relative;
  &:after {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    // 可以设置高度和背景
    // height: 1px;
    // background：rgba(7, 17, 27, 0.1);
    // 也可以直接设置边框
    border-top: 1px solid @color; //rgba(7, 17, 27, 0.1)
    content: ' ';
  }
}

// App.vue
<style lang="less">
@import './common/css/mixins.less';
.tab {
  // border: 1px solid rgba(7, 17, 27, 0.1);
  .border-1px(rgba(7, 17, 27, 0.1));  // 这个效果等同于上面的效果
}
</style>
```
2. 再使用媒体查询，使用transform，将缩放达到对应效果
```less
// src/common/common.less
@media (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5) {
  .auto-border-1px {
    &:after {
      -webkit-transform: scaleY(0.7);
      transform: scaleY(0.7)
    }
  }
}

@media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2) {
  .auto-border-1px {
    &:after {
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5)
    }
  }
}

@media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
  .auto-border-1px {
    &:after {
      -webkit-transform: scaleY(0.3);
      transform: scaleY(0.3)
    }
  }
}
```
3. 设置全局变量，统一引入
```less
// src/common/index.less
@import "reset.css";
@import "./common.less";
@import "./mixins.less";
@import "./common.less"
```
```js
// main.js
// import '@/common/css/reset.css' // 配置这个没毛病
import '@/common/css/index.less' // 报错，说找不到模块

// 参考： https://www.jianshu.com/p/730faee28daa
// 修改：原因是因为vue-cli里已经在utils.js配置有less解析目录了，之前在 element-demo/build/webpack.base.conf.js 中手动加了
{
  test: /.less$/,
  // loader: 'style-loader!css-loader!less-loader',
  loader: 'css-loader!less-loader'
  // options: {
  //   sourceMap: true
  // }
}
// 把这一段去掉，然后重新启动项目即可
```
4. 在对应的元素上，添加这个多媒体样式类，然后再看手机，就是1px了，棒棒哒
```html
<!-- App.vue -->
<template>
  <div id="app">
    <!-- 注意,header是原生的html标签，不能使用小写的header作为自定义组件，需要更改下名字 -->
    <element-header></element-header>
    <div class="tab auto-border-1px">
      <div class="tab-item">
        <router-link to="/goods" class="no-link">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/rating" class="no-link">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/sellers" class="no-link">商家</router-link>
      </div>
    </div>
    <!-- 当点击上面tab标签时，下面的内容根据vue-router去变化 -->
    <router-view></router-view>
  </div>
</template>
```