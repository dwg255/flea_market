<template>
	<view class="home-container">
		<!-- 自定义导航栏 -->
		<my-tab-bar>
			<template v-slot:left>
				<view @click="gotoSearch" :class="{colorBlack:switchColor}" class="iconfont icon-custom-search"></view>
			</template>
			<template v-slot:center>
				<view class="positoin-content" @click="gotoPositionList">
					<view :class="{colorBlack:switchColor}" class="iconfont icon-dingwei1"></view>
					<view :class="{colorBlack:switchColor,'positoin-text':true}"
						:style="'max-width:' + tabBarCenterMaxWidth + 'px;'"> {{address}} </view>
				</view>
			</template>
		</my-tab-bar>
		<!-- 轮播图 -->
		<swiper class="swiper" :indicator-dots="true" :circular="true" :autoplay="true" :interval="3000"
			:duration="1000">
			<swiper-item>
				<view class="swiper-item">
					<image class="swiper-image" src="../../static/swiper-image/swiper-image-1.jpg" mode=""></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image class="swiper-image" src="../../static/swiper-image/swiper-image-2.jpg" mode=""></image>
				</view>
			</swiper-item>

		</swiper>
		<!-- 分类导航区域 -->
		<view class="nav-list">
			<view class="nav-item" @click="gotoGoodsList(item)" v-for="(item,index) in nvaList" :key="index">
				<image class="nav-image" :src="item.imageUrl" mode=""></image>
				<text class="nav-text">{{item.title}}</text>
			</view>
		</view>

		<!-- 商品列表区域 -->
		<view class="goods-list-box">
			<!-- 商品分类导航 -->

			<view class="goods-nav">
				<view class="goods-nav-item" :class="{'is-active':active == 0}" @click="changeTab(0)">
					<text>附近</text>
				</view>
				<view class="goods-nav-item" :class="{'is-active':active == 1}" @click="changeTab(1)">
					<text>人气</text>
				</view>
				<view class="goods-nav-item" :class="{'is-active':active == 2}" @click="changeTab(2)">
					<text>最新</text>
				</view>
			</view>

			<!-- 商品列表 -->
			<view class="goods-list">
				<goods-item v-for="(item,index) in goodsList" :key="index" @click="gotoGoodsDetails(item)" :goodsInfo="item"></goods-item>
			</view>
			<view class="has-more" v-show="goodsList.length > 0">
				<text v-if="isLoading">加载中...</text>
				<text v-else>{{hasMore}}</text>
			</view>
		</view>
		<view class="back-top" @click="backTop">
			<image class="back-top-img" src="../../static/images/back-to-top.png" mode=""></image>
		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	let QQMapWX = require('../../common/libs/qqmap-wx-jssdk.js')
	import {userLogin} from '@/common/api/user/login.js'
	let count = 0
	import {
		navList
	} from "@/common/nav-list.js"
    import {goodsList} from '@/common/api/goods/goods.js'
	const getTokenStorage = () => {
		let token = ''
		try {
			token = uni.getStorageSync('token')
		} catch (e) {}
		return token
	}
	export default {
		computed: {
			...mapState(['tabBarCenterMaxWidth', 'address'])
		},
		data() {
			return {
				openid: "",
				session_key: "",
				// scrollTop: 0,
				pois: [],
				hasMore: "下拉获取更多",
				isLoading: false, //是否正在加载
				switchColor: false,
				active: 0,
				goodsList: [],
				nvaList: navList,
				fab: {
					iconPath: "@/static/images/back-top.jpg"
				},
        queryParam:{
          page_num:1,
          page_size:5,
          total:0
        },
			}
		},
		created() {
			if (!this.address) {
				uni.getLocation({
					fail: function(res) {
						// console.log(res)
					},
					success: (res) => {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
            this.setCoordinate({latitude: res.latitude,longitude: res.longitude})
						let qqmapsdk = new QQMapWX({
							key: "3RDBZ-WSOL2-E36UY-CRAAF-SM2X3-DDFWE"
						})
						qqmapsdk.reverseGeocoder({
							location: {
								latitude: res.latitude,
								longitude: res.longitude,
							},
							sig: 'tKkZQ3CRUFZuvZIeQSmYcjdYGHdiilx',
							get_poi: 1,
							success: (res) => {
								let address = res.result.address
								this.pois = res.result.pois
								this.setAddress(address)
								this.setPositionList(this.pois)
							},
							fail: function(res) {
								// console.log(res)
							}
						})
					}
				})
			}
      if (!getTokenStorage()) {
      	this.changeLogin();
      }
      this.getGoodsList()
		},
		// //监听页面滚动
		// Scroll(res) {
		//   this.scrollTop = res.scrollTop
		// },
		// 下拉刷新
		onPullDownRefresh() {
			if (this.isLoading) return
			// uni.showLoading({
			// 	title: "数据加载中..."
			// })
      this.queryParam.page_num = 1
      this.goodsList = []
      this.getGoodsList()
      // uni.hideLoading()
		},
		// 触底加载
		onReachBottom() {
			if (this.isLoading) {
				return
			}
      // this.isLoading = true
      this.getGoodsList()
      // this.isLoading = false
		},
		methods: {
			...mapMutations(['setAddress', 'setPositionList','setCoordinate']),
      
			// 加载数据
			async getGoodsList() {
        // console.log("in",this.isloadings)
        if (this.isloading) return
        if (this.hasMore == "已加载全部" ) return
        this.isloading = true
        const res = await goodsList({...this.queryParam,type:this.active})
        // console.log(res)
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
			// backTop 返回顶部
			backTop() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 500
				});
			},
			//切换tab栏
			changeTab(active) {
        this.hasMore = "下拉获取更多"
				this.active = active
        this.goodsList = []
        this.queryParam.page_num = 1
				this.getGoodsList()
			},
			// 点击分类导航栏
			gotoGoodsList(item) {
				uni.navigateTo({
					url: "../../subpkg/goods-list/goods-list?cat_id=" + item.cat_id
				})
			},
			// 点击搜索
			gotoSearch() {
				uni.navigateTo({
					url: "../../subpkg/search/search"
				})
			},
			// 选择地址
			gotoPositionList() {
				uni.navigateTo({
					url: "../../subpkg/position-list/position-list"
				})
			},
			// 点击商品详情
			gotoGoodsDetails(item) {
				uni.navigateTo({
					url: "../../subpkg/goods-details/goods-details?goods_id=" + item.goods_id
				})
			},
			changeLogin() {
				//登录
				uni.login({
					provider: 'weixin',
					success: res => {
						// console.log('登录成功：', res);
						//获取临时登录凭证code
						this.Code = res.code;
						//获取openid，session_key
						let appid = "wxc82344c498aa51bb" //需替换
						let secret = "d88b0f4bb8f41889873d93248fe93109" //需替换
						let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' +
							secret +
							'&js_code=' +
							this.Code + '&grant_type=authorization_code';
						uni.request({
							url: url, // 请求路径
							success: res => {
								// console.log('openid session_key:', res.data);
								this.openid = res.data.openid
								this.session_key = res.data.session_key


								//获取用户信息
								uni.getUserInfo({
									provider: 'weixin',
									success:async res => {
										const data = await userLogin({
											openid:this.openid,
											nickName:res.userInfo.nickName,
											gender:res.userInfo.gender,
											avatarUrl:res.userInfo.avatarUrl,
											country:res.userInfo.country,
											province:res.userInfo.province,
											city:res.userInfo.city
										})
										uni.setStorage({ 
											key: 'token',
											data:data.data.token
										})
										console.log(data.data.token)
										console.log('获取用户信息', res);
										// //解密encryptedData，可获取用户openId
										// let pc = new WXBizDataCrypt(appid, this
										// 	.session_key);
										// let data = pc.decryptData(res.encryptedData,
										// 	res.iv);
										// console.log('解密后：', data)
									},
									fail: err => {
										console.log('获取用户信息错误：', err)
									}
								})

							},
							fail: err => {
								console.log('请求失败：', err)
							}
						});
					},
					fail: err => {
						console.log('登录失败：', err)
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.back-top {
		position: sticky;
		left: 600rpx;
		bottom: 60rpx;
		opacity: .2;
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
		overflow: hidden;

		.back-top-img {
			width: 100%;
			height: 100%;
		}
	}

	.topicon {
		.icon {
			border: #4CD964 2upx solid;
		}
	}

	.home-container {
		background-color: #F2F2F2;

		.positoin-content {
			display: flex;
			align-items: center;
			font-size: 30rpx;

			.iconfont {
				margin-right: 5px;
			}

			.positoin-text {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}

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

		.placeholder {
			width: 750rpx;
			height: 2000rpx;
		}

		// 分类导航区域
		.nav-list {
			width: 750rpx;
			display: flex;
			flex-wrap: wrap;
			margin-top: 60rpx;
			padding-bottom: 40rpx;
			border-bottom: 4rpx solid #C1C1C1;
			background-color: #FFFFFF;

			.nav-item {
				width: 25%;
				margin-top: 40rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;

				.nav-image {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					margin-bottom: 4rpx;
				}

				.nav-text {
					font-size: 24rpx;
				}
			}
		}

		// 商品列表区域
		.goods-list-box {

			background-color: #FFFFFF;
			margin-top: 20rpx;

			.goods-nav {
				height: 100rpx;
				display: flex;
				justify-content: space-around;
				align-items: center;
				border-bottom: 1px solid #E9E9E9;
				font-size: 32rpx;
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
	}
</style>
