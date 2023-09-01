import axiosReq from '../utils/axios-req'
//添加访问量
export const addInterviewReq = (subForm) => {
  return axiosReq({
    url: '/interview/addInterview',
    data: subForm,
    method: 'post'
  })
}

//获取某一天访问量
export const getOneDatReq = (subForm) => {
  return axiosReq({
    url: '/interview/getoneday',
    data: subForm,
    method: 'post'
  })
}
//获取所有的访问量getallday
export const getAllReq = (subForm) => {
  return axiosReq({
    url: '/interview/getallday',
    data: subForm,
    method: 'post'
  })
}