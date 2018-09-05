import { superReducer } from '@/utils/reducerUtil'

export default {
  namespace: 'BASE',
  state: {
    comLoading: false,
    login: {},
    imgPolicy: {}
  },
  reducers: {
    comLoading: (state, action) => {
      return superReducer({
        state: state,
        action: action
      })
    },
    login: (state, action) => {
      return superReducer({
        state: state,
        action: action,
        successNotice: '登陆成功，欢迎回来！',
        failedNotice: '登录失败，网络错误'
      })
    },
    imgPolicy: (state, action) => {
      return superReducer({
        state: state,
        action: action
      })
    },
  }
}