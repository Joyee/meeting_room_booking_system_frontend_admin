import { Button, Form, Input, Modal, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useCallback } from 'react'
import { createMeetingRoom } from '../../instance/meeting-room-manage'

export interface CreateMeetingRoom {
  name: string
  capacity: number
  location: string
  equipment: string
  description: string
}

export function CreateMeetingRoomModal(props: { isOpen: boolean; handleClose: Function }) {
  const [form] = useForm()

  const handleConfirm = useCallback(async (values: CreateMeetingRoom) => {
    values.description = values.description || ''
    values.equipment = values.equipment || ''

    const res = await createMeetingRoom(values)
    const { data } = res.data
    if (res.status === 200 || res.status === 201) {
      message.success('创建成功')
      form.resetFields()
      props.handleClose()
    } else {
      message.error(data ?? '系统繁忙，请稍后再试')
    }
  }, [])

  const handleCancel = useCallback(() => {
    props.handleClose()
  }, [])

  return (
    <Modal title='创建会议室' open={props.isOpen} footer={null} onCancel={handleCancel}>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={form}
        colon={false}
        autoComplete='off'
        onFinish={handleConfirm}
      >
        <Form.Item
          label='会议室名称'
          name='name'
          rules={[{ required: true, message: '会议室名称不能为空' }, { max: 10 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='位置'
          name='location'
          rules={[{ required: true, message: '会议室位置不能为空' }, { max: 50 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label='容纳人数' name='capacity' rules={[{ required: true, message: '会议室容量不能为空' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label='设备'
          name='equipment'
          rules={[{ required: true, message: '会议室设备不能为空' }, { max: 50 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label='描述' name='description'>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label=' '>
          <Button style={{ width: '100%' }} type='primary' htmlType='submit'>
            确定
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
