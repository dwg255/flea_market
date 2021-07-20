<template>
		<scroll-view class="ss-scroll-navbar" scroll-x :scroll-left="scrollLeft" scroll-with-animation="true">
			<view
			v-for="(item, index) in navArr"
			:key="item.cat_id" 
			class="nav-item"
			:class="{current: index === tabCurrentIndex}"
			@click="tabChange(index)"
			:id="'item-' + index"
			>
				<text class="title">{{item.title}}</text>
			</view>
		</scroll-view>
	
	
</template>

<script>
	export default {
		name: 'scroll-navbar',
		props: {
			navArr: {
				type: Array
			},
			tabCurrentIndex: {
				type: Number,
				default: 0
			},
			scrollChangeIndex:{
				type: Number,
				default: 0
			},
		},
		data () {
			return {
				scrollLeft: 0,
				widthList: [],
				screenWidth: 0,
			}
		},
		methods: {
			/**
			 * 导航栏navbar
			 * 点击事件
			 */
			tabChange (index) {
				this.$emit('navbarTap', index);
        
				var widthArr = this.widthList;
				var scrollWidth = 0;
				for (var i = 0; i < index + 1; i++) {
					scrollWidth += widthArr[i];
				}
				let currentWidth = widthArr[index];
				// scrollView 居中算法
				// 减去固定宽度位移
				// 减去选中的bar的宽度的一半
				scrollWidth -=  this.screenWidth / 2;
				scrollWidth -= currentWidth / 2;
				this.scrollLeft = scrollWidth;
			},
			calculateItemWidth () {
				var that = this;
				var arr = [];
				let w = 0;
				this.navArr.forEach((item, index) =>{
					let view = uni.createSelectorQuery().in(this).select("#item-" + index);
					view.fields({
						size: true
					}, data => {
						arr.push(data.width);
					}).exec();
				})
				this.widthList = arr;
			},
			calculateWindowWidth () {
				var info = uni.getSystemInfoSync();
				this.screenWidth = info.screenWidth;
			}
		},
		created () {
			var that = this;
			this.calculateWindowWidth();
			setTimeout(function() {
				that.calculateItemWidth();
			}, 1000);
		},
		watch:{
			scrollChangeIndex(val){
				this.tabChange(val)
			},
		},
		
	}
</script>

<style lang="scss">
	.ss-scroll-navbar {
		width: 100%;
		height: 90upx;
		box-shadow: 0 2upx 8upx rgba(0,0,0,.06);
		background-color: #fff;
		white-space:nowrap;
		
		.nav-item {
			height: 90upx;
			text-align: center;
			padding: 0upx 20upx;
			color: #303133;
			display: inline-block;
			position: relative;
			font-size: 30upx;
			
			.title {
				line-height: 90upx;
			}
			
			&:after{
				content: '';
				width: 0;
				height: 0;
				border-bottom: 4upx solid #00aaff;
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				transition: .3s;
			}
		}
		
		.current{
			color: #007AFF;
			
			&:after{
				width: 50%;
			}
		}
	}
</style>
