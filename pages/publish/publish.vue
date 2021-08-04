<template>
  <view class="publish-container">
    <my-tab-bar id="my-tab-bar" :title="'物品发布'">
      <template v-slot:left>
        <view @click="gotoHome" :class="{colorBlack:switchColor}" class="iconfont icon-shouye1"></view>
      </template>
    </my-tab-bar>
    <view class="publish-box">
      <view class="form-item">
        <view class="input-title">
          物品标题
        </view>
        <input class="input-item input-title" v-model="formData.title" type="text" placeholder="起一个吸引人的标题吧" />
      </view>
      <view class="form-item">
        <view class="input-title">
          物品描述
        </view>
        <textarea class="input-item input-content" type="text" placeholder="请输入物品详细描述" maxlength="100"
          v-model="formData.content" />
      </view>
      <view class="form-item upload-pics">
        <htz-image-upload name="imgfile" @uploadSuccess="uploadSuccess" :max="6" :sourceType="sourceType"
          v-model="imgList" action="http://47.92.89.159:8080/upload"></htz-image-upload>
      </view>
      <!-- 分类 -->
      <view class="form-item">
        <view class="form-cell">
          <view class="form-cell-left">
            物品分类
          </view>
          <view class="form-cell-right">
            <picker mode="selector" :range="navList" range-key="title" @change="catIdChange" :value="index">
              <view class="picker">
                <view class="uni-input">{{navList[index].title}}</view>
                <view class="iconfont icon-arrow-right">
                </view>
              </view>
            </picker>
          </view>
        </view>
      </view>
      <!-- 标签 -->
      <view class="form-item">
        <view class="form-cell">
          <view class="form-cell-left">
            物品标签
          </view>
          <view class="form-cell-right">
            <input class="uni-input" v-model="goods_tag" confirm-type="done" maxlength="5" @confirm="addTag"
              placeholder="请输入物品标签" />
          </view>
        </view>
        <view v-if="formData.goods_tags.length != 0" class="form-cell">
          <view class="goods-tag">
            <view class="tag-item" v-for="(item,index) in formData.goods_tags" :key="index">{{item}}
              <view class="close" @click="delTag(index)">
                <icon type="clear" size="12" />
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- 数量 -->
      <view class="form-item">
        <view class="form-cell">
          <view class="form-cell-left">
            库存数量
          </view>
          <view class="form-cell-right">
            <input class="uni-input" type="number" v-model="formData.goods_num" maxlength="5" @confirm="addTag" />
          </view>
        </view>
      </view>

      <!-- 价格 -->
      <view class="form-item">
        <view class="form-cell">
          <view class="form-cell-left">
            价格
          </view>
          <view class="form-cell-right">
            <input class="uni-input" type="number" v-model="formData.goods_price" maxlength="5" @confirm="addTag" />
            <text class="price-unit">元</text>
          </view>
        </view>
      </view>
      <!-- 是否启用在线交易 -->
      <view class="form-item">
        <view class="form-cell">
          <view class="form-cell-left">
            是否启用在线交易
          </view>
          <view class="form-cell-right" style="height: 44rpx; display: flex; align-items: center;">
            <switch class="online-sell-switch" :checked="formData.online_sell" @change="onlineSellChange" />
          </view>
        </view>
      </view>
      <!-- 配送方式 -->
      <view class="form-item">
        <view class="form-cell">
          <view class="form-cell-left">
            配送方式
          </view>
          <view class="form-cell-right">
            <picker mode="selector" :range="expressList" range-key="text" @change="expressTypeChange"
              :value="expressIndex">
              <view class="picker">
                <view class="uni-input">{{expressList[expressIndex].text}}</view>
                <view class="iconfont icon-arrow-right">
                </view>
              </view>
            </picker>
          </view>
        </view>
      </view>
      <!-- 物品发布公约 -->
      <view class="agreement">
        <label>
          <checkbox class="agreement-chk" :value="confirmPublish" /><text>阅读并同意</text>
        </label><text class="content" @click="readAgreement">《物品发布公约》</text>
      </view>
      <!-- 提交按钮 -->
      <button class="submit" type="default" @click="publish">确定</button>

    </view>

    <!-- pop 弹出层，提示消息 -->
    <uni-popup :animation="true" ref="msgBox" type="bottom">
      <uni-popup-message :style="{position: 'absolute',top: tabBarHeight + 'px',width:'750rpx'}" :type="message.type"
        :message="message.text" :duration="2000">
      </uni-popup-message>
    </uni-popup>

  </view>
</template>

<script>
  var msgBoxClose = null
  import {
    addGoods,
    updateGoods,
    goodsDetails
  } from '@/common/api/goods/goods.js'
  import {
    navList
  } from "@/common/nav-list.js"
  import {
    mapState
  } from 'vuex';

  function checkRequired(that, field, errMsg) {
    if (typeof field == "string" && field.length != 0) {
      return true
    } else if (field instanceof Array && field.length != 0) {
      return true
    } else if (typeof field == "number" && field > 0) {
      return true
    }
    that.goods_tag = ""
    that.message.type = "error"
    that.message.text = errMsg
    that.showMsg()
    return false
  }

  function checkMin(that, field, minLength, errMsg) {
    if (typeof field == "string" && field.length >= minLength) {
      return true
    }
    that.goods_tag = ""
    that.message.type = "error"
    that.message.text = errMsg
    that.showMsg()
    return false
  }

  function checkMax(that, field, maxLength) {
    if (typeof field == "string" && field.length <= maxLength) {
      return true
    }
    that.goods_tag = ""
    that.message.type = "error"
    that.message.text = errMsg
    that.showMsg()
    return false
  }
  export default {
    computed: {
      ...mapState(['address', 'coordinate'])
    },
    onLoad(option) {
      this.formData.goods_id = option.goods_id
      if (option.goods_id) {
        this.loadGoodsDetail()
      }
    },
    data() {
      return {
        tabBarHeight: 0, //tabbar高度，为了消息弹出层避开
        index: 0, //选中的key
        expressIndex: 0,
        confirmPublish: false, //同意发布公约
        navList: navList, //物品分类
        expressList: [{
          express_type: 1,
          text: "快递"
        }, {
          express_type: 2,
          text: "自提"
        }],
        formData: {
          goods_id: 0,
          title: "",
          content: "",
          goods_tags: ["apple", "phone"],
          goods_num: 1,
          goods_price: 0,
          online_sell: true,
          express_type: 1,
          address: "",
          cat_id: 1
        },
        // 图片上传相关
        imgList: [],
        sourceType: ['album', 'camera'],
        goods_tag: "",
        message: {
          type: "success",
          text: "成功"
        }
      }
    },
    onShow() {
      uni.hideTabBar()
    },
    onHide() {
      uni.showTabBar()
    },
    methods: {
      // 展示消息弹窗
      showMsg() {
        this.$refs.msgBox.open('top')
        clearTimeout(msgBoxClose)

        msgBoxClose = setTimeout(() => {
          this.$refs.msgBox.close()
          msgBoxClose = null
        }, 2000)
      },
      // 打开协议
      readAgreement() {

      },
      //选择商品分类
      catIdChange(e) {
        this.index = e.detail.value - 0
        this.formData.cat_id = this.navList[this.index].cat_id
      },
      //选择配送方式
      expressTypeChange(e) {
        this.expressIndex = e.detail.value - 0
        this.formData.express_type = this.expressList[this.expressIndex].express_type
      },
      // 跳转至首页
      gotoHome() {
        uni.switchTab({
          url: "/pages/home/home"
        })
      },
      // 上传图片成功
      uploadSuccess(res) {
        console.log("uploadSuccess")
        console.log(res)
        try {
          const data = JSON.parse(res.data)
          this.imgList = [...this.imgList, "http://47.92.89.159:8080/" + data.result.path]
        } catch (e) {
          console.log("parse err", e)
        }
      },
      // 点击添加标签
      addTag() {
        // console.log("add tag")
        let goods_tag = this.goods_tag.trim()
        if (!goods_tag) return
        this.goods_tag = ""
        if (this.formData.goods_tags.indexOf(goods_tag) != -1) {
          this.goods_tag = ""
          this.message.type = "error"
          this.message.text = `标签[${goods_tag}]不能重复添加！`
          this.showMsg()
          return
        }
        this.formData.goods_tags = [...this.formData.goods_tags, goods_tag]
      },
      // 删除标签
      delTag(index) {
        this.formData.goods_tags.splice(index, 1)
      },
      // 是否启用在线交易
      onlineSellChange(e) {
        this.formData.online_sell = e.target.value
      },
      async publish() {
        if (!(checkRequired(this, this.formData.title, "请输入标题") &&
            checkRequired(this, this.formData.content, "请输入物品描述") &&
            checkRequired(this, this.imgList, "请至少上传一张图片") &&
            checkRequired(this, this.formData.goods_num, "请输入物品数量") &&
            checkRequired(this, this.formData.goods_price, "请输入物品价格"))) {
          return
        }
        if (this.formData.goods_id) {
          // 添加
          const data = await updateGoods({
            ...this.formData,
            pics: this.imgList,
            address: this.address,
            ...{
              goods_num: parseInt(this.formData.goods_num),
              goods_price: parseInt(this.formData.goods_price)
            },
            ...this.coordinate
          })
          if (data.statusCode == 200) {
            this.clear()
          }
        } else {
          // 修改
          const data = await addGoods({
            ...this.formData,
            pics: this.imgList,
            address: this.address,
            ...{
              goods_num: parseInt(this.formData.goods_num),
              goods_price: parseInt(this.formData.goods_price)
            },
            ...this.coordinate
          })
          if (data.statusCode == 200) {
            this.clear()
          }
        }
      },
      clear() {
        console.log("clear")
        uni.showToast({
          title: '发布成功！',
          duration: 2000,
          icon: "success"
        });
        this.formData = {
          title: "",
          content: "",
          goods_tags: ["apple", "phone"],
          goods_num: 1,
          goods_price: 0,
          online_sell: true,
          express_type: 1,
          address: "",
          cat_id: 1
        }
        uni.switchTab({
           url: "../home/home"
        })
      },
      async loadGoodsDetail() {
        const res = await goodsDetails({}, {
          goods_id: parseInt(this.formData.goods_id)
        })
        // console.log(res)
        let pics, tags
        try {
          pics = JSON.parse(res.data.goodsInfo.pics)
        } catch (err) {
          pics = []
        };
        res.data.goodsInfo.pics = pics
        try {
          tags = JSON.parse(res.data.goodsInfo.tags)
        } catch (err) {
          tags = []
        };
        res.data.goodsInfo.tags = tags
        this.formData = res.data.goodsInfo
        this.imgList = res.data.goodsInfo.pics
        this.index = res.data.goodsInfo.cat_id
        this.formData.goods_tags = res.data.goodsInfo.tags
        this.formData.goods_price = res.data.goodsInfo.price

        console.log(res)
        console.log(this.formData)
        // this.goodsDetails.goods_num = res.data.goods_num
        // this.dialogList = res.data.dialogList
        // this.Star = res.data.star
      }
    },
    // 获取上传状态
    select(e) {
      console.log('选择文件：', e)
    },
    // 获取上传进度
    progress(e) {
      console.log('上传进度：', e)
    },

    // 上传成功
    success(e) {
      console.log('上传成功')
    },

    // 上传失败
    fail(e) {
      console.log('上传失败：', e)
    },
    mounted() {
      const query = uni.createSelectorQuery().in(this);
      query.select('#my-tab-bar').boundingClientRect(data => {
        this.tabBarHeight = data.height
      }).exec();
    }
  }
</script>

<style lang="scss">
  // /deep/ .uni-popup {
  //   top:66px!important;
  // }
  .publish-container {
    .uni-popup {
      z-index: 99;
    }

    .publish-box {
      background-color: #F2F2F2;

      .form-item {
        width: 750rpx;
        border-bottom: 1px solid #F2F2F2;

        .input-title {
          padding: 12rpx 0 6rpx 30rpx;
          font-size: 30rpx;
          color: #999999;
        }

        .input-item {
          box-sizing: content-box;
          padding-left: 30rpx;
          padding-right: 30rpx;
          font-size: 32rpx;
          background-color: #FFFFFF;
          color: #000;
        }

        .input-content {
          width: 690rpx;
          height: 140rpx;
          border-bottom: 1px solid #EEEEEE;
          font-size: 30rpx;
        }

        .form-cell {
          padding: 20rpx 30rpx;
          display: flex;
          align-items: center;
          font-size: 28rpx;
          background-color: #FFFFFF;

          .form-cell-left {
            width: 240rpx;
            color: #000;
          }

          .form-cell-right {
            position: relative;
            flex: 1;
            color: #000;

            .price-unit {
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
            }

            .picker {
              display: flex;
              justify-content: space-between;
            }

            .online-sell-switch {
              transform: scale(0.7);
              margin-left: 350rpx;
            }
          }
        }

        // 标签
        .goods-tag {

          display: flex;

          .tag-item {
            position: relative;
            font-size: 26rpx;
            border: 1px solid #9ACD56;
            border-radius: 10rpx;
            color: #9ACD56;
            padding: 4rpx 8rpx;
            margin-right: 20rpx;

            &:nth-child(2) {
              color: #ff0000;
              border-color: #ff0000;
            }

            &:nth-child(3) {
              color: #00ff00;
              border-color: #00ff00;
            }

            &:nth-child(4) {
              color: #0000ff;
              border-color: #0000ff;
            }

            &:nth-child(5) {
              color: #00eeff;
              border-color: #00eeff;
            }

            .close {
              background-color: #ffffff;
              position: absolute;
              top: -24rpx;
              right: -12rpx;
            }
          }

        }
      }

      .upload-pics {
        background-color: #FFFFFF;
        border-bottom: 30rpx solid #999999;
      }

      // 发布公约
      .agreement {
        margin-top: 10rpx;
        padding-left: 30rpx;
        font-size: 24rpx;
        color: #999999;

        .agreement-chk {
          transform: scale(0.6);
        }

        .content {
          color: #586C94;
        }
      }

      // 提交按钮
      .submit {
        margin: 20rpx 30rpx 20rpx 30rpx;
        background: #F37B1D;
        color: #fff;
      }
    }
  }
</style>
