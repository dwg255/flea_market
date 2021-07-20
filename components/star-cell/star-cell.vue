<template>
  <view class="cell">
    <view class="left">
      <view v-if="showRedTag" class="red-tag"></view>
      <image :src="imgsrc" mode=""></image>
    </view>
    <view class="right">
      <view class="title">{{title}}</view>
      <view class="star-time">
        <text>{{content}}</text>
        <text v-if="showContactTag">和他聊聊</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"star-cell",
    props: {
        imgsrc:{
          type:String,
          required:true
        },
       title: {
          type: String,
          required:true
       },
       content: {
         type: String,
         required:true
       },
       showRedTag:{
         type: Boolean,
         default: true
       },
       showContactTag:{
         type: Boolean,
         default: true
       }
    },
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss" scoped>
.cell {
    background-color: #FFFFFF;
    padding: 20rpx 30rpx;
    border-bottom: 1px solid #EEEEEE;
    display: flex;
    
    .left {
      position: relative;
      margin-right: 16rpx;
      image {
        width: 100rpx;
        height: 100rpx;
        border-radius: 20rpx;
      }
      .red-tag {
        position: absolute;
        top:0;
        left:85%;
        background-color: #FF4400;
        width: 14rpx;
        height: 14rpx;
        border-radius: 50%;
      }
    }
    .right {
       flex: 1;
       align-items: stretch;
       display: flex;
       flex-direction: column;
       justify-content: space-around;
       .title {
         font-size: 28rpx;
       }
       .star-time{
         display: flex;
         justify-content: space-between;
         color: #999999;
         font-size: 24rpx;
         text:nth-child(2) {
           color: #FFFFFF;
           font-size: 24rpx;
           background-color: #FF6600;
           border-radius: 10rpx;
           padding: 4rpx 30rpx;
         }
       }
    }
  }
</style>
