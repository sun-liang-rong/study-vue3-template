import axiosReq from '../utils/axios-req'
// export const userInfoReq = (): Promise<any> => {
//   return new Promise((resolve) => {
//     const reqConfig = {
//       url: '/basis-func/user/getUserInfo',
//       params: { plateFormId: 2 },
//       method: 'post'
//     }
//     axiosReq(reqConfig).then(({ data }) => {
//       resolve(data)
//     })
//   })
// }

//登录
export const loginReq = (subForm) => {
  return axiosReq({
    url: '/auth/login',
    data: subForm,
    method: 'post'
  })
}

//退出登录
export const loginOutReq = () => {
  return axiosReq({
    url: '/mock/loginOut',
    method: 'post'
  })
}

//添加角色

export const getRole = (data) => {
  return axiosReq({
    url: '/user/getRole',
    method: 'post',
    data
  })
}

export const addRole = (data) => {
  return axiosReq({
    url: '/user/addRole',
    method: 'post',
    data
  })
}

export const userList = () => {
  return axiosReq({
    url: '/user/userList',
    method: 'post'
  })
}
//获取所有角色
export const getRoleList = () => {
  return axiosReq({
    url: '/user/getAllRole',
    method: 'post'
  })
}
//往用户身上添加角色
export const addUserRole = (data) => {
  return axiosReq({
    url: '/user/addUserRole',
    method: 'post',
    data
  })
}