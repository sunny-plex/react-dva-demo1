import { connect } from 'dva'

// combinedModels global storage
const combinedModels = []

// export combinedModels
export const reduxModels = () => {
  return combinedModels
}

// create a super connect using react-hot-loader and redux-models
export const combineComponent = (inputs = {}) => {
  let modelMapStateToProps = () => { return {} }
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
        const remoteModelState = state[mapItem.namespace]
        try {
          mapList[mapItem.stateProp] = remoteModelState[mapItem.stateProp]
        } catch (e) {
          console.warn(
            `Unable to extend from model "${mapItem.namespace}" map state "${mapItem.stateProp}" to component "${inputs.c.name}"`
          )
        }
      })
      return mapList
    }
    combinedModels.push(inputs.model)
  }
  return connect(modelMapStateToProps)(inputs.c)
}
