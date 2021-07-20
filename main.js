import Vue from 'vue'
import App from './App'

// 引入并挂载 vuex
import store from '@/common/store'
Vue.prototype.$store = store

import {http} from '@/common/http/http.js'
Vue.prototype.$http = http

Vue.config.productionTip = false

App.mpType = 'app'
import "./static/css/iconfont/iconfont.css"
const app = new Vue({
    ...App,
    store
})
app.$mount()
