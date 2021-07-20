<template>
  <view class="my-tab-bar-container">
    <view class="prohibition">
      <!-- 顶部手机状态栏 -->
      <view class="tab-bar-top" :class="{BGCWhite:switchColor}" :style="'height:'+capsulePosition.top+'px;'">
        
      </view>
      <!-- 自定义tabber内容 -->
      <view class="tab-bar-box" :class="{BGCWhite:switchColor}"
        :style="'height:' +  capsulePosition.height + 'px;' + 'padding-top:0px;'">
        <!-- 左侧 -->
        <view class="left-icon" v-if="showBackIcon">
          <slot name="left">
            <view @click="navigationBack" class="iconfont icon-arrow-left-bold">
            </view>
          </slot>
        </view>
        <!-- 中间位置 -->
        <view class="center-content">
          <slot name="center">
            <view :class="{colorBlack:switchColor,'positoin-text':true}" >
              {{title}}
            </view>
          </slot>
         
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {  
   mapState,   
   mapMutations
  } from 'vuex';
  export default {
    name: "my-tab-bar",
    props:{
      title:{
        type:String
      },
      showBackIcon:{
        type:Boolean,
        default:true
      },
      switchColor:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        centerMaxWidth:0, //中间最大宽度
        capsulePosition: {
          top: 0,
          height: 0,
        }
      };
    },
    created() {  
      // 计算小程序胶囊按钮
      this.capsulePosition.top = 12
      this.capsulePosition.height = 32
      this.setTabBarCenterMaxWidth(300)
      
      //#ifdef MP-WEIXIN
      const capsulePosition = uni.getMenuButtonBoundingClientRect()
      this.capsulePosition.top = capsulePosition.top
      this.capsulePosition.height = capsulePosition.height
      uni.getSystemInfo({
        success:(res)=>{
          this.centerMaxWidth = res.windowWidth - 2 * ((res.windowWidth - capsulePosition.right) + capsulePosition.width) - 30
          this.setTabBarCenterMaxWidth(this.centerMaxWidth)
        }
      })
       //#endif
       this.setTabBarHeight(this.capsulePosition.top + this.capsulePosition.height)
    },
    methods:{
      ...mapMutations(['setTabBarCenterMaxWidth','setTabBarHeight']),
      navigationBack(){
        uni.navigateBack()
      },
    }
  }
</script>

<style lang="scss" scoped>
  .my-tab-bar-container {
    z-index: 99;
    position: sticky;
    top: 0;
    left: 0;
    .prohibition {
      .tab-bar-top{
        background:#000000;
      }
      .tab-bar-box {
        position: relative;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #000000;
        font-size: 30rpx;
        color: #FFFFFF;
        padding-bottom:20rpx;
        .center-content {
          display: flex;
          align-items: center;
          .iconfont{
            margin-right: 5px;
          }
          .positoin-text{
            overflow: hidden;
            text-overflow:ellipsis; 
            white-space: nowrap;
          }
        }
        .left-icon {
          float: left;
          position: absolute;
          width: max-content;
          height: max-content;
          top: 0;
          bottom: 0;
          left: 40rpx;
          margin: auto;
          padding-bottom:20rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          .iconfont {
            color: #FFFFFF;
          }
        }
      }
    }
    .colorBlack{
      color:#000000!important;
    }
    .BGCWhite{
      background:#FFFFFF!important;
    }
  }
</style>
