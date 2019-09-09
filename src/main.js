import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './routes'
import 'font-awesome/css/font-awesome.min.css'
import store from './vuex/store'
import './assets/icon/iconfont.css'
import Viewer from 'v-viewer'
Vue.use(Viewer)
// import Router from 'vue-router'
// import Vuex from 'vuex'

// import Mock from './mock'
// Mock.bootstrap()
Vue.use(ElementUI)
// Vue.use(Vuex)


router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    sessionStorage.removeItem('user')
  }
  let user = JSON.parse(sessionStorage.getItem('user'))
  if (!user && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})
const v = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

console.log(v.$router.options.routes)
