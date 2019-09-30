import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      component: resolve => require(['./views/Login.vue'], resolve),
      name: '',
      hidden: true,
      meta: {
        title: '登陆'
      }
    },
    {
      path: '/404',
      component: resolve => require(['./views/404.vue'], resolve),
      name: '',
      hidden: true
    },
    {
      path: '/',
      component: resolve => require(['./views/Home.vue'], resolve),
      name: '报修记录',
      iconCls: 'el-icon-opdbaoxiujilu',
      leaf: false,
      redirect: '/RepairList',
      children: [
        { path: '/RepairList', component: resolve => require(['./views/repair/RepairList.vue'], resolve), name: '报修记录列表', meta: { title: '报修记录列表' } },
        { path: '/RepairManager', component: resolve => require(['./views/repair/RepairManager.vue'], resolve), name: '报修记录管理', meta: { title: '报修记录管理' } }
      ]
    },
    {
      path: '/',
      component: () => import('./views/Home.vue'),
      name: '员工',
      iconCls: 'el-icon-opdyuangong', // 图标样式class
      redirect: '/UserList',
      children: [
        { path: '/UserList', component: resolve => require(['./views/users/UserList.vue'], resolve), name: '员工列表', meta: { title: '员工列表' } },
        { path: '/UserManager', component: resolve => require(['./views/users/UserManager.vue'], resolve), name: '员工管理', meta: { title: '员工管理' } }
        // { path: '/form', component: () => import('./views/users/Form.vue'), name: 'Form', hidden: true },
        // { path: '/main', component: () => import('./views/Main.vue'), name: '主页', hidden: true }
      ]
    },
    {
      path: '/',
      component: () => import('./views/Home.vue'),
      name: '部门',
      iconCls: 'el-icon-opdbumen',
      redirect: '/DepartmentList',
      children: [
        { path: '/DepartmentList', component: resolve => require(['./views/departments/DepartmentList.vue'], resolve), name: '部门列表', meta: { title: '部门列表' } },
        { path: '/DepartmentManager', component: resolve => require(['./views/departments/DepartmentManager.vue'], resolve), name: '部门管理', meta: { title: '部门管理' } }
      ]
    },
    {
      path: '/',
      component: () => import('./views/Home.vue'),
      name: '统计',
      iconCls: 'fa fa-bar-chart',
      redirect: '/echarts',
      children: [
        { path: '/echarts', component: resolve => require(['./views/charts/echarts.vue'], resolve), name: '数据分析', meta: { title: '数据分析' } }
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
