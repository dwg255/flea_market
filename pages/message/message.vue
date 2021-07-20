<template>
  <view class="message-container">
    <my-tab-bar :showBackIcon="false" :title="'消息列表'">

    </my-tab-bar>
    <!-- <cmd-cell-item title="您还没有收到新消息"></cmd-cell-item> -->
    <uni-swipe-action>
      <uni-swipe-action-item v-for="(item,index) in chatList" :key="index" :right-options="options" @click="del(index)">
        <view class="chat-item" @click="gotoChat">
          <view class="left">
            <image src="../../static/navs/1.jpeg" mode=""></image>
            <text>dwg</text>
          </view>
          <view class="right">
            <image src="../../static/navs/1.jpeg" mode=""></image>
          </view>
        </view>
      </uni-swipe-action-item>
    </uni-swipe-action>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        chatList: [{}, {}, {}, {}, {}], //我的发布列表
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#FF4444'
          }
        }]
      };
    },
    methods: {
      del(index) {
        console.log("删除了第" + index + "个")
        this.chatList.splice(index, 1)
      },
      gotoChat() {
        uni.navigateTo({
          url: "../../subpkg/chat/chat"
        })
        
      }
    }
  }
</script>

<style lang="scss">
  .message-container {
    /deep/ .cmd-cell-item {
      background-color: #FFFFFF;
    }

    /deep/ .cmd-cell-item-content {
      display: flex;
      justify-content: center;
      color: #AAAAAA;
    }

    height: 100vh;
    background-color: #F2F2F2;

    .chat-item {
      background-color: #FFFFFF;
      padding: 20rpx 30rpx;
      border-bottom: 1px solid #EEEEEE;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
        align-items: center;
        font-size: 32rpx;

        image {
          width: 100rpx;
          height: 100rpx;
          border-radius: 50%;
          margin-right: 20rpx;
        }
      }

      .right {
        image {
          width: 100rpx;
          height: 100rpx;
          border-radius: 20rpx;
        }
      }
    }
  }
</style>
