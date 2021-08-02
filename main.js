import Vue from 'vue'
import App from './App'
//封装弹框的方法
uni.$showMsg = function(title = "数据请求失败！",duration = 1500){
  uni.showToast({
    title,
    duration,
    icon :'none'
  })
}
// 引入并挂载 vuex
import store from '@/common/store'
Vue.prototype.$store = store
Vue.filter(
  "formatPrice",(data) => {
    return data.toFixed(2)
  }
)
import http from '@/common/http/http.js'

Vue.prototype.$http = http

Vue.config.productionTip = false

App.mpType = 'app'
import "./static/css/iconfont/iconfont.css"
const app = new Vue({
    ...App,
    store
})
app.$mount()
