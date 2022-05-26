// Additional polyfills
import 'custom-event-polyfill'
import 'url-polyfill'
import VueLoading from 'vuejs-loading-plugin'
import Vue from 'vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import bFormSlider from 'vue-bootstrap-slider';
import globals from './globals'
import Popper from 'popper.js'
import Vuex from 'vuex'
import axios from 'axios'
import IdleVue from 'idle-vue'
import IconCrypto from "vue-cryptocurrency-icons";
import SortedTablePlugin from "vue-sorted-table";


axios.defaults.baseURL = 'https://caitex.net/api/v1/'

// Required to enable animations on dropdowns/tooltips/popovers
Popper.Defaults.modifiers.computeStyle.gpuAcceleration = false

Vue.config.productionTip = false

Vue.use(VueLoading , {
  text: 'لطفا کمی صبر کنید', 
  background: 'rgba(0,0,0,0.5)',
})
Vue.use(Antd);
Vue.use(BootstrapVue)
Vue.use(bFormSlider)
Vue.use(Vuex)
Vue.use(IconCrypto);
Vue.use(SortedTablePlugin);
Vue.use(VueSweetalert2)

const store = new Vuex.Store({
  state: {
    brands: [''],
    amount: [0],
    dark: false,
    farsi: true,
    rtl: false
  },
  mutations: {
    initializeStore (state) {
      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
        state.isAuthenticated = true
      } else {
        state.token = ''
        state.isAuthenticated = false
      }
      if (localStorage.getItem('admin')) {
        state.Admin = localStorage.getItem('admin')
        state.isAdmin = true
      } else {
        state.Admin = ''
        state.isAdmin = false
      }
      if (localStorage.getItem('dark')) {
        state.dark = localStorage.getItem('dark')
      } else {
        state.dark = false
      }
      if (localStorage.getItem('rtl')) {
        state.rtl = localStorage.getItem('rtl')
      } else {
        state.rtl = false
      }
    },
    setToken (state, token) {
      state.token = token
      state.isAuthenticated = true
    },
    setrtl (state, rtl) {
      state.rtl = rtl
    },
    clearbrands (state) {
      state.brands = []
      state.amount = []
    },
    appendbrands (state, brand) {
      state.brands.push(brand)
    },
    appendamount (state, amount) {
      state.amount.push(amount)
    },
    setAdmin (state, admin) {
      state.Admin = admin
      state.isAdmin = true
    },
    removeToken (state) {
      state.token = ''
      state.isAuthenticated = false
    },
    removeAdmin (state) {
      state.Admin = ''
      state.isAdmin = false
    },
  },
  actions: {
  },
  modules: {
  }
})

const eventsHub = new Vue()

Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  store,
  idleTime: 9000000,
  startAtIdle: false
})

// Global RTL flag
Vue.mixin({
  data: globals
})

new Vue({
  router,
  store,
  render: h => h(App)
})
  .$mount('#app')
export{
  store
}