<template>
  <view class="publish-list-container">
    <my-tab-bar :title="'我发布的'"></my-tab-bar>
    <uni-swipe-action >
       <uni-swipe-action-item v-for="(item,index) in publishList" :key="index" :right-options="options" @click="del(item,index)">
         <view class="" @click="goodsDetail(item)">
           <star-cell :imgsrc="item.avatar_url" :title="item.title" :content="'发布于19天前'" :showContactTag="false" :showRedTag="false"></star-cell>
         </view>
        </uni-swipe-action-item>
    </uni-swipe-action>
  </view>
</template>

<script>
  import {goodsList,deleteGoods} from "@/common/api/goods/goods.js"
  import {mapState} from 'vuex'
  export default {
    computed:{
      ...mapState(['userInfo'])
    },
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
    created() {
       this.getGoodsList()
    },
    methods:{
      async getGoodsList(){
        const res = await goodsList({shop_id:this.userInfo.user_id,page_size:20,page_num:1})
        this.publishList = res.data.list
      },
      async del(item,index){
        // console.log("删除了第" +index+"个")
        const res = await deleteGoods({},{goods_id:item.goods_id})
        if (res.statusCode == 200) {
          uni.showToast({
            title: res.data.msg,
            duration: 2000,
            icon: "success"
          });
           this.publishList.splice(index,1)
        }
       
      },
      goodsDetail(item){
        console.log(item)
        uni.navigateTo({
          url:"../goods-details/goods-details?goods_id="+item.goods_id
        })
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
