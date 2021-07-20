<template>
  <view class="position-list-container">
    <my-tab-bar title="选择地址"></my-tab-bar>
    <view class="address">
      当前地址：<text class="blue">{{address}}</text>
    </view>
    <cmd-cell-item title="附近地址"></cmd-cell-item>
    <view class="position-list">
      <view class="row" v-for="(item,index) in positionList" :key="index" @click="chooseAddress(item.title)">
        <view class="iconfont icon-dingwei1"></view>
         {{item.title}}
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    computed: {
      ...mapState(['address', 'positionList'])
    },
    created() {

    },
    data() {
      return {

      };
    },
    methods:{
     ...mapMutations(['setAddress']),
      chooseAddress(address) {
         this.setAddress(address)
         uni.navigateBack()
      }
    }
  }
</script>

<style lang="scss">
  .position-list-container {
    font-size: 32rpx;
    min-height: 100vh;
    padding-bottom: 50rpx;
    background-color: #F2F2F2;
    .address {
      padding: 20rpx;
      color: #999999;
      .blue {
        color:#33B9FF;
      }
    }
   
    .cmd-cell-item {
      background-color: #FFFFFF;
    }
    .position-list {
      color: #8799A3;
      padding: 0 30rpx;
      border-radius: 60rpx;
      overflow: hidden;
      box-sizing: border-box;
      background-clip: content-box;
      .row {
        display: flex;
        align-items: center;
        background-color: #FFFFFF;
        padding: 16rpx 16rpx; 
        .iconfont {
          margin-right: 10rpx;
        }
        &:not(:nth-child(1)) {
          border-top: 1px solid #F4F4F4;
        }
      }
    }
  }
</style>
