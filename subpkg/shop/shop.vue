<template>
  <view class="shop-container" v-if="ready">
    <my-tab-bar :title="'物品列表'"></my-tab-bar>
    <view class="shop-info">
      <view class="left">
        <image class="avator" :src="goodsList[0].avatar_url" mode=""></image>
        <view class="user-info">
          <text class="nickname">{{goodsList[0].nickname}}</text>
          <text class="goods-num">共发布{{queryParam.total}}件商品</text>
        </view>
      </view>
      <view class="right">
        <text class="score">坐拥0.00积分</text>
      </view>
    </view>
    <goods-item v-for="(item,index) in goodsList" :key="index" :goodsInfo="item"></goods-item>
  </view>
</template>

<script>
  import {goodsList} from '@/common/api/goods/goods.js'
  export default {
    data() {
      return {
        ready:false,
        isloading:false,
        hasMore:"下拉记载更多",
        goodsList:[],
        queryParam:{
          page_num:1,
          page_size:30,
          total:0
        },
      };
    },
    onLoad(option) {
      this.shop_id = option.shop_id
    },
    created() {
       this.getGoodsList()
    },
    methods: {
     // 加载数据
     async getGoodsList() {
       // console.log("in",this.isloadings)
       if (this.isloading) return
       if (this.hasMore == "已加载全部" ) return
       this.isloading = true
       const res = await goodsList({shop_id:parseInt(this.shop_id),...this.queryParam})
       // console.log(res)
       if (res.statusCode == 200 ) {
         this.ready = true
         uni.showToast({
           title: res.data.msg,
           duration: 2000,
           icon: "success"
         });
       }
       res.data.list = res.data.list.map((item,index) => { 
         let pics,tags
         try{ pics= JSON.parse(item.pics) }catch(err){ pics = [] };
         try{ tags = JSON.parse(item.tags) } catch(err){ tags = []};
         return {...item,pics,tags}
       })
       if(this.isloading) {
         if (res.statusCode !== 200) return uni.$showMsg()
         this.goodsList = [...this.goodsList,...res.data.list]
         this.queryParam.total = res.data.total
         this.queryParam.page_num += this.queryParam.page_num
         this.isloading = false
         if (this.queryParam.total <=  (this.queryParam.page_num - 1) * this.queryParam.page_size) {
            return this.hasMore = "已加载全部"
          }
       }
     },
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
