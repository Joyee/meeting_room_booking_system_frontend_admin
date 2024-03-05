import { CreateMeetingRoom } from '../pages/meeting-room-manage/CreateMeetingRoomModal'
import { UpdateMeetingRoom } from '../pages/meeting-room-manage/UpdateMeetingRoomModal'
import axiosInstance from './request'

const baseUrl = '/meeting-room'

export interface SearchMeetingRoom {
  pageNo?: number
  pageSize?: number
  name?: string
  location?: string
  capacity?: string
  equipment?: string
}

export const getMeetingRoomList = async (params: SearchMeetingRoom) => {
  return await axiosInstance.get(baseUrl + '/list', { params })
}

export const deleteMeetingRoom = async (id: number) => await axiosInstance.delete(baseUrl + '/' + id)

export const createMeetingRoom = async (data: CreateMeetingRoom) => await axiosInstance.post(baseUrl + '/create', data)

export const updateMeetingRoom = async (data: UpdateMeetingRoom) => await axiosInstance.post(baseUrl + '/update', data)

export const getMeetingRoomInfo = async (id: number) => await axiosInstance.get(baseUrl + '/' + id)
