import React from 'react'
import dva from 'dva'
import { persistStore, persistReducer } from 'redux-persist'
import storageProvider from 'redux-persist/lib/storage'
import { createBrowserHistory } from 'history'
import { BrowserRouter as Router, Route } from 'dva/router'
import routeList from '@/route'
import { reduxModels } from '@/utils/combiner'
import { loaderState } from '@/utils/dispatchLoader'
import { logStateChange } from '@/utils/commonUtil'
import CONSTANT from '@/utils/constant'
// use global style
import './global.scss'

// init webapp
const app = dva({
  history: createBrowserHistory(),
  onReducer: (combineReducer) => {
    return persistReducer(
      {
        key: CONSTANT.STORAGE_PROVIDER_KEY,
        blacklist: ['_persist', '@@dva', 'routing'],
        whitelist: ['BASE'],
        keyPrefix: CONSTANT.STORAGE_PROVIDER_PREFIX,
        debug: process.env.NODE_ENV === 'development',
        storage: storageProvider
      },
      combineReducer
    )
  }
})

// use a state log middleware
app.use(logStateChange())

// root element rooter
app.router(() => {
  loaderState().set('app', app)
  persistStore(app._store)
  return (
    <Router>
      <Route path={'/'} component={routeList['/main-rect']} />
    </Router>
  )
})

// use all model combined
reduxModels().map((model) => app.model(model))

// webapp boot strap
app.start('#main')
