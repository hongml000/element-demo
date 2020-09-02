<template>
  <div id="app">
    <!-- 注意,header是原生的html标签，不能使用小写的header作为自定义组件，需要更改下名字 -->
    <element-header :seller="seller"></element-header>
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

<script>
import elementHeader from './components/header/header.vue'
import { sell } from '@/common/js/mock.js'
const ERR_OK = 0 // 将一些表面看不出含义值，定义成常量，一是方面理解，二是后期维护只需要修改常量
export default {
  name: 'App',
  // 如果不需要在函数方法名和括号之间加空格，可以在eslintrc中配置'space-before-function-paren':0
  data() {
    return {
      seller: {}

    }
  },
  created() {
    console.log('f created')
    if (sell.errorCode === ERR_OK) {
      this.seller = sell
      console.log('seller:', this.seller)
    }
  },
  components: {
    elementHeader: elementHeader
  }
}
</script>

<style lang="less">
@import './common/css/mixins.less';
.tab {
  display: flex;
  width: 100%;
  // 所有移动端的大小都是按2倍来设计的，所以虽然写着80px，实际代码里要写40
  height: 40px;
  line-height: 40px;
  // border: 1px solid rgba(7, 17, 27, 0.1);
  .border-1px(rgba(7, 17, 27, 0.1));
  .tab-item {
    flex: 1;
    text-align: center;
    font-size: 14px;
    .no-link {
      // text-decoration: none;  // 这个可以直接写在reset.css中，直接覆盖全局
      display: block; // 让其自动撑满
      color: rgba(77, 85, 93);

      // less当前父元素可以使用&替代，注意是写在父标签中
      // &:visited, &:hover, &:link {
      //   color: rgba(77, 85, 93);
      // }
    }
    // 这里vue-router会默认加这个类，如果直接使用&:visited，会覆盖不了
    .router-link-active {
      color: rgba(240, 20, 20);
    }

  }
}
</style>
