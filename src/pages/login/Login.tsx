import { Button, Form, Input, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useCallback } from 'react'
import './login.css'
import { login } from '../../instance/login'
import { useNavigate } from 'react-router-dom'

export function Login() {
  const [form] = useForm()
  const navigate = useNavigate()

  const onFinish = useCallback(async (values: any) => {
    const res = await login(values.username, values.password)

    const { code, message: msg, data } = res.data
    if (res.status === 200 || res.status === 201) {
      message.success('登录成功')
      const { accessToken, refreshToken, userInfo } = data
      localStorage.setItem('user_info', JSON.stringify(userInfo))
      localStorage.setItem('refresh_token', refreshToken)
      localStorage.setItem('access_token', accessToken)
      setTimeout(() => {
        navigate('/')
      }, 1500)
    } else {
      message.error(data || '系统繁忙，请稍后再试')
    }
  }, [])

  return (
    <div className='login-container'>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        colon={false}
        autoComplete='off'
        onFinish={onFinish}
      >
        <Form.Item label='用户名' name='username' rules={[{ required: true, message: '请输入用户名!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label='密码' name='password' rules={[{ required: true, message: '请输入密码!' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item label=' '>
          <Button className='btn' type='primary' htmlType='submit'>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
