<template>
  <div class="header">
    <div class="content-warpper">
      <div class="avatar">
        <img class="avatar-img" :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="content-title">
          <span class="content-title-icon"></span>
          <span class="title">{{seller.title}}</span>
        </div>
        <p class="des">{{seller.des}}</p>
        <div class="support" v-if="seller.supports">
          <!-- 这里可以先写一个固定的class,然后再写一个动态的class -->
          <span class="support-icon" :class="supportIcon[seller.supports[0].type]"></span>
          <span class="support-content">{{seller.supports[0].des}}</span>
        </div>
      </div>
      <div class="count" @click="showDetailPage">
        {{seller.list.length}}个 >
      </div>
    </div>
    <!-- 公告及优惠 -->
    <div class="bulletin-warpper" >
      <span class="bulletin-icon"></span>
      <span class="bulletin-content">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <!-- 使用sticky footer布局 -->
    <div class="detail" v-show="showDetail">
      <div class="detail-wrapper clearfix">
        <div class="detail-content">
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>

        </div>
      </div>
      <div class="detail-close" @click="showDetail = false">
        <span class="icon-close"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'elementHeader', // 这里不能取名header，会与原生html标签重名
  data() {
    return {
      msg: 'i am header',
      supportIcon: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
      showDetail: false
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    console.log('s created')
    console.log('seller11:', this.seller)
  },
  beforeMounted() {
  },
  methods: {
    showDetailPage() {
      this.showDetail = true
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
// 注意这里不能使用@符号，因为不是Js文件，只能使用相对路径
@import '../../common/css/mixins.less';
// @import "../../commone/css/variable.less";

.header {
  background: rgba(7,17,27,0.5);
  .content-warpper {
    position:relative;
    display: flex;
    padding: 1.5rem 0.75rem 1.125rem 1.5rem;
    color: #fff;
    .avatar {
      font-size:0;
      .avatar-img {
        width: 4rem;
        height: 4rem;
      }
    }
    .content {
      margin-left: 1rem;
      .content-title {
        display: flex;
        font-size:0;
        margin-bottom: 0.5rem;
        margin-top:0.125rem;

        .content-title-icon {
          display: inline-flex;
          width: 1.875rem;
          height: 1.125rem;
          margin-right: 0.375rem;
          // border-radius: 2px;
          .bg-img('./brand');
          background-size: 1.875rem 1.125rem;
          background-repeat: no-repeat;
        }
        .title {
          font-size: 1rem;
          line-height: 1.125rem;
          // color: #fff;
          font-weight: bold;
        }
      }
      .des {
        font-size: 0.75rem;
        line-height: 0.75rem;
        margin-bottom: 0.625rem;
      }
      .support {
        // vertical-align: top;
        display: flex;
        .support-icon {

          display: inline-block;
          height: 0.75rem;
          width: 0.75rem;
          min-width: 0.75rem;
          margin-right: 4px;

          background-size: 0.75rem 0.75rem;
          background-repeat: no-repeat;
          &.decrease {
            .bg-img('decrease_1');
          }
          &.discount {
            .bg-img('discount_1');
          }
          &.guarantee {
            .bg-img('guarantee_1');
          }
          &.invoice {
            .bg-img('invoice_1');
          }
          &.special {
            .bg-img('special_1');
          }
        }
        .support-content {

          font-size: 0.625rem;
          line-height: 0.75rem;
        }
      }
    }
    .count {
      position: absolute;
      right: 0.75rem;
      bottom: 1.125rem;
      height: 0.75rem;
      line-height: 0.75rem;
      // width: 3.125rem;
      border-radius: 6.5rem;
      padding: 0.438rem 0.5rem;
      background: rgba(0,0,0,0.2);
      font-size: 0.625rem;
    }
  }
  .bulletin-warpper {
    height: 1.75rem;
    line-height: 1.75rem;
    padding: 0 0.75rem;
    font-size: 0.625rem;
    color: #fff;
    display: flex;
    justify-items: center;
    align-items: center;
    background: rgba(7,17,27,0.2);
    // flex-wrap: nowrap;
    .bulletin-icon {
      display:inline-block;
      height: 0.875rem;
      width: 1.75rem;
      min-width: 1.75rem;
      padding-right: 0.25rem;
      .bg-img('bulletin');
      background-size: 1.75rem 0.875rem;
      background-repeat: no-repeat;
    }
    .bulletin-content {
      width: 21.75rem;
      height: 1.75rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  // 这种负margin的布局方式，是兼容性最佳的布局方案，各大浏览器均可完美兼容，适合各种场景，但使用这种方式的前提是必须要知道footer元素的高度，且结构相对较复杂。
  .detail {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    overflow: auto;
    background: rgba(7,17,27,0.8);
    // blur: 10%;
    .detail-wrapper {
      min-height: 100%;
      .detail-content {
        margin-top: 4rem;
        padding-bottom: 4rem; //注意，这里要用padding,不能使用margin，这个是关键
      }
    }
    .detail-close {
      position: relative;
      width: 4rem;
      height: 4rem;
      margin: -4rem auto 0 auto;  /* 使footer区块正好处于content的padding-bottom位置 */
      clear: both;
      font-size: 2rem;
      color: rgba(255,255,255,0.5)
    }
  }
}

</style>
