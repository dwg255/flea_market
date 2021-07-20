<template>
	<view class="search-container">
    <my-tab-bar title="搜索"></my-tab-bar>
    <view class="uni-form-item uni-column">
      <input class="uni-input" focus placeholder="输入关键词搜索..." />
      <button class="btn" type="default" @click="search">搜索</button>
    </view>
    <goods-item v-for="(item,index) in goodsList" :key="index"></goods-item>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsList:[]
			};
		},
    methods:{
      search() {
        uni.showLoading({
           title: "数据加载中..."
        })
        this.goodsList = [{},{}]
        uni.hideLoading()
      }
    }
	}
</script>

<style lang="scss">
.search-container {
  width: 100vw;
  min-height: 100vh;
  background-color: #F2F2F2;
  .uni-form-item {
    display: flex;
    align-items: center;
    padding: 20rpx 30rpx;
    background-color: #FFFFFF;
    .uni-input {
      flex: 1;
      margin-right: 20rpx;
      padding-left: 30rpx;
      height: 60rpx;
      line-height: 60rpx;
      border-radius: 30rpx;
      font-size: 24rpx;
      background-color: #EEEEEE;
    }
    .btn {
      color: #FFFFFF;
      height: 70rpx;
      display: flex;
      align-items: center;
      font-size: 28rpx;
      background-color: #F37B1D;
    }
  }
}
</style>
