<template>
  <view class="goods-details-container">
    <my-tab-bar :title="'物品详情'"></my-tab-bar>
    <!-- 轮播图 -->
    <swiper class="swiper" :indicator-dots="true" :circular="true" :autoplay="true" :interval="3000" :duration="1000">
      <swiper-item v-for="(item,index) in goodsDetails.pics" :key="index">
        <view class="swiper-item">
          <image class="swiper-image" :src="item" mode=""></image>
        </view>
      </swiper-item>
    <!--  <swiper-item>
        <view class="swiper-item">
          <image class="swiper-image" src="../../static/swiper-image/swiper-image-2.jpg" mode=""></image>
        </view>
      </swiper-item> -->
    </swiper>

    <!-- 物品详情 -->
    <view class="goods-detail">
      <view class="head">
        <view class="left">
          <view class="title">
            {{goodsDetails.title}}
          </view>
          <view class="content">
            <view class="tag">
              19天前发布
            </view>
            <view class="tag">
              {{goodsDetails.views_num}}人浏览
            </view>
            <view class="tag">
              {{goodsDetails.express_type == 1 ? "可邮寄" : "需自提"}}</text>
            </view>
            <view class="tag">
              库存量：{{goodsDetails.goods_num}}
            </view>
          </view>
          <view class="address">
            自提地址：{{goodsDetails.address}}
          </view>
        </view>
        <view class="sold-tag" v-if="goodsDetails.status == 1">
          <image class="sold-tag-img" src="../../static/images/sold-tag1.png" mode="widthFix"></image>
        </view>
      </view>
      <view class="describe">
        {{goodsDetails.content}}
      </view>
      <view class="footer">
        <view class="publish-address">
          <view class="iconfont icon-dingwei1"></view>
          {{goodsDetails.address}}
        </view>
        <view class="fav-star">
          <view class="star" @click="addStar">
            <view class="iconfont" :class=" Star ? 'icon-dianzan':'icon-zan'"></view>
            点赞
          </view>
          <view class="fav" @click="addFav">
            <view class="iconfont" :class="isFav ? 'icon-shoucang-active' : 'icon-shoucang'"></view>
            收藏
          </view>
        </view>
      </view>
    </view>

    <!-- 卖家信息 -->
    <view class="seller">
      <view class="left">
        <view class="avator">
          <image class="avator-img" :src="goodsDetails.avatar_url" mode=""></image>
        </view>
        <view class="seller-info">
          <text>
            {{goodsDetails.nickname}}
          </text>
          <text>
            共卖出2件宝贝
          </text>
        </view>
      </view>
      <view class="shop" @click="gotoShop">
        <text>查看ta的店铺</text>
      </view>
    </view>

    <!-- 举报区域 -->
    <view class="contact">
      <view class="contact-item" @click="openDailog('report')">
        <view class="iconfont icon-lingdang"></view>
        <text>内容违规，我要举报</text>
      </view>
      <view class="contact-item" @click="openDailog()">
        <view class="iconfont icon-xiaoxi"></view>
        <text>很感兴趣，我要留言</text>
      </view>
    </view>

    <!-- 留言墙 -->
    <view class="message-box">
      <view class="title">
        留言墙
      </view>
     <view class="message-item">
       <view class="header">
         <view class="avator">
           <image class="avator-img" src="../../static/navs/1.jpeg"></image>
           <text>dwg</text>
         </view>
         <text class="contact-date">6天前来过</text>
       </view>
       <view class="content">
         <view class="line">
           <text>在吗？</text>
           <view class="response">
             主人回复：在的。
           </view>
         </view>
         
       </view>
     </view> 
     <view class="message-item">
        <view class="header">
          <view class="avator">
            <image class="avator-img" src="../../static/navs/1.jpeg"></image>
            <text>dwg</text>
          </view>
          <text class="contact-date">6天前来过</text>
        </view>
        <view class="content">
          <view class="line">
            <text>在吗？</text>
          </view>
          <view class="line">
            <view class="seller-response">
              <view class="icon-section" @click="openDailog('response')">
                回复 <view class="iconfont icon-xiaoxi"> </view>
              </view>
            </view>
          </view>
        </view>
      </view> 
    </view>
    <!-- 底部锁定栏 -->
    <view class="foot">
      <view class="price">
        需付：{{goodsDetails.price | formatPrice}}元
      </view>
      <view class="opt">
        <button type="default" @click="opt">操作</button>
      </view>
      <!-- 左边固定 联系按钮 -->
      <view class="fab-container">
        <view class="contact-seller" @click="contactSeller">
          <view class="iconfont icon-phone">

          </view>
        </view>
        <!-- 右边固定 返回首页按钮 -->
        <view class="goto-home" @click="gotoHome">
          <view class="iconfont icon-index">

          </view>
        </view>
      </view>
    </view>
    <!-- 消息弹出层 -->
    <uni-popup ref="popup" type="dialog">
      <uni-popup-dialog :title="dailogParams.title" :placeholder="dailogParams.placeholder" mode="input"
        :duration="2000" :before-close="true" @close="close" @confirm="confirm">

      </uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>
  import {goodsDetails} from '@/common/api/goods/goods.js'
  export default {
    data() {
      return {
        goods_id:0,
        Star: true,
        isFav: true,
        dailogParams: {
          title: "请输入举报原因",
          placeholder: "在此输入内容..."
        },
        goodsDetails:{},
        dialogList:[]
      }
    },
    onLoad(option) {
      this.goods_id = option.goods_id
      this.getGoodsDetail()
    },
    created() {
      
    },
    methods: {
      async getGoodsDetail(){
        const res = await goodsDetails({},{goods_id:this.goods_id})
        // console.log(res)
        let pics,tags
        try{ pics= JSON.parse(res.data.goodsInfo.pics) }catch(err){ pics = [] };
        res.data.goodsInfo.pics = pics
        try{ tags = JSON.parse(res.data.goodsInfo.tags) } catch(err){ tags = []};
        res.data.goodsInfo.tags = tags
        this.goodsDetails = res.data.goodsInfo
        this.dialogList = res.data.dialogList
      },
      // 跳转至商店
      gotoShop() {
        uni.navigateTo({
          url: "../../subpkg/shop/shop"
        })
      },
      // 跳转至首页
      gotoHome() {
        uni.switchTab({
          url: "../../pages/home/home"
        })
      },
      // 联系卖家
      contactSeller() {
        uni.makePhoneCall({
          phoneNumber: '15801146639'
        });
      },
      // 打开对话框
      openDailog(dailogType) {
        if (dailogType == "report") {
          this.dailogParams.title = "请输入举报原因";
        } else if (dailogType == "response") {
          this.dailogParams.title = "请输入回复内容";
        } else {
          this.dailogParams.title = "请输入留言内容";
        }
        this.$refs.popup.open()
      },
      // 点赞
      addStar() {
        this.Star = !this.Star
      },
      addFav() {
        this.isFav = !this.isFav
      },
      // opt操作
      opt() {
        uni.showActionSheet({
          itemList: ['已转让', '下架', '编辑'],
          success: function(res) {
            console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
          },
          fail: function(res) {
            console.log(res.errMsg);
          }
        });
      },
      open() {
        this.$refs.popup.open()
      },
      close() {
        this.$refs.popup.close()
      },
      confirm(value) {
        console.log(value)
        this.$refs.popup.close()
      }
    }
  }
</script>

<style lang="scss">
  .goods-details-container {
    position: relative;

    // 轮播图
    .swiper {
      width: 750rpx;
      height: 350rpx;

      .swiper-item {
        width: 100%;
        height: 100%;

        .swiper-image {
          width: 100%;
          height: 100%;
        }
      }
    }

    // 物品详情
    .goods-detail {
      position: relative;
      border-bottom: 1px solid #E4E4E4;

      .head {
        .left {

          padding-left: 20rpx;

          .title {
            font-size: 32rpx;
            margin: 20rpx 0 10rpx 0;
          }

          .content {
            padding-right: 250rpx;
            display: flex;
            border-bottom: 1px dotted #F2F2F2;
            justify-content: space-between;

            .tag {
              font-size: 22rpx;
              padding: 6rpx 8rpx;
              color: #FFFFFF;

              &:nth-child(1) {
                background-color: #F37B1D;
              }

              &:nth-child(2) {
                background-color: #E54D42;
              }

              &:nth-child(3) {
                background-color: #8DC63F;
              }

              &:nth-child(4) {
                background-color: #0081FF;
              }
            }
          }

          .address {
            font-size: 26rpx;
            padding: 20rpx 0;
            color: #888888;
            border-bottom: 1px dotted #F2F2F2;
          }
        }

        .sold-tag {
          position: absolute;
          right: 20rpx;
          top: 10rpx;

          .sold-tag-img {
            width: 200rpx;
          }
        }
      }

      .describe {
        padding: 16rpx 0;
        padding-left: 20rpx;
        font-size: 28rpx;
        color: #888888;
        border-bottom: 1px solid #EEEEEE;
      }

      .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20rpx;
        height: 60rpx;
        color: #999999;
        font-size: 24rpx;
        border-bottom: 1px solid #C3C3C3;

        .publish-address {
          display: flex;
          align-items: center;

          .iconfont {
            margin-right: 10rpx;
          }
        }

        .fav-star {
          display: flex;
          align-items: center;

          .star {
            display: flex;
            align-items: center;
            margin-right: 20rpx;

            .iconfont {
              margin-right: 10rpx;
            }
          }

          .fav {
            display: flex;
            align-items: center;

            .iconfont {
              margin-right: 10rpx;
            }
          }
        }
      }
    }

    // 卖家信息
    .seller {
      display: flex;
      justify-content: space-between;
      padding: 20rpx;
      border-top: 40rpx solid #F2F2F2;
      border-bottom: 40rpx solid #F2F2F2;

      .left {
        display: flex;
        justify-content: flex-start;

        .avator {
          .avator-img {
            border-radius: 50%;
            width: 100rpx;
            height: 100rpx;
          }

          margin-right: 20rpx;
        }

        .seller-info {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          font-size: 24rpx;

          text:nth-child(2) {
            color: #666666;
          }
        }
      }

      // 卖家信息
      .shop {
        color: #FF6600;
        font-size: 24rpx;
        align-self: flex-start;
        height: 46rpx;
        border-radius: 23rpx;
        border: 1px solid #FF6600;
        padding: 0 10rpx;
        display: flex;
        align-items: center;
      }
    }

    // 举报 回复
    .contact {
      display: flex;
      justify-content: space-between;
      padding: 16rpx 80rpx;
      color: #666666;
      font-size: 24rpx;

      .contact-item {
        padding: 6rpx;
        border: 1px solid #CCCCCC;
        border-radius: 10rpx;
        display: flex;
        align-items: center;

        .iconfont {
          margin-right: 10rpx;
        }
      }
    }

    // 留言墙
    .message-box {
      border-top: 30rpx solid #F2F2F2;
      border-bottom: 30rpx solid #F2F2F2;
      font-size: 24rpx;

      .title {
        height: 80rpx;
        border-bottom: 1px solid #EAEAEA;
        font-size: 32rpx;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .message-item {
        font-size: 24rpx;
        border-bottom: 3px solid #F1F1F1;

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;

          padding: 20rpx;

          .avator {
            display: flex;
            align-items: center;
            font-size: 28rpx;

            .avator-img {
              border-radius: 50%;
              margin-right: 20rpx;
              width: 100rpx;
              height: 100rpx;
            }
          }

          .contact-date {
            color: #B8B8B8;
          }
        }

        .content {
          
          font-size: 32rpx;
          border-top: 1px dotted #E4E4E4;
          border-bottom: 1px solid #C3C3C3;
          .line {
            padding: 20rpx;
            &:nth-child(2) {
              border-top: 1px dotted #E4E4E4;
            }
          }
          .response {
            display: flex;
            align-items: center;
            margin: 16rpx 0;
            font-size: 28rpx;
            height: 28rpx;
            border-left: 2px solid #FF6600;
            padding-left: 10rpx;
            color: #AAAAAA;
          }

          .seller-response {
            display: flex;
            flex-direction: row-reverse;

            .icon-section {
              flex-shrink: 1;
              font-size: 26rpx;
              display: flex;
              flex-direction: row-reverse;
              align-items: center;
              background-color: #F8F8F8;
              border-radius: 10rpx;
              padding: 4rpx 20rpx;

              .iconfont {
                margin-right: 15rpx;
              }
            }
          }
        }

      }
    }

    // 底部锁定栏
    .foot {
      .fab-container {
        position: absolute;

        // 左侧联系按钮
        .contact-seller,
        .goto-home {
          position: absolute;
          left: 30rpx;
          bottom: 200rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0, 0, 0, 0.2);
          width: 90rpx;
          height: 90rpx;
          border-radius: 50%;
          overflow: hidden;

          .iconfont {
            color: #FFFFFF;
            font-size: 60rpx;
          }
        }

        // 右侧返回首页按钮
        .goto-home {
          left: 625rpx;

          .iconfont {
            font-size: 50rpx;
          }
        }
      }

      position: sticky;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #EEEEEE;
      height: 90rpx;
      background-color: #FFFFFF;
      padding-left: 20rpx;
      font-size: 28rpx;

      .price {
        color: #FF4444;
      }

      .opt {
        align-self: stretch;

        button {
          color: #FFFFFF;
          background-color: #FF6600;
          border-radius: 0;
          height: 100%;
          font-size: 28rpx;
          display: flex;
          align-items: center;
        }
      }
    }
  }
</style>
