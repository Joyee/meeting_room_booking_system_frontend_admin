export interface UserInfo {
  username: string
  headPic?: string
  nickName?: string
  email?: string
  captcha: string
}

export interface MeetingRoomItem {
  id: number
  name: string
  capacity: number
  location: string
  equipment: string
  description: string
  isBooked: boolean
  createTime: string
  updateTime: string
}
