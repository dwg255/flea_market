<template>
	<view class="goods-item-container">
		<view class="goods-item" @click="handleClick">
		  <view class="goods-item-head">
		    <view class="sold-tag" v-if="goodsInfo.status == 1">
		      <image class="sold-image" src="../../static/images/sold-tag1.png" mode="widthFix"></image>
		    </view>
		    <view class="avator">
		      <image class="avator-img" :src="goodsInfo.avatar_url"></image>
		      <view class="seller-info">
		        <text class="nickname">{{goodsInfo.nickname}}</text>
		        <text class="publish-date">4天前发布</text>
		      </view>
		    </view>
		    <view class="goods-info">
		      <view class="price">{{goodsInfo.price |formatPrice}}</view>
		      <view class="distance">据我323.32km</view>
		    </view>
		  </view>
		  <view class="goods-item-content">
		    <!-- 商品图片 -->
		    <view class="goods-pics">
		      <view class="pic-item" v-for="(item,index) in goodsInfo.pics" :key="index">
		        <image class="pic-img" :src="item" mode="aspectFill"></image>
		      </view>
		     <!-- <view class="pic-item">
		        <image class="pic-img" src="../../static/images/goods-pics-2.jpg" mode="aspectFill"></image>
		      </view>
		      <view class="pic-item">
		        <image class="pic-img" src="../../static/images/goods-pics-2.jpg" mode="aspectFill"></image>
		      </view> -->
		      
		
		    </view>
		    <!-- 商品标签 -->
		    <view class="goods-tag">
		      <text class="tag-item" v-for="(item,index) in goodsInfo.tags" :key="index">{{item}}</text>
		      <!-- <text class="tag-item">哈哈</text> -->
		    </view>
		    <!-- 商品说明 -->
		    <view class="goods-content">
		      {{goodsInfo.content}}
		    </view>
		    <!-- dailog -->
		    <view class="dailog">
		     
		      <view class="dailog-content" v-if="goodsInfo.new_message">
		        <view class="dailog-line">
		          {{goodsInfo.new_message.customer_nickname}}：{{goodsInfo.new_message.question}}
		        </view>
		        <view class="dailog-line" v-if="goodsInfo.new_message.answer">
              <view class="dailog-left-tag">
                
              </view>
		          主人回复：{{goodsInfo.new_message.answer}}
		        </view>
		      </view>
		    </view>
		  </view>
		
		  <view class="goods-item-foot">
		     <view class="position">
		       <view class="iconfont icon-dingwei1">
		         
		       </view>
		       {{goodsInfo.address}}
		     </view>
		     <view class="star-tags">
		       <view class="star">
		         <view class="iconfont icon-zan">
		           
		         </view>
		         {{goodsInfo.star_num}}
		       </view>
		       <view class="star">
		         <view class="iconfont icon-xiaoxi">
		           
		         </view>
		         {{goodsInfo.fav_num}}
		       </view>
		       <view class="star">
		         <view class="iconfont icon-eye">
		           
		         </view>
		         {{goodsInfo.views_num}}
		       </view>
		     </view>
		  </view>
		  <view class="bottom">
		    
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"goods-item",
    props:{
      goodsInfo:{
        type:Object,
        required:true,
      }
    },
		data() {
			return {
				
			};
		},
    methods: {
      // 点击事件
      handleClick(){
        this.$emit("click")
      }
    }
	}
</script>

<style lang="scss">
.goods-item-container{
  border-top: 1px solid #DBDBDB;
  .goods-item {
    background-color: #FFFFFF;
    .goods-item-head {
      padding: 0 30rpx;
      position: relative;
      height: 100rpx;
      display: flex;
      margin: 30rpx 0;
      justify-content: space-between;
      align-items: center;
      .sold-tag{
        position: absolute;
        left: 55%;
        top: 0;
        transform: translateX(-50%);
        .sold-image{
          width: 200rpx;
        }
      }
      .avator{
        height: 100%;
        flex: 1;
        display: flex;
        align-items: center;
        .avator-img {
          width: 100rpx;
          height: 100rpx;
          border-radius: 50%;
        }
        .seller-info{
          height: 100%;
          margin-left: 20rpx;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .nickname{
            font-size: 28rpx;
          }
          .publish-date{
            font-size: 22rpx;
            color:#A1A1A1;
          }
        }
        
      }
      .goods-info{
        height: 100%;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        align-items: flex-end;
       
        .price{
          font-size: 24rpx;
          color: #FF4444;
        }
        .distance{
          color: #FF771D;
          font-size: 22rpx;
        }
      }
    }
  
    //商品内容区域
    .goods-item-content {
      padding: 0 30rpx;
      margin-bottom: 20rpx;
      .goods-pics{
        display: flex;
        .pic-item{
          .pic-img {
            width: 215rpx;
            height: 180rpx;
          }
          margin-right: 20rpx;
        }
        
      }
      .goods-tag{
        .tag-item {
          font-size: 26rpx;
          border: 1px solid #9ACD56;
          border-radius: 10rpx;
          color:#9ACD56;
          padding: 4rpx 8rpx;
          margin-right: 20rpx;
        }
      }
      // 商品说明
     .goods-content{
       margin: 20rpx 0;
       font-size: 30rpx;
     }
        
      // 对话
      .dailog{
        display: flex;
        align-items: stretch;
        
        .dailog-content{
          flex: 1;
          font-size: 24rpx;
          .dailog-line {
            color: #B4B4B4;
            margin-top: 16rpx;
            &:nth-child(2) {
              display: flex;
              .dailog-left-tag{
                width: 4rpx;
                margin-right: 20rpx;
                background-color: #FF6600;
                align-items: stretch;
              }
            }
          }
        }
      }
      
    }
  
  
    .goods-item-foot {
      padding: 20rpx 30rpx;
      border-top: 2rpx solid #EEEEEE;
      border-bottom: 2rpx solid #C1C1C1;
      display: flex;
      justify-content: center;
      
      .position{
        flex: 1;
        display: flex;
        align-items: center;
        font-size: 24rpx;
        color: #A1A1A1;
        .iconfont{
          margin-right: 10rpx;
        }
      }
      .star-tags{
        display: flex;
        font-size: 22rpx;
        color: #999999 ;
        .star {
          display: flex;
          align-items: center;
          margin-left: 10rpx;
          .iconfont{
            margin-right: 10rpx;
          }
        }
      }
        
    }
    .bottom{
      width: 100%;
      height: 20rpx;
      background-color: #F2F2F2;
      border-top: 1px solid #DBDBDB;
      // border-bottom: 1px solid #DBDBDB;
    }
  }
}
</style>
