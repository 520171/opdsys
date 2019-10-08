import axios from 'axios'
import router from '../routes'
//const base = ''
// const base = 'http://26n770e487.zicp.vip'
const base = 'https://www.opdgr.cn'
axios.defaults.withCredentials = true; //每次请求，无论是否跨域，都带上cookie信息
const instance = axios.create({})

// ///////////////////登陆////////////////////////////
// export const requestLogin = params => {
//   return instance.post(`/api/login`, params).then(res => res.data)
// }
//
// export const requestAutoLogin = () => {
//   return instance.post(`/api/autoLogin`).then(res => res.data)
// }
//
// // // /////////////////////////用户管理///////////////////////////
// export const getUserListPage = params => {
//   // console.log(params)
//   const ret = instance.post(`/api/listpage`, { params: params })
//   // console.log(ret)
//   return ret
// }
//
// export const addUser = params => {
//   // console.log(params)
//   const ret = instance.post(`/api/addUser`, { params: params })
//   // console.log(ret)
//   return ret
// }
//
// // 删除员工
// export const removeUsers = params => {
//   // console.log(params)
//   const ret = instance.post(`/api/removeUsers`, { params: params })
//   // console.log(ret)
//   return ret
// }
//
// export const editUser = params => {
//   // console.log(params)
//   const ret = instance.post(`/api/updateUser`, { params: params })
//   // console.log(ret)
//   return ret
// }
//
// // //////////////////////////////////////////////////////部门管理//////////////////////////////////////////////////////////////////////
// export const getDepartmentListPage = params => {
//   // console.log(params)
//   const ret = instance.post(`/api/listdepartment`, { params: params })
//   // console.log(ret)
//   return ret
// }
//
// export const addDepartment = params => {
//   // console.log(params)
//   const ret = instance.post(`/api/addDepartment`, { params: params })
//   // console.log(ret)
//   return ret
// }
//
// export const removeDepartments = params => {
//   // console.log(params)
//   const ret = instance.post(`/api/removeDepartment`, { params: params })
//   // console.log(ret)
//   return ret
// }
//
// export const updateDepartment = params => {
//   // console.log(params)
//   const ret = instance.post(`/api/updateDepartment`, { params: params })
//   // console.log(ret)
//   return ret
// }
//
// // /////////////////////////////////////////报修管理////////////////////////////////////////////////
// export const getServiceListPage = params => {
//   // console.log(params)
//   const ret = instance.post(`/api/listService`, { params: params })
//   // console.log(ret)
//   return ret
// }
//
// export const removeRepairs = params => {
//   // console.log(params)
//   const ret = instance.post(`/api/removeRepairs`, { params: params })
//   // console.log(ret)
//   return ret
// }
//
// // 获取附件信息
// export const getAnnexes = sid => {
//   // console.log(sid)
//   const ret = instance.post(`/api/users/getAnnex`, { sid: sid })
//   // console.log(ret)
//   return ret
// }
//
// // 统计数据获取
// export const showStatistics = () =>{
//   const ret = instance.post(`/api/showStatistics`)
//   // console.log(ret)
//   return ret
// }
//
// export const showQRCode = params => {
//   const ret = instance.post(`/api/showQRCode`, { params: params })
//   return ret
// }
//
// // 获取报表数据
// export const  showExcelData = params => {
//   const ret = instance.post(`/api/showExcelData`, { params: params })
//   return ret
// }

///////////////////////登陆////////////////////////////
export const requestLogin = params => {
  return instance.post(`${base}/login`, params).then(res => res.data)
}

export const requestAutoLogin = () => {
  return instance.post(`${base}/autoLogin`).then(res => res.data)
}

// /////////////////////////用户管理///////////////////////////
export const getUserListPage = params => {
  // console.log(params)
  const ret = instance.post(`${base}/listpage`, { params: params })
  // console.log(ret)
  return ret
}

export const addUser = params => {
  // console.log(params)
  const ret = instance.post(`${base}/addUser`, { params: params })
  // console.log(ret)
  return ret
}

// 删除员工
export const removeUsers = params => {
  // console.log(params)
  const ret = instance.post(`${base}/removeUsers`, { params: params })
  // console.log(ret)
  return ret
}

export const editUser = params => {
  // console.log(params)
  const ret = instance.post(`${base}/updateUser`, { params: params })
  // console.log(ret)
  return ret
}

// //////////////////////////////////////////////////////部门管理//////////////////////////////////////////////////////////////////////
export const getDepartmentListPage = params => {
  // console.log(params)
  const ret = instance.post(`${base}/listdepartment`, { params: params })
  // console.log(ret)
  return ret
}

export const addDepartment = params => {
  // console.log(params)
  const ret = instance.post(`${base}/addDepartment`, { params: params })
  // console.log(ret)
  return ret
}

export const removeDepartments = params => {
  // console.log(params)
  const ret = instance.post(`${base}/removeDepartment`, { params: params })
  // console.log(ret)
  return ret
}

export const updateDepartment = params => {
  // console.log(params)
  const ret = instance.post(`${base}/updateDepartment`, { params: params })
  // console.log(ret)
  return ret
}

// /////////////////////////////////////////报修管理////////////////////////////////////////////////
export const getServiceListPage = params => {
  // console.log(params)
  const ret = instance.post(`${base}/listService`, { params: params })
  // console.log(ret)
  return ret
}

export const removeRepairs = params => {
  // console.log(params)
  const ret = instance.post(`${base}/removeRepairs`, { params: params })
  // console.log(ret)
  return ret
}

// 获取附件信息
export const getAnnexes = sid => {
  // console.log(sid)
  const ret = instance.post(`${base}/users/getAnnex`, { sid: sid })
  // console.log(ret)
  return ret
}
// //////////////////////////////////////获取统计数据/////////////////
export const showStatistics = () =>{
  const ret = instance.post(`${base}/showStatistics`)
  // console.log(ret)
  return ret
}
// 获取报修码
export const showQRCode = params => {
  const ret = instance.post(`${base}/showQRCode`, { params: params })
  return ret
}
// 获取报表数据
export const  showExcelData = params => {
  const ret = instance.post(`${base}/showExcelData`, { params: params })
  return ret
}

