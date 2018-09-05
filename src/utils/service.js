import dispatchX from '@/utils/dispatchLoader'
import API_LIST from '@/utils/apiList'

export const userService = {
  login(userAccount) {
    dispatchX({
      type: 'BASE/login',
      url: API_LIST.USER_LOGIN,
      method: 'POST',
      actionKey: (new Date()).getTime(),
      payload: userAccount
    })
  }
}

export const OSSService = {
  imagePolicy(callback) {
    dispatchX({
      type: 'BASE/imgPolicy',
      url: API_LIST.OSS_POLICY_IMG,
      method: 'GET',
      actionKey: (new Date()).getTime(),
      callback: callback
    })
  }
}
