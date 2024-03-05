import axiosInstance from './request'

const baseUrl = `/user/admin`

export const login = async (username: string, password: string) => {
  return await axiosInstance.post(baseUrl + '/login', { username, password })
}

export const refreshToken = async () => {
  const response = await axiosInstance.get(baseUrl + '/refresh', {
    params: { refreshToken: localStorage.getItem('refresh_token') || '' },
  })
  if (response.status === 200 || response.status === 201) {
    const { data } = response.data
    localStorage.setItem('access_token', data?.access_token || '')
    localStorage.setItem('refresh_token', data?.refresh_token || '')
  } else {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }

  return response
}
