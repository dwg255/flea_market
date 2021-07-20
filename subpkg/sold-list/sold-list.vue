<template>
  <view>
    <my-tab-bar :title="'我买到的'"></my-tab-bar>
    <order-detail v-for="(item,index) in 5" :key="index" :imgsrc="'../../static/swiper-image/swiper-image-2.jpg'" :title="'金瓶梅，我最喜欢里边的插图'"></order-detail>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      }
    },
    methods: {
      
    }
  }
</script>

<style lang="scss" scoped>

</style>
