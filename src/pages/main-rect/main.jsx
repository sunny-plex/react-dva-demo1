import React from 'react'
import { Route } from 'dva/router'
import { combineComponent } from '@/utils/combiner'
import routeList from '@/route'

import model from './model'
import './css.scss'

class commonComponents extends React.Component {
  static defaultProps = {}
  render() {
    console.log(this.props.pageRoutes)
    return (
      <Route>
        <div className={'main-body'}>
          {
            Object.keys(routeList).map((route) => {
              return (<Route path={route} component={routeList[route]} key={route} />)
            })
          }
        </div>
      </Route>
    )
  }
}

export default combineComponent({
  c: commonComponents,
  model: model
})
