import axios from 'axios'
import router from '../routes'
//const base = ''
// const base = 'http://26n770e487.zicp.vip'
axios.defaults.withCredentials = true; //每次请求，无论是否跨域，都带上cookie信息
const instance = axios.create({})

// instance.defaults.baseURL='https://www.opdgr.cn'
instance.defaults.baseURL='api'

instance.interceptors.request.use(config => {
  config.headers.authorization  = localStorage.getItem('Authorization')
  return config
}, error => Promise.reject(error) )

instance.interceptors.response.use(response => {
  // 解密响应携带的payload数据
  return response
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        localStorage.removeItem('Authorization')
        router.replace('/login')
        break
    }
  }
  return Promise.reject(error)
})

///////////////////////登陆////////////////////////////
export const requestLogin = params => {
  return instance.post('/login', params).then(res => res.data)
}

/////////////////////////用户管理///////////////////////////
export const getUserListPage = params => {
  // console.log(params)
  const ret = instance.post('/listpage', { params: params })
  // console.log(ret)
  return ret
}

export const addUser = params => {
  // console.log(params)
  const ret = instance.post('/addUser', { params: params })
  // console.log(ret)
  return ret
}

// 删除员工
export const removeUsers = params => {
  // console.log(params)
  const ret = instance.post('/removeUsers', { params: params })
  // console.log(ret)
  return ret
}

export const editUser = params => {
  // console.log(params)
  const ret = instance.post('/updateUser', { params: params })
  // console.log(ret)
  return ret
}
//////////////////////////////////////////////////////部门管理//////////////////////////////////////////////////////////////////////
export const getDepartmentListPage = params => {
  // console.log(params)
  const ret = instance.post('/listdepartment', { params: params })
  // console.log(ret)
  return ret
}

export const addDepartment = params => {
  // console.log(params)
  const ret = instance.post('/addDepartment', { params: params })
  // console.log(ret)
  return ret
}

export const removeDepartments = params => {
  // console.log(params)
  const ret = instance.post('/removeDepartment', { params: params })
  // console.log(ret)
  return ret
}

export const updateDepartment = params => {
  // console.log(params)
  const ret = instance.post('/updateDepartment', { params: params })
  // console.log(ret)
  return ret
}

// /////////////////////////////////////////报修管理////////////////////////////////////////////////
export const getServiceListPage = params => {
  // console.log(params)
  const ret = instance.post('/listService', { params: params })
  // console.log(ret)
  return ret
}

export const removeRepairs = params => {
  // console.log(params)
  const ret = instance.post('/removeRepairs', { params: params })
  // console.log(ret)
  return ret
}

// 获取附件信息
export const getAnnexes = sid => {
  // console.log(sid)
  const ret = instance.post('/users/getAnnex', { sid: sid })
  // console.log(ret)
  return ret
}
// //////////////////////////////////////获取统计数据/////////////////
export const showStatistics = () =>{
  const ret = instance.post('/showStatistics')
  // console.log(ret)
  return ret
}
// 获取报修码
export const showQRCode = params => {
  const ret = instance.post('/showQRCode', { params: params })
  return ret
}
// 获取报表数据
export const  showExcelData = params => {
  const ret = instance.post('/showExcelData', { params: params })
  return ret
}
