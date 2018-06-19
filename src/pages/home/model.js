import { simpleReducer } from '@/utils/reducerUtil'

export default {
  namespace: 'home',
  state: {
    hello: '...'
  },
  reducers: {
    hello: simpleReducer
  }
}
