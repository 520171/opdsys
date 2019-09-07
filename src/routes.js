import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      component: () => import('./views/Login.vue'),
      name: '',
      hidden: true,
      meta: {
        title: '登陆'
      }
    },
    {
      path: '/404',
      component: () => import('./views/404.vue'),
      name: '',
      hidden: true
    },
    {
      path: '/',
      component: () => import('./views/Home.vue'),
      name: '员工',
      iconCls: 'el-icon-opdyuangong', // 图标样式class
      children: [
        { path: '/UserList', component: () => import('./views/users/UserList.vue'), name: '员工列表', meta: { title: '员工列表' } },
        { path: '/UserManager', component: () => import('./views/users/UserManager.vue'), name: '员工管理', meta: { title: '员工管理' } }
        // { path: '/form', component: () => import('./views/users/Form.vue'), name: 'Form', hidden: true },
        // { path: '/main', component: () => import('./views/Main.vue'), name: '主页', hidden: true }
      ]
    },
    {
      path: '/',
      component: () => import('./views/Home.vue'),
      name: '部门',
      iconCls: 'el-icon-opdbumen',
      children: [
        { path: '/DepartmentList', component: () => import('./views/departments/DepartmentList.vue'), name: '部门列表', meta: { title: '部门列表' } },
        { path: '/DepartmentManager', component: () => import('./views/departments/DepartmentManager.vue'), name: '部门管理', meta: { title: '部门管理' } }
      ]
    },
    {
      path: '/',
      component: () => import('./views/Home.vue'),
      name: '报修记录',
      iconCls: 'el-icon-opdbaoxiujilu',
      leaf: false,
      children: [
        { path: '/RepairList', component: () => import('./views/repair/RepairList.vue'), name: '报修记录列表', meta: { title: '报修记录列表' } },
        { path: '/RepairManager', component: () => import('./views/repair/RepairManager.vue'), name: '报修记录管理', meta: { title: '报修记录管理' } }
      ]
    },
    {
      path: '/',
      component: () => import('./views/Home.vue'),
      name: 'Charts',
      iconCls: 'fa fa-bar-chart',
      children: [
        { path: '/echarts', component: () => import('./views/charts/echarts.vue'), name: 'echarts' }
      ]
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    }
  ]
})

// 设置页面title
router.beforeEach((to, from, next) => {
  const i = to.matched.length === 1 ? 0 : 1
  document.title = to.matched[i].meta.title
  next()
})

export default router
