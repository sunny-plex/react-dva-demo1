import { connect } from 'dva'
import { hot } from 'react-hot-loader'

// combinedModels global storage
const combinedModels = []

// export combinedModels
export const reduxModels = () => {
  return combinedModels
}

// create a super connect using react-hot-loader and redux-models
export const combineComponent = (inputs = {}) => {
  let modelMapStateToProps = () => {}
  if (inputs.model && inputs.model.state) {
    const modelName = inputs.model.namespace
    const modelMapKeys = Object.keys(inputs.model.state)
    const modelMapKeysExt = inputs.modelEx || []
    modelMapStateToProps = (state) => {
      state = state || {}
      const mapList = {}
      modelMapKeys.map((mapKey) => {
        mapList[mapKey] = (state[modelName] || {})[mapKey]
      })
      modelMapKeysExt.map((mapItem) => {
        mapList[mapItem.stateProp] = state[mapItem.namespace][mapItem.stateProp]
      })
      return mapList
    }
    combinedModels.push(inputs.model)
  }
  if ((process.env).NODE_ENV === 'development') {
    return hot(module)(connect(modelMapStateToProps)(inputs.c))
  } else {
    return connect(modelMapStateToProps)(inputs.c)
  }
}
