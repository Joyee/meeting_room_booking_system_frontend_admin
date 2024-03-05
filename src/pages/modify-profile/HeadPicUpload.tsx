import { InboxOutlined } from '@ant-design/icons'
import { message } from 'antd'
import Dragger, { type DraggerProps } from 'antd/es/upload/Dragger'

let onChange: Function

const props: DraggerProps = {
  name: 'file',
  action: 'http://localhost:3300/user/upload',
  onChange(info) {
    const { status } = info.file
    if (status === 'done') {
      onChange(info.file.response.data)
      message.success(`${info.file.name} 文件上传成功`)
    } else if (status === 'error') {
      message.error(`${info.file.name} 文件上传失败`)
    }
  },
}

const draggerPic = (
  <Dragger {...props}>
    <p className='ant-upload-drag-icon'>
      <InboxOutlined />
    </p>
    <p>点击或拖拽文件到这个区域来上传</p>
  </Dragger>
)

export function HeadPicUpload(props: { value?: string; onChange?: Function }) {
  onChange = props.onChange!

  return props.value ? (
    <div>
      <img src={'http://localhost:3300/' + props.value} alt='头像' width='100' height='100' />
      {draggerPic}
    </div>
  ) : (
    <div>{draggerPic}</div>
  )
}
