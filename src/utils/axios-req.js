import axios from 'axios'
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
import { useBasicStore } from '@/store/basic'
import { RefreshTokenReq } from '@/api/refreshToken'
//使用axios.create()创建一个axios请求实例
const service = axios.create({
  baseURL: import.meta.env.VITE_PROXY_BASE_URL,
  headers: {
    // Authorization: 'Bearer ' +  localStorage.getItem('basic')
  }
})
console.log(import.meta.env.VITE_PROXY_BASE_URL, '------------')
let loadingInstance = null //loading实例
let tempReqUrlSave = ''
let authorTipDoor = true

const noAuthDill = () => {
  authorTipDoor = false
  ElMessageBox.confirm('请重新登录', {
    confirmButtonText: '重新登录',
    closeOnClickModal: false,
    showCancelButton: false,
    showClose: false,
    type: 'warning'
  }).then(() => {
    useBasicStore().resetStateAndToLogin()
    authorTipDoor = true
  })
}

//请求前拦截
service.interceptors.request.use(
  (req) => {
    const { token, axiosPromiseArr } = useBasicStore()
    //axiosPromiseArr收集请求地址,用于取消请求
    req.cancelToken = new axios.CancelToken((cancel) => {
      tempReqUrlSave = req.url
      axiosPromiseArr.push({
        url: req.url,
        cancel
      })
    })

    //设置token到header
    if (token) req.headers['Authorization'] = `Bearer ${  token}`
    //如果req.method给get 请求参数设置为 ?name=xxx
    if ('get'.includes(req.method?.toLowerCase()) && !req.params) req.params = req.data

    //req loading
    // @ts-ignore
    if (req.reqLoading ?? true) {
      loadingInstance = ElLoading.service({
        lock: true,
        fullscreen: true,
        // spinner: 'CircleCheck',
        text: '数据载入中...',
        background: 'rgba(0, 0, 0, 0.1)'
      })
    }
    return req
  },
  (err) => {
    //发送请求失败
    Promise.reject(err)
  }
)
let resList
//请求后拦截
service.interceptors.response.use(
  (res) => {
    resList = res
    //取消请求
    useBasicStore().remotePromiseArrByReqUrl(tempReqUrlSave)
    if (loadingInstance) {
      loadingInstance && loadingInstance.close()
    }
    console.log(res.data, 'res.data')
    //download file
    // if (res.data?.type?.includes('sheet')) {
    //   return res
    // }
    const { codeStatus, message } = res.data
    const successCode = [0, 200, 20000]
    const noAuthCode = [401, 403]
    if (successCode.includes(codeStatus)) {
      return res.data
    } else {
      //authorTipDoor 防止多个请求 多次alter
      if (authorTipDoor) {
        if (noAuthCode.includes(codeStatus)) {
          noAuthDill()
        } else {
          // @ts-ignore
          if (!res.config?.isNotTipErrorMsg) {
            ElMessage.error({
              message,
              duration: 2 * 1000
            })
          } else {
            return res
          }
          return Promise.reject(message)
        }
      }
    }
  },
  //响应报错
  async (err) => {
    //取消请求
    useBasicStore().remotePromiseArrByReqUrl(tempReqUrlSave)
    if (loadingInstance) {
      loadingInstance && loadingInstance.close()
    }
    if (err.response) {
      const { codeStatus, message } = err.response.data
      console.log(err.response, codeStatus, 'codeStatus')
      if (codeStatus === 401) {
        console.log('401')
        // noAuthDill()
        useBasicStore().setToken('')
        return RefreshTokenReq().then(
          async (res) => {
            const originalRequest = err.config;
            console.log(res, res.data.data.accessToken, 'res')
            useBasicStore().setToken(res.data.data.accessToken)
            //重新请求
            console.log(resList, 'resList')
            return service.request(originalRequest)
        }
        ).catch(
          (err) => {
            console.log(err, 'err')
            noAuthDill()
          })

      } else if (codeStatus === 403) {
        ElMessage.error({
          message,
          duration: 2 * 1000
        })
      } else {
        ElMessage.error({
          message: message || '请求失败',
          duration: 2 * 1000
        })
      }
    } else {
      ElMessage.error({
        message: err.message || '请求失败',
        duration: 2 * 1000
      })
    }
    return Promise.reject(err)
  }
)
//导出service实例给页面调用 , config->页面的配置
export default function axiosReq(config) {
  return service({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    timeout: 8000,
    ...config
  })
}
