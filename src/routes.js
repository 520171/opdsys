import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router)
const home = () => import('./views/Home')
const repairList = () => import('./views/repair/RepairList')
const repairManager = () => import('./views/repair/RepairManager')
const login = () => import('./views/Login')
const userList = () => import( /* webpackChunkName: "about" */ './views/users/UserList')
const userManager =  () => import( /* webpackChunkName: "about" */ './views/users/UserManager')
const echarts = () => import( /* webpackChunkName: "about" */ './views/charts/echarts')
const departmentList = () => import( /* webpackChunkName: "about" */ './views/departments/DepartmentList')
const departmentManager = () => import( /* webpackChunkName: "about" */ './views/departments/DepartmentManager')
const err404 = () => import( /* webpackChunkName: "about" */ './views/404')

// const home = resolve => require(['./views/Home'], resolve)
// const repairList = resolve => require(['./views/repair/RepairList'], resolve)
// const repairManager = resolve => require(['./views/repair/RepairManager'], resolve)
// const login = resolve => require(['./views/Login'], resolve)
// const userList = resolve => require(['./views/users/UserList'], resolve)
// const userManager = resolve => require(['./views/users/UserManager'], resolve)
// const echarts = resolve => require(['./views/charts/echarts'], resolve)
// const departmentList = resolve => require(['./views/departments/DepartmentList'], resolve)
// const departmentManager = resolve => require(['./views/departments/DepartmentManager'], resolve)
// const err404 = resolve => require(['./views/404'], resolve)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      component: login,
      name: '',
      hidden: true,
      meta: {
        title: '登陆'
      }
    },
    {
      path: '/',
      component: home,
      name: '报修记录',
      iconCls: 'el-icon-opdbaoxiujilu',
      leaf: false,
      redirect: '/RepairList',
      children: [
        { path: '/RepairList', component: repairList, name: '报修记录列表', meta: { title: '报修记录列表' } },
        { path: '/RepairManager', component: repairManager, name: '报修记录管理', meta: { title: '报修记录管理' } }
      ]
    },
    {
      path: '/',
      component: home,
      name: '员工',
      iconCls: 'el-icon-opdyuangong', // 图标样式class
      redirect: '/UserList',
      children: [
        { path: '/UserList', component: userList, name: '员工列表', meta: { title: '员工列表' } },
        { path: '/UserManager', component: userManager, name: '员工管理', meta: { title: '员工管理' } }
        // { path: '/form', component: () => import('./views/users/Form.vue'), name: 'Form', hidden: true },
        // { path: '/main', component: () => import('./views/Main.vue'), name: '主页', hidden: true }
      ]
    },
    {
      path: '/',
      component: home,
      name: '部门',
      iconCls: 'el-icon-opdbumen',
      redirect: '/DepartmentList',
      children: [
        { path: '/DepartmentList', component: departmentList, name: '部门列表', meta: { title: '部门列表' } },
        { path: '/DepartmentManager', component: departmentManager, name: '部门管理', meta: { title: '部门管理' } }
      ]
    },
    {
      path: '/',
      component: home,
      name: '统计',
      iconCls: 'fa fa-bar-chart',
      redirect: '/echarts',
      meta: { title: 'opd-欧佩德' } ,
      children: [
        { path: '/echarts', component: echarts, name: '数据分析', meta: { title: '数据分析' } }
      ]
    },
    {
      path: '/404',
      component: err404,
      name: '',
      hidden: true,
      meta: { title: '404' } ,
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    }
  ]
})

