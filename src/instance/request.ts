import axios from 'axios'
import { refreshToken } from './login'
import { message } from 'antd'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3300/',
  timeout: 5000,
})

axiosInstance.interceptors.request.use((config) => {
  const accssToken = localStorage.getItem('access_token')
  if (accssToken && accssToken !== 'undefined') {
    config.headers.authorization = 'Bearer ' + accssToken
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (!error.response) {
      return Promise.reject(error)
    }
    const { data, config } = error.response
    if (data && data.code === 401) {
      const res = await refreshToken()
      if (res.status === 200) {
        return axiosInstance(config)
      }
      message.error(res.data)
      setTimeout(() => {
        window.location.href = '/login'
      }, 1500)
    }
    return error.response
  },
)

export default axiosInstance
