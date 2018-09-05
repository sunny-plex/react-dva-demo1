import Button from 'antd/lib/button/index'
import 'antd/lib/button/style/index.css'

import Breadcrumb from 'antd/lib/Breadcrumb/index'
import 'antd/lib/Breadcrumb/style/index.css'

import Checkbox from 'antd/lib/checkbox/index'
import 'antd/lib/checkbox/style/index.css'

import DraggableList from '@/components/draggableList'
import '@/components/draggableList.scss'

import Form from 'antd/lib/form/index'
import 'antd/lib/form/style/index.css'

import Icon from 'antd/lib/icon/index'
import '@/components/ui.base.css'

import ImageUpload from '@/components/uploadImage'
import '@/components/uploadImage.scss'

import Input from 'antd/lib/input/index'
import 'antd/lib/input/style/index.css'

import Message from 'antd/lib/message/index'
import 'antd/lib/message/style/index.css'

import Modal from 'antd/lib/modal/index'
import 'antd/lib/modal/style/index.css'

import Select from 'antd/lib/select/index'
import 'antd/lib/select/style/index.css'

const ClassNameX = (classNames, classToggle) => {
  let _classNames = classNames
  if (typeof(_classNames) !== 'object') {
    _classNames = [_classNames]
  }
  if (classToggle && classToggle.by) {
    _classNames.push(classToggle.toggle)
  }
  _classNames = _classNames.join(' ').trim()
  return _classNames
}

Modal.dialog = (option) => {
  const _option = option
  _option.className = ClassNameX(['modal-dialog', _option.className])
  return Modal.confirm(_option)
}

Modal.message = (option) => {
  const _option = option
  _option.closable = true
  _option.maskClosable = true
  _option.className = ClassNameX(['modal-message', _option.className])
  return Modal.info(_option)
}

export {
  Button,
  Breadcrumb,
  Checkbox,
  ClassNameX,
  DraggableList,
  Form,
  Icon,
  ImageUpload,
  Input,
  Message,
  Modal,
  Select
}