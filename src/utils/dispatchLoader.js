import { memoryStorage } from './storageUtil'

const addRequestQueue = (actionType) => {
  const requestQueue = memoryStorage.get('requestQueue') || []
  requestQueue.push(actionType)
  memoryStorage.set('requestQueue', requestQueue)
}

const removeRequestQueue = (actionType) => {
  const requestQueue = memoryStorage.get('requestQueue') || []
  memoryStorage.set('requestQueue', requestQueue.filter((queueItem) => {return queueItem !== actionType}))
}

const dispatchRequestState = (dispatch) => {
  const requestQueue = memoryStorage.get('requestQueue') || []
  if (requestQueue.length) {
    dispatch({
      type: 'base/comLoading',
      stateProp: 'comLoading',
      payload: true
    })
  } else {
    dispatch({
      type: 'base/comLoading',
      stateProp: 'comLoading',
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

export default (dispatch = () => {}, action = {}) => {
  if (!action.type) {
    console.error('dispatch canceled, because of missing action.type!')
    return {}
  }
  if (!action.url) {
    dispatch(action)
  } else {
    const headers = Object.assign(action.headers || {}, memoryStorage.get('requestHeaders') || {})
    addRequestQueue(action.type)
    dispatchRequestState(dispatch)
    fetch(
      (action.method || '').toUpperCase() !== 'POST' ? action.url + mapObjectToQueryString(action.payload) : action.url,
      {
        method: action.method,
        headers: headers,
        body: (action.method || '').toUpperCase() !== 'POST' ? undefined : JSON.stringify(action.payload)
      }
    ).then((response) => {
      removeRequestQueue(action.type)
      dispatchRequestState(dispatch)
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
      removeRequestQueue(action.type)
      dispatchRequestState(dispatch)
      action.payload = {
        failed: 1,
        fetchFailed: 1,
        errorMessage: error
      }
      dispatch(action)
    })
  }
}
