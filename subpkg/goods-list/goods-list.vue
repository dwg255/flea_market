<template>
  <view class="goods-list-box">
    <!-- 顶部tabbar -->
    <my-tab-bar :title="'物品列表'"></my-tab-bar>

    <!-- test nav bar -->
  <!-- <scroll-navbar :navArr="navList" :tabCurrentIndex="activeIndex" ref="tab_bar_ref" @navbarTap="navbarTap"></scroll-navbar> -->
    <!-- nav选项 -->
    <scroll-view :show-scrollbar="false"	 scroll-with-animation="true" class="scroll-view" :scroll-left="scrollLeft" scroll-x="true" >
      <view  :class="{'scroll-view-item':true,'active':index == activeIndex} " v-for="(item,index) in navList" :key="index" @click="changeNavBar(item,index)" :id="'item-' + index">
        <text class="item-title">
          {{item.title}}
        </text>
      </view>
    </scroll-view>
    <!-- 商品列表 -->
    <goods-list ref="goods_list_cpn" :cat_id="cat_id"></goods-list>
  </view>
</template>

<script>
  import {navList} from "@/common/nav-list.js"
  var screenWidth = 0
  var widthList = []
  export default {
    components:{
      cat_id() {
        return this.activeIndex + 1
      }
    },
    data() {
      return {
        activeIndex:0,//nav激活的选项
        // goodsList: [{}, {}], //商品列表
        queryParam: { //查询参数
          query: "",
          cat_id: 0
        },
        navList :navList,
        scrollLeft: 0,  //横向滚动位置
        // widthList: [],  //navbar item 宽度
        // screenWidth: 0, //屏幕宽度
      }
    },
    //下拉刷新
    onPullDownRefresh() {
      this.$refs.goods_list_cpn.refreshData()
    }, 
    // 获取参数
    onLoad(option) {
      // console.log(1111323)
       if (option.query) this.queryParam.query = option.query
      if (option.cat_id) {
        this.queryParam.cat_id = option.cat_id 
        this.activeIndex = navList.findIndex(element=> element.cat_id == option.cat_id)
        // console.log(12312)
      }
      this.getGoodsList()
    },
    created() {
      this.calculateWindowWidth();
     
    },
    mounted() {
      	this.calculateItemWidth();
    },
    // 触底加载更多
    onReachBottom() {
      console.log("触底")
      this.$refs.goods_list_cpn.getMore()
    },
    methods: {
      // 计算屏幕 宽度
      calculateWindowWidth () { 
      	var info = uni.getSystemInfoSync();
      	screenWidth = info.screenWidth;
      },
      // 计算navbar item 宽度
      calculateItemWidth () { 
				var that = this;
				var arr = [];
				let w = 0;
				this.navList.forEach((item, index) =>{
					let view = uni.createSelectorQuery().in(this).select("#item-" + index);
					view.fields({
						size: true
					}, data => {
						arr.push(data.width);
					}).exec();
				})
				widthList = arr;
        setTimeout(()=>{
          this.doScrollLeft(this.activeIndex)
        },200)
			},
      // todo 发起网络请求
      getGoodsList() {
        this.$refs.goods_list_cpn.getGoodsList()
      },
      // 切换nav商品类型选项
      changeNavBar(item,index) {
        this.activeIndex = index
        this.doScrollLeft(index)
        this.$refs.goods_list_cpn.switchCatId(navList[this.activeIndex].cat_id)
      },
      // 计算左侧滑动距离
      doScrollLeft(index){
        // var widthArr = this.widthList;
        var scrollWidth = 0;
        for (var i = 0; i < index + 1; i++) {
        	scrollWidth += widthList[i];
        }
        let currentWidth = widthList[index];
        // scrollView 居中算法
        // 减去固定宽度位移
        // 减去选中的bar的宽度的一半
        scrollWidth -=  screenWidth / 2;
        scrollWidth -= currentWidth / 2;
        this.scrollLeft = scrollWidth;
      }
    }
  }
</script>

<style lang="scss">
.goods-list-box {
  background-color: #F2F2F2;
  min-height: 100vh;
  .scroll-view {
    border-bottom: 24rpx solid #F2F2F2;
    width: 750rpx;
    padding: 20rpx 0;
    white-space: nowrap;
    font-size: 30rpx;
    color: #898989;
   // overflow: hidden;
    .scroll-view-item{
      position: relative;
      display: inline-block;
      .item-title{
        margin:0 30rpx;
      }
      &:after{
      	content: '';
      	width: 0;
      	height: 0;
      	border-bottom: 4rpx solid #FF4444;
      	position: absolute;
      	left: 50%;
      	bottom: 0;
      	transform: translateX(-50%);
      	transition: .3s;
      }
    }
    .active{
      color: #FF4444;
      &:after{
      	width: 70%;
      }
    }
  }
}
</style>
