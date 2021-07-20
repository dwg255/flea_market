<template>
	<view>
    <my-tab-bar title="聊天中"></my-tab-bar>
		<view class="content" >
			<scroll-view class="msg-list" :style="{top:tabBarHeight+'px'}" scroll-y="true" :scroll-with-animation="scrollAnimation" :scroll-top="scrollTop" :scroll-into-view="scrollToView" @scrolltoupper="loadHistory" upper-threshold="50">
				<!-- 加载历史数据waitingUI -->
				<view class="loading" v-if="isHistoryLoading">
					<view class="spinner">
						<view class="rect1"></view>
						<view class="rect2"></view>
						<view class="rect3"></view>
						<view class="rect4"></view>
						<view class="rect5"></view>
					</view>
				</view>
				<view class="row" v-for="(row,index) in msgList" :key="index" :id="'msg'+row.msg.id">
					<!-- 用户消息 -->
					<block v-if="row.type=='user'">
						<!-- 自己发出的消息 -->
						<view class="my" v-if="row.msg.userinfo.uid==myuid">
							<!-- 左-消息 -->
							<view class="left">
								<!-- 文字消息 -->
								<view v-if="row.msg.type=='text'" class="bubble">
									<rich-text :nodes="row.msg.content.text"></rich-text>
								</view>
							</view>
							<!-- 右-头像 -->
							<view class="right">
								<image :src="row.msg.userinfo.face"></image>
							</view>
						</view>
            
						<!-- 别人发出的消息 -->
						<view class="other" v-if="row.msg.userinfo.uid!=myuid">
							<!-- 左-头像 -->
							<view class="left">
								<image :src="row.msg.userinfo.face"></image>
							</view>
							<!-- 右-用户名称-时间-消息 -->
							<view class="right">
								<view class="username">
									<view class="name">{{row.msg.userinfo.username}}</view> <view class="time">{{row.msg.time}}</view>
								</view>
								<!-- 文字消息 -->
								<view v-if="row.msg.type=='text'" class="bubble">
									<rich-text :nodes="row.msg.content.text"></rich-text>
								</view>
							</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>

		<!-- 底部输入栏 -->
		<view class="input-box"  @touchmove.stop.prevent="discard">
			<view class="textbox">
				<view class="text-mode"  >
					<view class="box">
						<textarea auto-height="true" v-model="textMsg"/>
					</view>
				</view>
			</view>

			<view class="send"  @tap="sendText">
				<view class="btn">发送</view>
			</view>
		</view>
	</view>
</template>
<script>
  import {mapState} from "vuex"
	export default {
		computed: {
      ...mapState(['tabBarHeight'])
		},
		data() {
			return {
				//文字消息
				// dotsCurrent:1,
				textMsg:'',
				//消息列表
				isHistoryLoading:false,
				scrollAnimation:false,
				scrollTop:0,
				scrollToView:'',
				msgList:[],
				myuid:0,

			};
		},
		onLoad(option) {
			this.getMsgList();
		},
		
		onShow(){
			this.scrollTop = 9999999;
		},
		methods:{
			// 接受消息(筛选处理)
			screenMsg(msg){
				//从长连接处转发给这个方法，进行筛选处理
        if(msg.type=='user'){
					// 用户消息
					switch (msg.msg.type){
						case 'text':
							this.addTextMsg(msg);
							break;
					}
					// console.log('用户消息');
					//非自己的消息震动
					if(msg.msg.userinfo.uid!=this.myuid){
						// console.log('振动');
						uni.vibrateLong();
					}
				}
				this.$nextTick(function() {
					// 滚动到底
					this.scrollToView = 'msg'+msg.msg.id
				});
			},
			
			//触发滑动到顶部(加载历史信息记录)
			loadHistory(e){
				if(this.isHistoryLoading){
					return ;
				}
				this.isHistoryLoading = true;//参数作为进入请求标识，防止重复请求
				this.scrollAnimation = false;//关闭滑动动画
				let Viewid = this.msgList[0].msg.id;//记住第一个信息ID
				//本地模拟请求历史记录效果
				setTimeout(()=>{
					// 消息列表
					let list = [
						{type:"user",msg:{id:1,type:"text",time:"12:56",userinfo:{uid:0,username:"大黑哥",face:"/static/img/im/face/face.jpg"},content:{text:"为什么温度会相差那么大？"}}},
						{type:"user",msg:{id:2,type:"text",time:"12:57",userinfo:{uid:1,username:"售后客服008",face:"/static/img/im/face/face.jpg"},content:{text:"这个是有偏差的，两个温度相差十几二十度是很正常的，如果相差五十度，那即是质量问题了。"}}},
					]
          this.msgList = [...list,...this.msgList];
					//这段代码很重要，不然每次加载历史数据都会跳到顶部
					this.$nextTick(function() {
						this.scrollToView = 'msg'+Viewid;//跳转上次的第一行信息位置
						this.$nextTick(function() {
							this.scrollAnimation = true;//恢复滚动动画
						});
						
					});
					this.isHistoryLoading = false;
					
				},1000)
			},
			// 加载初始页面消息
			getMsgList(){
        console.log('getMsgList')
				// 消息列表
				let list = [
					{type:"user",msg:{id:1,type:"text",time:"12:56",userinfo:{uid:0,username:"大黑哥",face:"/static/img/im/face/face.jpg"},content:{text:"为什么温度会相差那么大？"}}},
					{type:"user",msg:{id:2,type:"text",time:"12:57",userinfo:{uid:1,username:"售后客服008",face:"/static/img/im/face/face.jpg"},content:{text:"这个是有偏差的，两个温度相差十几二十度是很正常的，如果相差五十度，那即是质量问题了。"}}},
				]

				this.msgList = [...list,...this.msgList];
				// 滚动到底部
				this.$nextTick(function() {
					//进入页面滚动到底部
					this.scrollTop = 9999;
					this.$nextTick(function() {
						this.scrollAnimation = true;
					});
					
				});
			},
			
      
			// 发送文字消息
			sendText(){
				// uni.showToast({
				// 	title:'发送文本消息',
				// 	icon:"none"
				// })

				if(!this.textMsg){
					return;
				}
				
				let content = this.textMsg;
				let msg = {text:content}
				this.sendMsg(msg,'text');
				this.textMsg = '';//清空输入框
			},
			
			// 发送消息
			sendMsg(content,type){
				//实际应用中，此处应该提交长连接，模板仅做本地处理。
				var nowDate = new Date();
				let lastid = this.msgList[this.msgList.length-1].msg.id;
				lastid++;
				let msg = {type:'user',msg:{id:lastid,time:nowDate.getHours()+":"+nowDate.getMinutes(),type:type,userinfo:{uid:0,username:"大黑哥",face:"/static/img/im/face/face.jpg"},content:content}}
				// 发送消息
				this.screenMsg(msg);
				// 定时器模拟对方回复,三秒
				setTimeout(()=>{
					lastid = this.msgList[this.msgList.length-1].msg.id;
					lastid++;
					msg = {type:'user',msg:{id:lastid,time:nowDate.getHours()+":"+nowDate.getMinutes(),type:type,userinfo:{uid:1,username:"售后客服008",face:"/static/img/im/face/face.jpg"},content:content}}
					// 本地模拟发送消息
					this.screenMsg(msg);
				},3000)
			},
			
			// 添加文字消息到列表
			addTextMsg(msg){
				this.msgList.push(msg);
			}
		}
	}
</script>
<style lang="scss">
	page{
		background-color: #e5e5e5;
	}

	.input-box{
		width: 100%;
		min-height: 100upx;
		padding: 0 1%;
		background-color: #f2f2f2;
		display: flex;
		position: fixed;
		z-index: 20;
		bottom:-2upx;

		transition: all .15s linear;
		border-bottom: solid 1upx #ddd;
		
		.send{
			//H5发送按钮左边距
			/* #ifdef H5 */
			margin-left: 20upx;
			/* #endif */
			flex-shrink: 0;
			width: 100upx;
			height: 100upx;
			display: flex;
			align-items: center;
			.btn{
				width: 90upx;
				height: 56upx;
				display: flex;
				justify-content: center;
				align-items: center;
				background:linear-gradient(to right,#f09b37,#eb632c);
				color: #fff;
				border-radius: 6upx;
				font-size: 24upx;
			}
		}
		.textbox{
			width: 100%;
			min-height: 70upx;
			margin-top: 15upx;

			.text-mode{
				width: 100%;
				min-height: 70upx;
				display: flex;
				background-color: #fff;
				border-radius: 40upx;
				.box{
					width: 100%;
					padding-left: 30upx;
					min-height: 70upx;
					display: flex;
					align-items: center;
					textarea{
						width: 100%;
					}
				}
			}
		}
	}
	.content{
		width: 100%;
		.msg-list{
			width: 96%;
			padding: 0 2%;
			position: absolute;
			top: 0;
			bottom: 100upx;
			.loading{
				//loading动画
				display: flex;
				justify-content: center;
				@keyframes stretchdelay {
					0%, 40%, 100% {
						transform: scaleY(0.6);
					}
					20% {
						transform: scaleY(1.0);
					}
				}
				.spinner {
					margin: 20upx 0;
					width: 60upx;
					height: 100upx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					view {
						background-color: #f06c7a;
						height: 50upx;
						width: 6upx;
						border-radius: 6upx;
						animation: stretchdelay 1.2s infinite ease-in-out;
					}
					.rect2 {
					  animation-delay: -1.1s;
					}
					.rect3 {
					  animation-delay: -1.0s;
					}
					.rect4 {
					  animation-delay: -0.9s;
					}
					.rect5 {
					  animation-delay: -0.8s;
					}
				}
			}
			.row{
				&:first-child{
					margin-top: 20upx;
				}
				padding: 20upx 0;
				.my .left,.other .right{
					width: 100%;
					display: flex;
					.bubble{
						max-width: 70%;
						min-height: 50upx;
						border-radius: 10upx;
						padding: 15upx 20upx;
						display: flex;
						align-items: center;
						font-size: 32upx;
						word-break: break-word;
					}
				}
				.my .right,.other .left{
					flex-shrink: 0;
					width: 80upx;
					height: 80upx;
					image{
						width: 80upx;
						height: 80upx;
						border-radius: 10upx;
					}
				}
				.my{
					width: 100%;
					display: flex;
					justify-content: flex-end;
					.left{
						min-height: 80upx;
						
						align-items: center;
						justify-content: flex-end;
						.bubble{
							background-color: #f06c7a;
							color: #fff;
						}
					}
					.right{
						margin-left: 15upx;
					}
				}
				.other{
					width: 100%;
					display: flex;
					.left{
						margin-right: 15upx;
					}
					.right{
						flex-wrap: wrap;
						.username{
							width: 100%;
							height: 45upx;
							font-size: 24upx;
							color: #999;
							display: flex;
							.name{
								margin-right: 50upx;
							}
						}
						.bubble{
							background-color: #fff;
							color: #333;
						}
					}
				}
			}
		}
	}
</style>