import Vue from 'vue'
import App from './App'
import ELEMENT from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './routes'
import 'font-awesome/css/font-awesome.min.css'
import store from './vuex/store'
import './assets/icon/iconfont.css'

Vue.use(ELEMENT)

router.beforeEach(function (to, from, next) {
  if ('/login' === to.path) {
    next()
  } else {
    if (localStorage.getItem('Authorization')) {
      // console.log(localStorage.getItem('Authorization'))
      next()
    } else {
      next('/login')
    }
  }
})

router.beforeEach((to, from, next) => {
  const i = to.matched.length === 1 ? 0 : 1
  document.title = to.matched[i].meta.title
  next()
})

const v = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
