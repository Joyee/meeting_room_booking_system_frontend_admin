import { Button, Form, Input, Table, Badge, message, Popconfirm } from 'antd'
import './style.css'
import { useForm } from 'antd/es/form/Form'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { MeetingRoomItem } from '../../instance/types'
import { SearchMeetingRoom, deleteMeetingRoom, getMeetingRoomList } from '../../instance/meeting-room-manage'
import dayjs from 'dayjs'
import { CreateMeetingRoomModal } from './CreateMeetingRoomModal'
import { UpdateMeetingRoomModal } from './UpdateMeetingRoomModal'

export function MeetingRoomManage() {
  const [form] = useForm()
  const [totalCount, setTotalCount] = useState(0)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [updateId, setUpdateId] = useState<number>()

  const columns: ColumnsType<MeetingRoomItem> = useMemo(
    () => [
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title: '容纳人数',
        dataIndex: 'capacity',
      },
      {
        title: '位置',
        dataIndex: 'location',
      },
      {
        title: '设备',
        dataIndex: 'equipment',
      },
      {
        title: '描述',
        dataIndex: 'description',
      },
      {
        title: '添加时间',
        dataIndex: 'createTime',
        render: (_, record) => <span>{dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '上次更新时间',
        dataIndex: 'updateTime',
        render: (_, record) => <span>{dayjs(record.updateTime).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '预定状态',
        dataIndex: 'isBooked',
        render: (_, record) =>
          record.isBooked ? <Badge status='error'>已被预订</Badge> : <Badge status='success'>可预定</Badge>,
      },
      {
        title: '操作',
        render: (_, record) => (
          <div>
            <Popconfirm
              placement='top'
              title='确定要删除吗？'
              description=''
              okText='确定'
              cancelText='取消'
              onConfirm={() => onDeleteRoom(record.id)}
            >
              <Button type='text' danger>
                删除
              </Button>
            </Popconfirm>
            <Button
              type='text'
              onClick={() => {
                setIsUpdateModalOpen(true)
                setUpdateId(record.id)
              }}
            >
              更新
            </Button>
          </div>
        ),
      },
    ],
    [],
  )
  const [dataSource, setDataSource] = useState([])
  const [pageSize, setPageSize] = useState(10)
  const [pageNo, setPageNo] = useState(1)
  const [num, setNum] = useState(0)

  const onChangePage = useCallback((pageNo: number, pageSize: number) => {
    setPageNo(pageNo)
    setPageSize(pageSize)
  }, [])

  const onDeleteRoom = async (id: number) => {
    try {
      const res = await deleteMeetingRoom(id)
      if (res.status === 200 || res.status === 201) {
        setNum(Math.random())
        message.success('删除成功')
      } else {
        message.error(res.data?.data || '系统繁忙，请稍后再试')
      }
    } catch (error) {
      message.error('删除失败')
    }
  }

  const searchMeetingRoom = useCallback(async (values: SearchMeetingRoom) => {
    const res = await getMeetingRoomList({ ...values, pageNo, pageSize })
    if (res.status === 200 || res.status === 201) {
      const { data } = res.data
      setDataSource(data.meetingRooms)
      setTotalCount(data.totalCount)
    } else {
      message.error(res.data?.data || '系统繁忙，请稍后再试')
    }
  }, [])

  useEffect(() => {
    searchMeetingRoom({
      name: form.getFieldValue('name'),
      capacity: form.getFieldValue('capacity'),
      equipment: form.getFieldValue('equipment'),
    })
  }, [pageNo, pageSize, num])

  return (
    <div className='meeting-room-container'>
      <div className='search-container'>
        <Form form={form} layout='inline' name='search' onFinish={searchMeetingRoom} colon={false}>
          <Form.Item label='会议室名称' name='name'>
            <Input />
          </Form.Item>
          <Form.Item label='位置' name='location'>
            <Input />
          </Form.Item>
          <Form.Item label='容纳人数' name='capacity'>
            <Input />
          </Form.Item>
          <Form.Item label='设备' name='equipment'>
            <Input />
          </Form.Item>
          <Form.Item label=' '>
            <Button className='btn' type='primary' htmlType='submit'>
              查询
            </Button>
          </Form.Item>
          <Form.Item label=' '>
            <Button className='btn' style={{ background: '#d9f7be' }} onClick={() => setIsCreateModalOpen(true)}>
              添加会议
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

      <CreateMeetingRoomModal
        isOpen={isCreateModalOpen}
        handleClose={() => {
          setIsCreateModalOpen(false)
          setNum(Math.random())
        }}
      />
      <UpdateMeetingRoomModal
        id={updateId!}
        isOpen={isUpdateModalOpen}
        handleClose={() => {
          setIsUpdateModalOpen(false)
          setNum(Math.random())
        }}
      />
    </div>
  )
}
