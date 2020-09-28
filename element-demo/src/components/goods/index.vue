<template>
 <div class="goods">
   <div class="menu-wrapper"></div>
   <div class="foods-wrapper"></div>
 </div>
</template>

<script>
export default {
  name: 'goods',
  components: {},
  data () {
    return {
      msg: 'i am goods'
    }
  }
}

</script>

<style lang='less' scoped>
.goods {
  display: flex;
  .menu-wrapper{}

}
</style>
