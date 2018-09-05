import React from 'react'
import Upload from 'antd/lib/upload/index'
// import 'antd/lib/upload/style/index.css'
import { time } from '@/utils/commonUtil'
import { OSSService } from '@/utils/service'

export default class UploadImage extends React.Component {
  static defaultProps = {
    accept: 'image/*',
    beforeUpload: undefined,
    data: {},
    defaultFileList: [],
    disabled: false,
    headers: {},
    listType: 'text',
    showUploadList: false,
    onUploadDone: undefined,
    uploadFileName: 'unnamed/upload-[nowTime]'
  }

  state = {
    update: 0
  }

  uploadProps = {}

  nowTimeString = () => {
    const nowTime = new Date()
    const nto = time.dateToLocaleObject(nowTime)
    return `${nto.year}${nto.month}${nto.day}${nto.hour}${nto.minute}${nto.second}`
  }

  hookUploadBefore = (file, fileList) => {
    const { props, uploadProps, nowTimeString } = this
    const { beforeUpload } = props
    const nowTime = nowTimeString()
    const fileSuffix = (file.name.match(/.[^\.]+$/) || [''])[0]
    const filename = uploadProps.uploadFileName.replace('[nowTime]', nowTime) + fileSuffix
    if (beforeUpload && !beforeUpload(file, fileList)) {
      return false
    }
    return (new Promise((resolve, reject) => {
      const onPolicyReceived = (response) => {
        if (response.data) {
          uploadProps.action = response.url
          Object.assign(uploadProps.data, response.data)
          uploadProps.data.key = uploadProps.data.key + filename
          uploadProps.path = uploadProps.data.key
          uploadProps.fullPath = response.url + '/' + uploadProps.data.key
          resolve(true)
        } else {
          reject('ImageUpload: Get policy error!')
        }
      }
      OSSService.imagePolicy(onPolicyReceived)
    }))
  }

  hookUploadChange = (changes) => {
    const { props, uploadProps } = this
    const { fullPath, path, onUploadDone } = uploadProps
    props.onChange && props.onChange(changes)
    if (changes.file.status === 'done') {
      onUploadDone && onUploadDone({
        path,
        fullPath,
        file: changes.file
      })
    }
    this.setState({ update: this.state.update + 1 })
  }

  componentWillMount() {
    const { props, uploadProps, hookUploadBefore, hookUploadChange } = this
    Object.assign(uploadProps, props)
    uploadProps.beforeUpload = hookUploadBefore
    uploadProps.onChange = hookUploadChange
  }

  render() {
    const { uploadProps } = this
    return (
      <Upload {...uploadProps}>{uploadProps.children}</Upload>
    )
  }
}