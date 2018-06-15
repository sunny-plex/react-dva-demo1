import dispatchLoader from '@/utils/dispatchLoader'
import apiList from '@/utils/apiList'

export const testService = {
  getTestList(queryData) {
    dispatchLoader({
      type: 'test1/customerList',
      url: apiList.GET_CUSTOM_LIST,
      method: 'GET',
      payload: queryData
    })
  }
}
