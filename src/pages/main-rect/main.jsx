import React from 'react'
import { Route } from 'dva/router'
import { combineComponent } from '@/utils/combiner'
import routeList from '@/route'

import model from './model'
import './css.scss'

class baseComponent extends React.Component {
  static defaultProps = {}
  render() {
    console.log('home:', this.props);
    return (
      <Route>
        <div className={'main-body'}>
          {
            Object.keys(routeList).map((route) => {
              return (<Route path={route} component={routeList[route]} key={route} />)
            })
          }
          <Route path={'(/)'} component={routeList['/home']} />
        </div>
      </Route>
    )
  }
}

export default combineComponent({
  c: baseComponent,
  model: model
})
