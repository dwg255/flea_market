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
      <goods-item :goodsInfo="item" v-for="(item,index) in goodsList" :key="index"></goods-item>
    </view>
    <view class="has-more" v-show="goodsList.length > 0">
      <text v-if="isLoading">加载中...</text>
      <text v-else>{{hasMore}}</text>
    </view>
  </view>
</template>

<script>
  let count = 0
  import {goodsList} from '@/common/api/goods/goods.js'
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
    onShow() {
      this.newCatId = 0
    },
    data() {
      return {
        isLoading:false,
        hasMore:"下拉加载更多",
        newCatId:0, 
        goods_screen:0,//筛查 0 附近，1 人气 2最新
        goodsList:[],
        queryParam:{
          page_num:1,
          page_size:5,
          total:0
        },
      };
    },
    methods:{
      // 切换catid
      switchCatId(cat_id){
        // console.log(catItem)
        this.newCatId = cat_id
        this.refreshData()
      },
      //切换tab栏
      changeTab(active) {
        this.goods_screen = active
        this.refreshData()
      },
      //下拉刷新
      refreshData(){
        console.log("刷新。。。")
        this.hasMore = "下拉加载更多"
        this.queryParam.page_num = 1
        this.goodsList = []
        this.getGoodsList()
      },
      //获取更多
      getMore(){
       if (this.isLoading) {
       	return
       }
       this.getGoodsList()
      },// 加载数据
			async getGoodsList() {
        console.log("getGoodsList",this.isloading,this.hasMore)
        if (this.isloading) return
        if (this.hasMore == "已加载全部" ) return
        this.isloading = true
        const res = await goodsList({...this.queryParam,type:this.active,cat_id: parseInt(this.newCatId || this.cat_id)})
        console.log(res)
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
