<template>
  <view class="publish-list-container">
    <my-tab-bar :title="'我发布的'"></my-tab-bar>
    <uni-swipe-action >
       <uni-swipe-action-item v-for="(item,index) in publishList" :key="index" :right-options="options" @click="del(index)">
          <star-cell :imgsrc="'../../static/swiper-image/swiper-image-2.jpg'" :title="'金瓶梅，我最喜欢里边的插图'" :content="'发布于19天前'" :showContactTag="false" :showRedTag="false"></star-cell>
        </uni-swipe-action-item>
    </uni-swipe-action>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // activeIndex:0,
        publishList:[{},{},{},{},{}],   //我的发布列表
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#FF4444'
          }
        }]
      };
    },
    methods:{
      del(index){
        console.log("删除了第" +index+"个")
        this.publishList.splice(index,1)
      },
      swipeChange(index){
        // this.activeIndex = index
      }
    }
  }
</script>

<style lang="scss">
  .publish-list-container {
    height: 100vh;
    background-color: #F2F2F2;
  }
</style>
