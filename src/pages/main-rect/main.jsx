import React from 'react'
import { Route, Switch } from 'dva/router'
import { combineComponent } from '@/utils/combiner'
import { loaderState } from '@/utils/dispatchLoader'
import routeList from '@/route'
import { Icon } from '@/components/ui'

import model from './model'
import './css.scss'

class baseComponent extends React.Component {
  static defaultProps = {}
  state = {
    html: (document.getElementsByTagName('html') || [])[0],
    mainRectEl: document.getElementById('main'),
  }

  // calculate rem font-size
  calcRootEM = () => {
    const { html, mainRectEl } = this.state
    const { offsetWidth } = mainRectEl
    html.style.fontSize = offsetWidth / 25 + 'px'
  }

  comloadingDOM = (comLoadingStatus) => {
    if (comLoadingStatus) {
      return (
        <div className={'com-loading-rect'}>
          <Icon type="wifi">loading...</Icon>
        </div>
      )
    } else {
      return null
    }
  }

  componentWillMount() {
    // if you dont use rem, please disable the calcRootEM function
    // this.calcRootEM()
  }

  componentDidMount() {
    // if you dont use rem, please disable the calcRootEM function
    // window.addEventListener('resize', this.calcRootEM)
  }

  render() {
    const { comLoading, rehydrated, login } = this.props
    const headers = loaderState().get('requestHeaders')
    headers.token = login.token
    return (
      <object className={'base'} type={'base'}>
        <div className={'common'}>
          {this.comloadingDOM(comLoading)}
        </div>
        {
          rehydrated ? (
            <Switch>
              {
                Object.keys(routeList).map((route) => {
                  return (<Route path={route} component={routeList[route]} key={route} />)
                })
              }
              <Route path={'(/)'} component={routeList['/home']} />
              <Route path={'*'} component={routeList['/not-found']} />
            </Switch>
          ) : null
        }
      </object>
    )
  }
}

export default combineComponent({
  c: baseComponent,
  model: model,
  modelEx: [
    {
      namespace: '_persist',
      stateProp: 'rehydrated'
    }
  ]
})
