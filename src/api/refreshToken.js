import axios from 'axios'
import { useBasicStore } from "../store/basic";
export const  RefreshTokenReq = () => {
  const { refreshToken } = useBasicStore();
  console.log(refreshToken, 'refreshToken----')
  // useBasicStore().setToken(refreshToken)
  return axios({
    url: '/auth/refreshToken',
    method: 'post',
    baseURL: import.meta.env.VITE_PROXY_BASE_URL,
    headers: {
      Authorization: 'Bearer ' + refreshToken
    }
  })
}