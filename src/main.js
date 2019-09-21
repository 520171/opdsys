import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './routes'
import 'font-awesome/css/font-awesome.min.css'
import store from './vuex/store'
import './assets/icon/iconfont.css'
import Viewer from 'v-viewer'
import {requestAutoLogin} from './api/api'
import VueCookies from 'vue-cookies'

Vue.use(Viewer)
// import Router from 'vue-router'
// import Vuex from 'vuex'

// import Mock from './mock'
// Mock.bootstrap()
Vue.use(ElementUI)
// Vue.use(Vuex)

Vue.use(VueCookies)

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else if (to.path === '/404'){
    next()
  } else {
    if(sessionStorage.getItem('user')){
      next()
    }else{
      requestAutoLogin()
        .then(msg => {
          if(200 == msg.code){
            sessionStorage.setItem('user', JSON.stringify(msg))
            next()
          } else {
            next({ path: '/login' })
          }
        })
        .catch(err => {
          console.log(err)
          next({ path: '/login' })
        })
    }
  }
})
const v = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

console.log(v.$router.options.routes)
