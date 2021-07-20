import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    tabBarCenterMaxWidth:0,
    tabBarHeight:0,
    address:"",
    positionList:[]
  },
  mutations: {
    setTabBarCenterMaxWidth(state,num) {
      state.tabBarCenterMaxWidth = num
    },
    setTabBarHeight(state,num) {
      state.tabBarHeight = num
    },
    setAddress(state,address) {
      console.log("set address: "+ address)
      state.address = address
    },
    setPositionList(state,positionList) {
      state.positionList = positionList
    }
  }
})
export default store