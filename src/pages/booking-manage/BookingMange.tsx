import { Form, Button, Input, Table, DatePicker, TimePicker, message, Popconfirm } from 'antd'
import './style.css'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { useForm } from 'antd/es/form/Form'
import dayjs from 'dayjs'
import { UserItemProp } from '../user-manage/UserManage'
import { MeetingRoomItem } from '../../instance/types'
import { getBookingRooms, requestChangeStatus } from '../../instance/booking-room-manage'

export interface SearchBooking {
  username: string
  meetingRoomName: string
  meetingRoomPosition: string
  rangeStartDate: Date
  rangeStartTime: Date
  rangeEndDate: Date
  rangeEndTime: Date
}

export interface BookingItem {
  id: number
  startTime: number
  endTime: number
  status: string
  note: string
  createTime: number
  user: UserItemProp
  room: MeetingRoomItem
}

export function BookingManage() {
  const [form] = useForm()
  const [totalCount, setTotalCount] = useState(0)
  const [dataSource, setDataSource] = useState([])
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [num, setNum] = useState(0)

  const columns: ColumnsType<BookingItem> = useMemo(
    () => [
      {
        title: '会议室名称',
        dataIndex: 'name',
        render: (_, record) => {
          return record.room?.name || ''
        },
      },
      {
        title: '会议室位置',
        dataIndex: 'location',
        render: (_, record) => record.room?.location || '',
      },
      {
        title: '预定人',
        dataIndex: 'username',
        render: (_, record) => record.user?.username || '',
      },
      {
        title: '开始时间',
        dataIndex: 'startTime',
        render(_, record) {
          return dayjs(new Date(record.startTime)).format('YYYY-MM-DD HH:mm:ss')
        },
      },
      {
        title: '结束时间',
        dataIndex: 'endTime',
        render(_, record) {
          return dayjs(new Date(record.endTime)).format('YYYY-MM-DD HH:mm:ss')
        },
      },
      {
        title: '审批状态',
        dataIndex: 'status',
        onFilter: (value, record) => record.status.startsWith(value as string),
        filters: [
          {
            text: '审批通过',
            value: '审批通过',
          },
          {
            text: '审批驳回',
            value: '审批驳回',
          },
          {
            text: '申请中',
            value: '申请中',
          },
          {
            text: '已解除',
            value: '已解除',
          },
        ],
      },
      {
        title: '预定时间',
        dataIndex: 'createTime',
        render(_, record) {
          return dayjs(new Date(record.createTime)).format('YYYY-MM-DD HH:mm:ss')
        },
      },
      {
        title: '备注',
        dataIndex: 'note',
      },
      {
        title: '描述',
        dataIndex: 'description',
      },
      {
        title: '操作',
        render: (_, record) => (
          <div>
            <Popconfirm
              title='通过申请'
              description='确认通过吗？'
              onConfirm={() => changeStatus(record.id, 'apply')}
              okText='Yes'
              cancelText='No'
            >
              <a href='#'>通过</a>
            </Popconfirm>
            <br />
            <Popconfirm
              title='驳回申请'
              description='确认驳回吗？'
              onConfirm={() => changeStatus(record.id, 'reject')}
              okText='Yes'
              cancelText='No'
            >
              <a href='#'>驳回</a>
            </Popconfirm>
            <br />
            <Popconfirm
              title='解除申请'
              description='确认解除吗？'
              onConfirm={() => changeStatus(record.id, 'unbind')}
              okText='Yes'
              cancelText='No'
            >
              <a href='#'>解除</a>
            </Popconfirm>
            <br />
          </div>
        ),
      },
    ],
    [],
  )

  const changeStatus = useCallback(async (id: number, type: string) => {
    await requestChangeStatus(id, type)
    message.success('操作成功')
    setNum(Math.random())
  }, [])

  const onChangePage = useCallback((pageNo: number, pageSize: number) => {
    setPageNo(pageNo)
    setPageSize(pageSize)
  }, [])

  const searchBookings = useCallback(async (values: SearchBooking) => {
    const res = await getBookingRooms(
      {
        ...values,
      },
      pageNo,
      pageSize,
    )
    const { data } = res.data
    if (res.status === 200 || res.status === 201) {
      setDataSource(data.bookings)
      setTotalCount(data.totalCount)
    } else {
      message.error(data || '系统繁忙，请稍后再试')
    }
  }, [])

  useEffect(() => {
    searchBookings({
      username: form.getFieldValue('username'),
      meetingRoomName: form.getFieldValue('meetingRoomName'),
      meetingRoomPosition: form.getFieldValue('meetingRoomPosition'),
      rangeStartDate: form.getFieldValue('rangeStartDate'),
      rangeStartTime: form.getFieldValue('rangeStartTime'),
      rangeEndDate: form.getFieldValue('rangeEndDate'),
      rangeEndTime: form.getFieldValue('rangeEndTime'),
    })
  }, [pageNo, pageSize, num])

  return (
    <div className='booking-manage-container'>
      <div className='search-container'>
        <Form form={form} layout='inline' name='search' onFinish={searchBookings} colon={false}>
          <Form.Item label='预定人' name='username'>
            <Input />
          </Form.Item>

          <Form.Item label='会议室名称' name='meetingRoomName'>
            <Input />
          </Form.Item>

          <Form.Item label='预定开始日期' name='rangeStartDate'>
            <DatePicker />
          </Form.Item>

          <Form.Item label='预定开始时间' name='rangeStartTime'>
            <TimePicker />
          </Form.Item>

          <Form.Item label='预定结束日期' name='rangeEndDate'>
            <DatePicker />
          </Form.Item>

          <Form.Item label='预定结束时间' name='rangeEndTime'>
            <TimePicker />
          </Form.Item>

          <Form.Item label=' '>
            <Button className='btn' style={{ background: '#d9f7be' }}>
              预定会议
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className='content-container'>
        <div>总计({totalCount})</div>
        <Table
          rowKey='id'
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize, current: pageNo, onChange: onChangePage }}
        />
      </div>
    </div>
  )
}
