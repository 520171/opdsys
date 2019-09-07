import axios from 'axios'
const base = ''
// const base = 'http://www.opdgr.cn:8000'

// ///////////////////////登陆////////////////////////////
export const requestLogin = params => {
  return axios.post(`/api/login`, params).then(res => res.data)
}

// export const requestLogin = params => {
//   return axios.post(`${base}/login`, params).then(res => res.data)
// }
// export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }) }

// export const removeUser = params => {
//   console.log(params)
//  const ret = axios.get(`${base}/user/listpage`, { params: params })
//   console.log(ret)
//   return ret
// }
//
// export const batchRemoveUser = params => {
//   console.log(params)
//   const ret = axios.get(`${base}/user/listpage`, { params: params })
//   console.log(ret)
//   return ret
// }
//
// export const editUser = params => {
//   console.log(params)
//   const ret = axios.get(`${base}/user/listpage`, { params: params })
//   console.log(ret)
//   return ret
// }
//

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

//
// export const requestLogin = params => {
//   return axios.post(`${base}/login`, params).then(res => res.data)
// }
//
// export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }) }
//
// export const getUserListPage = params => {
//   console.log(params)
//   const ret = axios.get(`${base}/user/listpage`, { params: params })
//   console.log(ret)
//   return ret
// }
//
// export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }) }
//
// export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }) }
//
// export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }) }
//
// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }) }

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
