import axios from 'axios'
//const base = ''
const base = 'http://www.opdgr.cn'

///////////////////////登陆////////////////////////////
export const requestLogin = params => {
  return axios.post(`/api/login`, params).then(res => res.data)
}

// /////////////////////////用户管理///////////////////////////
export const getUserListPage = params => {
  console.log(params)
  const ret = axios.post(`/api/listpage`, { params: params })
  console.log(ret)
  return ret
}

export const addUser = params => {
  console.log(params)
  const ret = axios.post(`/api/addUser`, { params: params })
  console.log(ret)
  return ret
}

// 删除员工
export const removeUsers = params => {
  console.log(params)
  const ret = axios.post(`/api/removeUsers`, { params: params })
  console.log(ret)
  return ret
}

export const editUser = params => {
  console.log(params)
  const ret = axios.post(`/api/updateUser`, { params: params })
  console.log(ret)
  return ret
}

// //////////////////////////////////////////////////////部门管理//////////////////////////////////////////////////////////////////////
export const getDepartmentListPage = params => {
  console.log(params)
  const ret = axios.post(`/api/listdepartment`, { params: params })
  console.log(ret)
  return ret
}

export const addDepartment = params => {
  console.log(params)
  const ret = axios.post(`/api/addDepartment`, { params: params })
  console.log(ret)
  return ret
}

export const removeDepartments = params => {
  console.log(params)
  const ret = axios.post(`/api/removeDepartment`, { params: params })
  console.log(ret)
  return ret
}

export const updateDepartment = params => {
  console.log(params)
  const ret = axios.post(`/api/updateDepartment`, { params: params })
  console.log(ret)
  return ret
}

// /////////////////////////////////////////报修管理////////////////////////////////////////////////
export const getServiceListPage = params => {
  console.log(params)
  const ret = axios.post(`/api/listService`, { params: params })
  console.log(ret)
  return ret
}

export const removeRepairs = params => {
  console.log(params)
  const ret = axios.post(`/api/removeRepairs`, { params: params })
  console.log(ret)
  return ret
}

// 获取附件信息
export const getAnnexes = sid => {
  console.log(sid)
  const ret = axios.post(`/api/users/getAnnex`, { sid: sid })
  console.log(ret)
  return ret
}

// // ///////////////////////登陆////////////////////////////
// export const requestLogin = params => {
//   return axios.post(`${base}/login`, params).then(res => res.data)
// }
//
// // /////////////////////////用户管理///////////////////////////
// export const getUserListPage = params => {
//   console.log(params)
//   const ret = axios.post(`${base}/listpage`, { params: params })
//   console.log(ret)
//   return ret
// }
//
// export const addUser = params => {
//   console.log(params)
//   const ret = axios.post(`${base}/addUser`, { params: params })
//   console.log(ret)
//   return ret
// }
//
// // 删除员工
// export const removeUsers = params => {
//   console.log(params)
//   const ret = axios.post(`${base}/removeUsers`, { params: params })
//   console.log(ret)
//   return ret
// }
//
// export const editUser = params => {
//   console.log(params)
//   const ret = axios.post(`${base}/updateUser`, { params: params })
//   console.log(ret)
//   return ret
// }
//
// // //////////////////////////////////////////////////////部门管理//////////////////////////////////////////////////////////////////////
// export const getDepartmentListPage = params => {
//   console.log(params)
//   const ret = axios.post(`${base}/listdepartment`, { params: params })
//   console.log(ret)
//   return ret
// }
//
// export const addDepartment = params => {
//   console.log(params)
//   const ret = axios.post(`${base}/addDepartment`, { params: params })
//   console.log(ret)
//   return ret
// }
//
// export const removeDepartments = params => {
//   console.log(params)
//   const ret = axios.post(`${base}/removeDepartment`, { params: params })
//   console.log(ret)
//   return ret
// }
//
// export const updateDepartment = params => {
//   console.log(params)
//   const ret = axios.post(`${base}/updateDepartment`, { params: params })
//   console.log(ret)
//   return ret
// }
//
// // /////////////////////////////////////////报修管理////////////////////////////////////////////////
// export const getServiceListPage = params => {
//   console.log(params)
//   const ret = axios.post(`${base}/listService`, { params: params })
//   console.log(ret)
//   return ret
// }
//
// export const removeRepairs = params => {
//   console.log(params)
//   const ret = axios.post(`${base}/removeRepairs`, { params: params })
//   console.log(ret)
//   return ret
// }
//
// // 获取附件信息
// export const getAnnexes = sid => {
//   console.log(sid)
//   const ret = axios.post(`${base}/users/getAnnex`, { sid: sid })
//   console.log(ret)
//   return ret
// }
