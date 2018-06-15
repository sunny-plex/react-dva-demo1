import { simpleReducer } from '@/utils/reducerUtil'

export default {
  namespace: 'base',
  state: {
    comLoading: false
  },
  reducers: {
    comLoading: simpleReducer
  }
}