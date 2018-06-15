import { reducerUpdate } from '@/utils/reducerUtil'

export default {
  namespace: 'test1',
  state: {
    customerList: []
  },
  reducers: {
    customerList: (state, action) => {
      return reducerUpdate(state, 'customerList', action.payload.list)
    }
  }
}
