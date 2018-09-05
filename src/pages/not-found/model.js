import { superReducer } from '@/utils/reducerUtil'

export default {
  namespace: 'NOT_FOUND',
  state: {
    param: {}
  },
  reducers: {
    param: (state, action) => {
      return superReducer({
        state: state,
        action: action
      })
    }
  }
}
