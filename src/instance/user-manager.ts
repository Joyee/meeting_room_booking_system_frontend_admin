import axiosInstance from './request'

export const requestGetUserList = (params: {
  username?: string
  nickName?: string
  email?: string
  pageSize: number
  pageNo: number
}) => {
  return axiosInstance.get('/user/list', { params })
}

export const freezeUser = (userId: number) => axiosInstance.get('/user/freeze', { params: { id: userId } })
