import React from 'react'
import dva from 'dva'
import { BrowserRouter as Router, Route } from 'dva/router'
import { createBrowserHistory } from 'history'
import { reduxModels } from '@/utils/combiner'
import { loaderState } from '@/utils/dispatchLoader'
import mainRect from '@/pages/main-rect/main'
import './global.scss'

const app = dva({
  history: createBrowserHistory()
})

app.router(() =>
  <Router>
    <Route path={'/'} component={mainRect} />
  </Router>
)

reduxModels().map((model) => app.model(model))
loaderState().set('app', app)

app.start('#main-rect')
