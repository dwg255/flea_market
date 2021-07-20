<template>
  <view class="order-detail-container">
    <!-- 订单号区域 -->
    <view class="order-num">
      <text>订单号：S20210709424863</text>
    </view>
    <!-- 商品简要 -->
    <view class="goods-info">
      <view class="left">
        <image :src="imgsrc" mode=""></image>
      </view>
      <view class="right">
        <view class="title">{{title}}</view>
      </view>
    </view>
    <!-- 花费 -->
    <view class="order-num">
      <text>花费550.00元</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"order-detail",
    data() {
      return {
        
      };
    },
    props: {
        imgsrc:{
          type:String,
          required:true
        },
       title: {
          type: String,
          required:true
       },
       }
  }
</script>


<style lang="scss" scoped>
.order-detail-container {
  border-bottom: 30rpx solid #F2F2F2;
  .order-num {
    padding: 20rpx 30rpx;
    font-size: 26rpx;
    border-bottom: 1px solid #EEEEEE;
  }
  .goods-info {
      background-color: #FFFFFF;
      padding: 20rpx 30rpx;
      border-bottom: 1px solid #EEEEEE;
      display: flex;
      align-items: center;
      .left {
        margin-right: 16rpx;
        image {
          width: 100rpx;
          height: 100rpx;
          border-radius: 20rpx;
        }
      }
      .right {
         flex: 1;
         font-size: 28rpx;
      }
    }
}
</style>
