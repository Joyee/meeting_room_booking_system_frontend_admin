import { Button, Form, Input, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useCallback, useEffect } from 'react'
import './style.css'
import { getUpdatePasswordCaptcha, requestGetUserInfo, updatePassword } from '../../instance/user-manage'
import { router } from '../..'

export interface UpdatePassword {
  username: string
  email: string
  captcha: string
  password: string
  confirmPassword: string
}

export function ModifyPassword() {
  const [form] = useForm()

  const onFinish = useCallback(async (values: UpdatePassword) => {
    if (values.password !== values.confirmPassword) {
      return message.error('两次输入的密码不一致')
    }

    const res = await updatePassword({
      ...values,
      username: form.getFieldValue('username'),
    })
    if (res.status === 201 || res.status === 200) {
      const { message: msg, data } = res.data
      if (msg === 'success') {
        message.success('密码修改成功，请重新登录')
        setTimeout(() => {
          router.navigate('/login')
        }, 1000)
      } else {
        message.error(data)
      }
    } else {
      message.error('系统繁忙，请稍后再试')
    }
  }, [])

  const sendCaptcha = useCallback(async () => {
    const address = form.getFieldValue('email')
    if (!address) {
      message.error('邮件地址不能为空!')
      return
    }
    const res = await getUpdatePasswordCaptcha(address)
    if (res.status === 201 || res.status === 200) {
      message.success(res.data.data)
    } else {
      message.error('系统繁忙，请稍后再试')
    }
  }, [])

  useEffect(() => {
    async function query() {
      const res = await requestGetUserInfo()
      if (res.status === 200 || res.status === 201) {
        const { code, data } = res.data
        if (code === 200) {
          form.setFieldValue('email', data.email)
          form.setFieldValue('username', data.username)
        }
      }
    }
    query()
  }, [])

  return (
    <div className='updatePassword-container'>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={form}
        onFinish={onFinish}
        colon={false}
        autoComplete='off'
      >
        <Form.Item label='新密码' name='password'>
          <Input.Password />
        </Form.Item>
        <Form.Item label='确认密码' name='confirmPassword' rules={[{ required: true, message: '请输入确认密码' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item label='邮箱' name='email'>
          <Input disabled />
        </Form.Item>
        <div className='captcha-wrapper'>
          <Form.Item label='验证码' name='captcha' rules={[{ required: true, message: '请输入验证码!' }]}>
            <Input />
          </Form.Item>
          <Button style={{ marginLeft: '12px' }} type='primary' onClick={sendCaptcha}>
            发送验证码
          </Button>
        </div>
        <Form.Item label=' '>
          <Button style={{ width: '100%' }} type='primary' htmlType='submit'>
            确定修改
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
