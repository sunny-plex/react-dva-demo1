import dva from 'dva'
import { BrowserRouter as Router, Route } from 'dva/router'
import { createBrowserHistory } from 'history'
import { reduxModels } from './utils/combiner'

import mainRect from './pages/main-rect/main'
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

app.start('#main-rect')
