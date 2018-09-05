import React from 'react'
import { combineComponent } from '@/utils/combiner'
import { Button, Icon } from '@/components/ui'
import { setTitle, linkToWithParam } from '@/utils/commonUtil'
import dispatchX from '@/utils/dispatchLoader'
import API_LIST from '@/utils/apiList'
import CONSTANT from '@/utils/constant'

import model from './model.js'
import './css.xcss'

class UnderConstruct extends React.Component {
  static defaultProps = {}

  componentDidMount() {
    setTitle('页面建设中')
  }

  componentWillUnmount() {
    if (API_LIST === CONSTANT) {
      (() => { return { dispatchX, linkToWithParam, Button }})()
    }
  }

  render() {
    return (
      <div className={'page-under-construct'}>
        <div className={'under-construct-box'}>
          <Icon type="tool" />
          <div className={'under-construct-notice'}>当前页面建设中</div>
          <div className={'under-construct-notice'}>Page Under Construct</div>
        </div>
      </div>
    )
  }
}

export default combineComponent({
  c: UnderConstruct,
  model: model
})
