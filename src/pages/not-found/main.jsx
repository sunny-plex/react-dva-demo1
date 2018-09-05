import React from 'react'
import { combineComponent } from '@/utils/combiner'
import { setTitle } from '@/utils/commonUtil'
import { Icon } from '@/components/ui'

import model from './model.js'
import './css.xcss'

class NotFound extends React.Component {
  static defaultProps = {}

  componentDidMount() {
    setTitle('页面不存在')
  }

  render() {
    return (
      <div className={'page-not-found'}>
        <div className={'not-found-box'}>
          <Icon type="disconnect" />
          <div className={'not-found-notice'}>您访问的页面不存在</div>
          <div className={'not-found-notice'}>Page Not Found</div>
        </div>
      </div>
    )
  }
}

export default combineComponent({
  c: NotFound,
  model: model
})
