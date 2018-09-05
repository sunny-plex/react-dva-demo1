import { superReducer } from '@/utils/reducerUtil'

export default {
  namespace: 'PARENT.CHILD',
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
