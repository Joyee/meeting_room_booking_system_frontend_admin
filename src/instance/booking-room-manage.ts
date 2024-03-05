import axiosInstance from './request'
import { SearchBooking } from '../pages/booking-manage/BookingMange'
import dayjs from 'dayjs'

export const getBookingRooms = async (searchBooking: SearchBooking, pageNo: number, pageSize: number) => {
  let bookingTimeRangeStart
  let bookingTimeRangeEnd

  if (searchBooking.rangeStartDate && searchBooking.rangeStartTime) {
    const rangeStartDateStr = dayjs(searchBooking.rangeStartDate).format('YYYY-MM-DD')
    const rangeStartTimeStr = dayjs(searchBooking.rangeStartTime).format('HH:mm')
    bookingTimeRangeStart = dayjs(rangeStartDateStr + ' ' + rangeStartTimeStr).valueOf()
  }

  if (searchBooking.rangeEndDate && searchBooking.rangeEndTime) {
    const rangeEndDateStr = dayjs(searchBooking.rangeEndDate).format('YYYY-MM-DD')
    const rangeEndTimeStr = dayjs(searchBooking.rangeEndTime).format('HH:mm')
    bookingTimeRangeEnd = dayjs(rangeEndDateStr + ' ' + rangeEndTimeStr).valueOf()
  }

  return await axiosInstance.get('/booking/list', {
    params: {
      username: searchBooking.username,
      meetingRoomName: searchBooking.meetingRoomName,
      meetingRoomPosition: searchBooking.meetingRoomPosition,
      bookingTimeRangeStart,
      bookingTimeRangeEnd,
      pageNo: pageNo,
      pageSize: pageSize,
    },
  })
}

export const requestChangeStatus = async (id: number, type: string) => await axiosInstance.get(`/booking/${type}/${id}`)
