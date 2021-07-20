<template>
  <!-- 商品列表区域 -->
  <view class="goods-list-container">
    <!-- 商品分类导航 -->
    <view class="goods-nav">
      <view class="goods-nav-item" :class="{'is-active':goods_screen == 0}" @click="changeTab(0)">
        <text>附近</text>
      </view>
      <view class="goods-nav-item" :class="{'is-active':goods_screen == 1}" @click="changeTab(1)">
        <text>人气</text>
      </view>
      <view class="goods-nav-item" :class="{'is-active':goods_screen == 2}" @click="changeTab(2)">
        <text>最新</text>
      </view>
    </view>
    <!-- 商品列表 -->
    <view class="goods-list">
      <goods-item v-for="(item,index) in goodsList" :key="index"></goods-item>
    </view>
    <view class="has-more" v-show="goodsList.length > 0">
      <text v-if="isLoading">加载中...</text>
      <text v-else>{{hasMore}}</text>
    </view>
  </view>
</template>

<script>
  let count = 0

  export default {
    name: "goods-list",
    props:{
      cat_id:{    //商品分类
        type:Number,
      },
      query_kw:{  //查询关键字
        type:String,
      },
      
    },
    data() {
      return {
        isLoading:false,
        hasMore:"下拉加载更多",
        goods_screen:0,//筛查 0 附近，1 人气 2最新
        goodsList:[{},{},{},{}],
      };
    },
    methods:{
      //切换tab栏
      changeTab(active) {
        this.goods_screen = active
        this.refreshData()
      },
      //下拉刷新
      refreshData(){
        console.log("刷新。。。")
        if (this.isLoading) return
        this.isLoading = true
        uni.showLoading({
          title: "数据加载中..."
        })
        this.isLoading = true
        setTimeout(() => {
          uni.hideLoading()
          this.goodsList = [{}, {}, {}, {}]
          this.isLoading = false
          count = 0
        }, 1000)
      },
      //获取更多
      getMore(){
         console.log("获取更多。。。")
        if (this.isLoading) {
          return
        }
        if (count > 3) {
          return this.hasMore = "已加载全部"
        }
        count++
        uni.showLoading({
          title: "数据加载中..."
        })
        this.isLoading = true
        setTimeout(() => {
          uni.hideLoading()
          this.goodsList = [...[{}, {}, {}, {}], ...this.goodsList]
          this.isLoading = false
        }, 1000)
      }
    }
  }
</script>

<style lang="scss">
.goods-list-container{
  background-color: #FFFFFF;
  .goods-nav {
    height: 70rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    // border-bottom: 1px solid #E9E9E9;
    font-size: 28rpx;
    font-weight: bold;
    color: #666666;
  
    .is-active {
      color: #FF6600;
    }
  
    .goods-nav-item {
      width: 33.33%;
      text-align: center;
    }
  }
  
  // 商品列表
  .goods-list {}
  
  // 底部加载状态
  .has-more {
    height: 50rpx;
    background-color: #F2F2F2;
    font-size: 24rpx;
    color: #AFAFAF;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
}
</style>
