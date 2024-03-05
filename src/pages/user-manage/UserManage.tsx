import { Badge, Button, Form, Input, Table, message } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { type ColumnsType } from 'antd/es/table'
import './user-manage.css'
import { freezeUser, requestGetUserList } from '../../instance/user-manage'
import dayjs from 'dayjs'
import { useForm } from 'antd/es/form/Form'

interface UserItemProp {
  id: number
  username: string
  nickName: string
  email: string
  headPic: string
  createTime: Date
  isFrozen: boolean
}

interface SearchProps {
  username: string
  email: string
  nickName: string
}

export function UserManage() {
  const [totalCount, setTotalCount] = useState(0)
  const [dataSource, setDataSource] = useState<UserItemProp[]>([])
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [num, setNum] = useState(0)
  // 保留搜索条件
  const [form] = useForm()

  const onChangePage = useCallback((pageNo: number, pageSize: number) => {
    setPageNo(pageNo)
    setPageSize(pageSize)
  }, [])

  const onFreeze = useCallback(async (id: number) => {
    const res = await freezeUser(id)
    if (res.status === 200) {
      const { code, message: msg, data } = res.data
      if (code === 200) {
        message.success('冻结成功')
        // 刷新
        setNum(Math.random())
      }
    } else {
      message.error(res.data?.data || '系统繁忙，请稍后再试')
    }
  }, [])

  const columns: ColumnsType<UserItemProp> = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '头像',
      dataIndex: 'headPic',
      render: (text) => {
        return (
          <img style={{ width: '40px', height: '40px', borderRadius: '10%' }} src={'http://localhost:3300/' + text} />
        )
      },
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      render: (text) => <span>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '状态',
      dataIndex: 'isFrozen',
      render: (_, record) => (record.isFrozen ? <Badge status='success'>已冻结</Badge> : ''),
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (_, record) => {
        return record.isFrozen ? (
          ''
        ) : (
          <a
            onClick={() => {
              onFreeze(record.id)
            }}
          >
            冻结
          </a>
        )
      },
    },
  ]

  async function getList(values: SearchProps) {
    const res = await requestGetUserList({
      pageNo: 1,
      pageSize: 10,
      ...values,
    })

    if (res.status === 200) {
      const { code, message: msg, data } = res.data
      setTotalCount(data.totalCount)
      setDataSource(data.users)
    } else {
      message.error(res.data?.data || '系统繁忙，请稍后再试')
    }
  }

  useEffect(() => {
    getList({
      username: form.getFieldValue('username'),
      nickName: form.getFieldValue('nickName'),
      email: form.getFieldValue('email'),
    })
  }, [pageNo, pageSize, num])

  return (
    <div className='user-manager-container'>
      <div className='search-container'>
        <Form form={form} layout='inline' name='search' onFinish={getList} colon={false}>
          <Form.Item label='用户名' name='username'>
            <Input />
          </Form.Item>
          <Form.Item label='昵称' name='nickName'>
            <Input />
          </Form.Item>
          <Form.Item label='邮箱' name='email' rules={[{ type: 'email', message: '请输入合法邮箱地址!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label=' '>
            <Button className='btn' type='primary' htmlType='submit'>
              搜索
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
