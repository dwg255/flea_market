<template>
  <view class="my-container">
    <my-tab-bar :showBackIcon="false" :title="'个人中心'"></my-tab-bar>
    <!-- 头部区域 -->
    <view class="header">
      <view class="avator-section">
        <image class="avator-img" :src="userInfo.avatarUrl" mode=""></image>
        <text>{{userInfo.nickName}}</text>
      </view>
      <view class="wave-section" :animation="animationData">
        <view class="wave"></view>
        <view class="wave"></view>
        <view class="wave"></view>
        <view class="wave"></view>
        <view class="wave"></view>
        <view class="wave"></view>
      </view>
    </view>
    <!-- 点赞收藏 -->
    <view class="section-star">
      <view @click="gotoStarList" class="section-star-item">
        <image src="../../static/images/star.png" mode=""></image>
        <text class="num">3</text>
      </view>
      <view @click="gotoFavList" class="section-star-item">
        <image src="../../static/images/fav.png" mode=""></image>
      </view>
      <view class="section-star-item">
        <image src="../../static/images/wallet.png" mode=""></image>
      </view>
    </view>
    <!-- 主体区域 -->
    <view class="main">
      <!-- 我发布的 -->
      <view class="cell" @click="gotoPublishList">
        <cmd-cell-item :slot-left="true" arrow>
          <view class="title">
            <view class="iconfont icon-wofabude"></view>
            我发布的
          </view>
        </cmd-cell-item>
      </view>

      <!-- 我卖出的 -->
      <view class="cell" @click="gotoSoldList">
        <cmd-cell-item :slot-left="true" arrow>
          <view class="title">
            <view class="iconfont icon-womaichude"></view>
            我卖出的
          </view>
        </cmd-cell-item>
      </view>

      <!-- 我买到的 -->
      <view class="cell" @click="gotoSoldList">
        <cmd-cell-item :slot-left="true" arrow>
          <view class="title">
            <view class="iconfont icon-womaidaode"></view>
            我买到的
          </view>
        </cmd-cell-item>
      </view>

      <!-- 绑定手机号 -->
      <view class="cell">
        <cmd-cell-item :slot-left="true" arrow>
          <view class="title">
            <view class="iconfont icon-shouji"></view>
            绑定手机号
          </view>
        </cmd-cell-item>
      </view>
    </view>
    <!-- 版本号 -->
    <view class="version">
      <text>版本号：6.7.6</text>
    </view>
    <!-- 联系客服 -->
    <view class="contact-us">
      <view class="iconfont icon-kefu">

      </view>
    </view>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        userInfo:{},
        
      };
    },
    created() {
      const accountInfo = uni.getAccountInfoSync();
      console.log(accountInfo.miniProgram.appId); // 小程序 appId
      console.log(accountInfo); // 小程序 appId
      // this.appID = accountInfo.miniProgram.appId

      uni.getUserInfo({
          provider:"weixin",
          success: (res) => {
              this.userInfo = res.userInfo;
              console.log(this.userInfo);
          },
          fail: () => {
              console.log("未授权");
          }
      })
    },
    onUnload() {
    
    },
    mounted() {

    },
    methods: {
       // 跳转到点赞列表
      gotoStarList(){
        uni.navigateTo({
          url: "../../subpkg/star-list/star-list" 
        })
      },
      // 跳转到收藏列表
      gotoFavList() {
        uni.navigateTo({
          url: "../../subpkg/fav-list/fav-list" 
        })
      },
      // 跳转至我的发布列表
      gotoPublishList(){
        uni.navigateTo({
          url: "../../subpkg/publish-list/publish-list" 
        })
      },
       // 跳转至我卖出列表
      gotoSoldList() {
        uni.navigateTo({
          url: "../../subpkg/sold-list/sold-list" 
        })
      }
    }
  }
</script>

<style lang="scss">
  .my-container {
    position: relative;
    height: 100vh;
    background-color: #F2F2F2;

    // 头像区域
    .header {
      position: relative;
      overflow: hidden;
      height: 300rpx;
      background-color: #FDD100;
      border-bottom: 1px solid #EEEEEE;
      display: flex;
      justify-content: center;
      align-items: center;

      .avator-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 28rpx;
        .avator-img {
          width: 160rpx;
          height: 160rpx;
          border-radius: 50%;
        }
      }

      // 波浪动画
      .wave-section {
        .wave {
          position: absolute;
          border-radius: 47%;
          background-color: #FFFFFF;
          opacity: .4;
          animation-name: rotate;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
          animation-duration: 5s;

          &:nth-child(1) {
            //左上
            left: 15%;
            top: 85%;
            width: 800rpx;
            height: 800rpx;
            animation-duration: 8s;
          }

          &:nth-child(2) {
            //左下
            left: 15%;
            top: 90%;
            width: 600rpx;
            height: 600rpx;
          }

          &:nth-child(3) {
            left: 50%;
            top: 85%;
            width: 800rpx;
            height: 800rpx;
            animation-duration: 7.5s;
          }

          &:nth-child(4) {
            left: 50%;
            top: 90%;
            width: 600rpx;
            height: 600rpx;
            animation-duration: 4.5s;
          }

          &:nth-child(5) {
            //右上
            left: 85%;
            top: 85%;
            width: 800rpx;
            height: 800rpx;
            animation-duration: 9s;
          }

          &:nth-child(6) {
            //右下
            left: 85%;
            top: 90%;
            width: 600rpx;
            height: 600rpx;
            animation-duration: 7s;
          }
        }
      }
    }

    // 点赞收藏
    .section-star {
      display: flex;
      justify-content: space-around;
      background-color: #FFFFFF;
      border-bottom: 30rpx solid #F2F2F2;
      padding: 30rpx 0;
      align-items: center;
      .section-star-item {
        position: relative;
        image {
          width: 80rpx;
          height: 80rpx;
        }
        .num {
          position: absolute;
          top: 0;
          left: 75%;
          display: flex;
          justify-content: center;align-items: center;
          font-size: 18rpx;
          
          color: #FFFFFF;
          width: 30rpx;
          height: 30rpx;
          border-radius: 50%;
          background-color: #FF4444;
        }
      }
    }

    // 列表区域
    .main {
      .cell {
        background-color: #FFFFFF;

        .title {
          display: flex;
          align-items: center;
          font-size: 26rpx;

          .iconfont {
            margin-right: 20rpx;
          }
        }
      }
    }

    // 版本
    .version {
      display: flex;
      justify-content: center;
      margin-top: 10rpx;
      color: #CCCCCC;
      font-size: 24rpx;
    }

    // 联系客服
    .contact-us {
      width: 80rpx;
      height: 80rpx;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      right: 30rpx;
      bottom: 100rpx;
      background-color: #C2C2C2;
      border-radius: 50%;

      .iconfont {
        font-size: 60rpx;
      }
    }
  }

  @keyframes rotate {
    0% {
      transform: translate(-50%, 0) rotateZ(0deg);
    }

    50% {
      transform: translate(-50%, -2%) rotateZ(180deg);
    }

    100% {
      transform: translate(-50%, 0%) rotateZ(360deg);
    }
  }
</style>
