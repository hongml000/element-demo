<template>

 <div class="star" :class="starType">
   <span v-for="(itemClass,index) in itemClasses" :key="index" :class="itemClass" class="star-item"></span>
 </div>
</template>

<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'

// 因为有多处地方用到这个星星级别，所以抽成一个组件
export default {
  name: 'stars',
  components: {},
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    // 根据星星大小判断使用哪种大小的星星图
    starType() {
      return 'star-' + this.size
    },
    // 获取全星，还是半星，还是空星的数组，用于遍历显示
    itemClasses() {
      let result = []
      console.log(this.scroe)
      // 取0.5倍数的计算方法，比如4.3*2=8.6，向下取整8，/2后为4；4.8*2=9.6 => 9 / 2 = 4.5
      let score = Math.floor(this.score * 2) / 2
      console.log('score:', score)
      // 是否有半星
      let hasDecimal = score % 1 !== 0
      let interger = Math.floor(score)
      console.log('interger:', interger)
      for (let i = 0; i < interger; i++) {
        result.push(CLS_ON)
      }
      // 最多只会有一个半星
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      // 剩下的补齐空星
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  },
  data() {
    return {

    }
  },
  methods: {

  }
}

</script>

<style lang='less' scoped>
@import '../../common/css/mixins.less';
.star {
  font-size: 0; // 为了使图片间没有间距
  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }
  &.star-48 {
    .star-item {
      width: 1.5rem;
      height: 1.5rem;
      background-size: 1.5rem 1.5rem;
      margin-right: 1.5rem;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        .bg-img('star48_on')
      }
      &.half {
        .bg-img('star48_half')
      }
      &.off {
        .bg-img('star48_off')
      }
    }
  }
  &.star-36 {
    .star-item {
      width: 1.125rem;
      height: 1.125rem;
      background-size: 1.125rem 1.125rem;
      margin-right: 1.125rem;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        .bg-img('star36_on')
      }
      &.half {
        .bg-img('star36_half')
      }
      &.off {
        .bg-img('star36_off')
      }
    }
  }
  &.star-24 {
    .star-item {
      width: 0.75rem;
      height: 0.75rem;
      background-size: 0.75rem 0.75rem;
      margin-right: 0.75rem;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        .bg-img('star24_on')
      }
      &.half {
        .bg-img('star24_half')
      }
      &.off {
        .bg-img('star24_off')
      }
    }
  }
}
</style>
