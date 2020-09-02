<template>
  <div class="hello">
    <div class="content-warpper">
      <div class="avatar">
        <img class="avatar-img" :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <h1 class="title">{{seller.title}}</h1>
        <p>{{seller.des}}</p>
        <div>
          <img :src="imgIcon1" alt="">
          <span>在线支付满20减2</span>
        </div>
      </div>
    </div>
    <div class="bulletin-warpper"></div>

  </div>
</template>

<script>
export default {
  name: 'elementHeader', // 这里不能取名header，会与原生html标签重名
  data() {
    return {
      msg: 'i am header',
      imgIcon1: require('../../../resource/img/decrease_1@2x.png')
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.avatar {
  .avatar-img {
    width: 64px;
    height: 64px;
  }
}

</style>
