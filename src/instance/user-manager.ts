import { UpdatePassword } from '../pages/modify-password/ModifyPassword'
import axiosInstance from './request'
import { UserInfo } from './types'

export const requestGetUserList = (params: {
  username?: string
  nickName?: string
  email?: string
  pageSize: number
  pageNo: number
}) => {
  return axiosInstance.get('/user/list', { params })
}

export const freezeUser = async (userId: number) => await axiosInstance.get('/user/freeze', { params: { id: userId } })

export async function requestGetUserInfo() {
  return await axiosInstance.get('/user/info')
}

export async function updateUserInfo(userInfo: UserInfo) {
  return await axiosInstance.post('/user/admin/update', userInfo)
}

export async function getUpdateCaptcha(address: string) {
  return await axiosInstance.get('/user/update/captcha', { params: { address } })
}

export async function getUpdatePasswordCaptcha(address: string) {
  return await axiosInstance.get('/user/update_password/captcha', { params: { address } })
}

export async function updatePassword(data: UpdatePassword) {
  return await axiosInstance.post('/user/admin/update_password', data)
}
