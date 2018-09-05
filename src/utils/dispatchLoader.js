// import fetch from 'dva/fetch'

const _loaderState = {
  requestHeaders: {
    ['Content-Type']: 'application/json'
  }
}
const COM_LOAD_PROP = {
  type: 'BASE/comLoading',
  stateProp : 'comLoading'
}

export const loaderState = () => {
  return {
    set: (key, value) => {
      return _loaderState[key] = value
    },
    get: (key) => {
      return _loaderState[key]
    }
  }
}

const addRequestQueue = (actionType) => {
  const requestQueue = _loaderState['requestQueue'] || []
  requestQueue.push(actionType)
  _loaderState['requestQueue'] = requestQueue
}

const removeRequestQueue = (actionType) => {
  const requestQueue = _loaderState['requestQueue'] || []
  _loaderState['requestQueue'] =  requestQueue.filter((queueItem) => {return queueItem !== actionType})
}

const dispatchRequestState = (dispatch) => {
  const requestQueue = _loaderState['requestQueue'] || []
  if (requestQueue.length) {
    dispatch({
      type: COM_LOAD_PROP.type,
      stateProp: COM_LOAD_PROP.stateProp,
      payload: true
    })
  } else {
    dispatch({
      type: COM_LOAD_PROP.type,
      stateProp: COM_LOAD_PROP.stateProp,
      payload: false
    })
  }
}

const mapObjectToQueryString = (objectBody) => {
  let queryString = ''
  if (objectBody !== undefined) {
    queryString = '?'
    const queryArr = []
    Object.keys(objectBody).map((eachKey) => {
      queryArr.push(`${eachKey}=${objectBody[eachKey]}`)
    })
    queryString = queryString + queryArr.join('&')
  }
  return queryString
}

export default (action = {}) => {
  const { app } = _loaderState
  const { _store } = app
  const { dispatch } = _store || ((action) => { console.error('dispatch not defined when execute action:', action) })
  if (!action.type) {
    console.error('dispatch canceled, because of missing action.type!')
    return {}
  }
  if (!action.url) {
    dispatch(action)
  } else {
    const headers = Object.assign(action.headers || {}, _loaderState['requestHeaders'] || {})
    action.method = (action.method || '').toUpperCase()
    if (!action.backgroundLoad) {
      addRequestQueue(action.type)
      dispatchRequestState(dispatch)
    }
    fetch(
      action.method !== 'POST' ? action.url + mapObjectToQueryString(action.payload) : action.url,
      {
        method: action.method,
        headers: headers,
        body: (action.method || '').toUpperCase() !== 'POST' ? undefined : JSON.stringify(action.payload)
      }
    ).then((response) => {
      if (!action.backgroundLoad) {
        removeRequestQueue(action.type)
        dispatchRequestState(dispatch)
      }
      const emitResponse = (payload) => {
        if (response.ok) {
          action.payload = payload
        } else {
          action.payload = {
            failed: 1,
            fetchFailed: 0,
            errorMessage: payload
          }
        }
        dispatch(action)
      }
      response.text().then((responseText) => {
        let responseBody = responseText
        new Promise((resolve) => {
          const newBody = JSON.parse(responseBody)
          resolve(newBody)
        }).then((newBody) => {
          emitResponse(newBody)
        }).catch(() => {
          emitResponse(responseBody)
        })
      }).catch(
        (error) => {
          // unexpect response
          console.error('fetch response read error!', action, 'errorMessage:', error)
        }
      )
    }).catch((error) => {
      if (!action.backgroundLoad) {
        removeRequestQueue(action.type)
        dispatchRequestState(dispatch)
      }
      action.payload = {
        failed: 1,
        fetchFailed: 1,
        errorMessage: error
      }
      dispatch(action)
    })
  }
}
