import { forcePushHistory } from '@/utils/commonUtil'
import { Message } from '@/components/ui'

// handle status event such as success or error fail
const statusHandler = (param) => {
  const { action, successNotice, failedNotice } = param
  const payload = action.payload || {}
  const errNotice = action.payload.errorMsg || failedNotice
  if (payload.status === 'ok' && successNotice) {
    Message.success(successNotice)
  }
  if (payload.status !== 'ok' && !payload.fetchFailed && errNotice) {
    switch (payload.errorCode) {
    default:
      Message.warn(errNotice)
      break
    case 10003:
      forcePushHistory('/user/login')
      break
    }
  }
  if (payload && payload.fetchFailed) {
    Message.warn('网络通讯失败')
  }
}

// fast copy a new state make redux send props
const newState = (state) => {
  return Object.assign({}, state)
}

// there should be a stateProp in your dispatch action.
export const superReducer = (param) => {
  const { state, action, dataProp } = param
  const updatedState = newState(state)
  const stateProp = (action.type.match(/[^/]+$/) || [''])[0]
  statusHandler(param)
  if (dataProp) {
    updatedState[stateProp] = action.payload[dataProp]
  } else {
    updatedState[stateProp] = action.payload
  }
  if (typeof(updatedState[stateProp]) === 'object' && action.actionKey) {
    updatedState[stateProp].actionKey = action.actionKey
  }
  if (action.callback) {
    action.callback(updatedState[stateProp])
  }
  return updatedState
}
