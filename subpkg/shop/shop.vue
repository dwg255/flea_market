<template>
  <view class="shop-container">
    <my-tab-bar :title="'物品列表'"></my-tab-bar>
    <view class="shop-info">
      <view class="left">
        <image class="avator" src="../../static/navs/1.jpeg" mode=""></image>
        <view class="user-info">
          <text class="nickname">dwg</text>
          <text class="goods-num">共发布3件商品</text>
        </view>
      </view>
      <view class="right">
        <text class="score">坐拥0.00积分</text>
      </view>
    </view>
    <goods-item v-for="(item,index) in 5" :key="index"></goods-item>
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
.shop-container {
  .shop-info {
    color: #FFFFFF;
    height: 260rpx;
    background: linear-gradient(to right,#FF811C 0%,#F13700 100%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30rpx;
    .left {
      display: flex;
      .avator {
        width: 130rpx;
        height: 130rpx;
        border-radius: 50%;
        margin-right: 20rpx;
      }
      .user-info {
        display: flex;
        flex-direction: column;

        .nickname {
          font-size: 36rpx;
        }
        .goods-num {
          font-size: 24rpx;
          color:#FDCAAE;
        }
      }
    }
    .right {
      font-size: 28rpx;
      height: 110rpx;
    }
  }
}
</style>
