import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router.js'
import mintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import http from './http.js'
import VuePreview from 'vue-preview'
//导入时间插件
import moment from 'moment'

Vue.use(Vuex)
Vue.use(mintUI);
Vue.use(VuePreview)
Vue.filter("dataFormat", function (dataStr, pattren = "YYYY-MM-DD hh:mm:ss") {
  return moment(dataStr).format(pattren)
})
Vue.prototype.$http = http

const store = new Vuex.Store({
  state: {
    car: JSON.parse(localStorage.getItem('car') || '[]')
  },
  mutations: {
    addToCar(state, obj) {
      let flag = false
      state.car.some(item => {
        //{id:商品的ID,count:数量，price:商品单价，selected:false}
        if (item.id == obj.id) {
          item.count += parseInt(obj.count)
          flag = true
          return true
        }
      })

      if (!flag) {
        state.car.push(obj)
      }
      localStorage.setItem('car', JSON.stringify(state.car))

    },
    updateToCar(state, obj) {
      state.car.forEach(item => {
        if (item.id == obj.id) {
          item.count = parseInt(obj.count)
          return true
        }
      })

    },
    removeCarById(state, id) {
      state.car.some((item, index) => {
        if (item.id == id) {
          state.car.splice(index, 1)
          return true;
        }
      })
      //删除完毕后，最新的购物车数据更新到本地
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateCarSelect(state, obj) {
      state.car.some(item => {
        if (item.id == obj.id) {
          item.selected = obj.selected
        }
      })
      // 把最新数据放到本地存储
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {
    getAllCount(state) {
      let c = 0
      if (state.car.length > 0) {
        state.car.forEach(item => {
          c += item.count
        })
      }
      return c;
    },
    getGoodsCount(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o;
    },
    getGoodsSelect(state) {
      var o = {};
      state.car.forEach(item => {
        o[item.id] = item.selected
      })

      return o;

    },
    getCarCountAndAmound(state) {
      var o = {
        count: 0,
        amount: 0
      }
      state.car.forEach(item => {
        if (item.selected) {
          o.count += item.count
          o.amount += item.count * item.price
        }
      })
      return o;
    }

  }
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
