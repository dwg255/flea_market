<template>
  <view class="star-list-container">
    <my-tab-bar :title="'点赞'"></my-tab-bar>
    <star-cell v-for="(item,index) in 5" :key="index" :imgsrc="'../../static/swiper-image/swiper-image-2.jpg'" :title="'金瓶梅，我最喜欢里边的插图'" :content="'李佳怡在19天前赞过你'"></star-cell>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss" scoped>
.star-list-container {
   width: 100vw;
   height: 100vh;
   background-color: #F2F2F2;
}
</style>
