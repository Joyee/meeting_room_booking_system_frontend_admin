import { Button, Form, Input, Modal, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useCallback, useEffect } from 'react'
import { getMeetingRoomInfo, updateMeetingRoom } from '../../instance/meeting-room-manage'

export interface UpdateMeetingRoom {
  id: number
  name: string
  capacity: number
  location: string
  equipment: string
  description: string
}

export function UpdateMeetingRoomModal(props: { id: number; isOpen: boolean; handleClose: Function }) {
  const [form] = useForm()

  const handleConfirm = useCallback(async (values: UpdateMeetingRoom) => {
    values.description = values.description || ''
    values.equipment = values.equipment || ''

    const res = await updateMeetingRoom({
      ...values,
      id: props.id,
    })
    const { data } = res.data
    if (res.status === 200 || res.status === 201) {
      message.success('更新成功')
      form.resetFields()
      props.handleClose()
    } else {
      message.error(data ?? '系统繁忙，请稍后再试')
    }
  }, [])

  const handleCancel = useCallback(() => {
    props.handleClose()
  }, [])

  useEffect(() => {
    async function getDetail() {
      if (!props.id) return

      const res = await getMeetingRoomInfo(props.id)
      console.log(res.data)
      const { data } = res.data
      if (res.status === 200 || res.status === 201) {
        form.setFieldValue('name', data.name)
        form.setFieldValue('location', data.location)
        form.setFieldValue('capacity', data.capacity)
        form.setFieldValue('equipment', data.equipment)
        form.setFieldValue('description', data.description)
      } else {
        message.error(data ?? '系统繁忙，请稍后再试')
      }
    }
    getDetail()
  }, [props.isOpen])

  return (
    <Modal title='更新会议室' open={props.isOpen} footer={null} onCancel={handleCancel}>
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
