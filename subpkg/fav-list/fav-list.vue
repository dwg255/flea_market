<template>
  <view class="fav-list-container">
    <my-tab-bar :title="'点赞'"></my-tab-bar>
    <star-cell v-for="(item,index) in 5" :key="index" :imgsrc="'../../static/swiper-image/swiper-image-2.jpg'" :title="'金瓶梅，我最喜欢里边的插图'" :content="'收藏于19天前'" :showContactTag="false" :showRedTag="false"></star-cell>
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
.fav-list-container {
  width: 100vw;
  height: 100vh;
  background-color: #F2F2F2;
}
</style>
