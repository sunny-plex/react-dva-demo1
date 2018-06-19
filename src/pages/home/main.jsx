import React from 'react'
import { combineComponent } from '@/utils/combiner'
import { homeService } from "@/utils/service"
import model from './model.js'
import './css.scss'

class home extends React.Component {
  static defaultProps = {
    hello: ''
  }

  getCustomerList = () => {
    homeService.homeInit('home init: hello world!')
  }

  gotoTest1 = () => {
    const { history } = this.props
    history.push('/test1')
  }

  render() {
    let { hello } = this.props
    return(
      <div className={'home-rect'}>
        <button onClick={this.getCustomerList}>世界你好！</button>
        <div className={'hello-world'}>{hello}</div>
        <br /><br />
        <button onClick={this.gotoTest1}>前往页面：test1</button>
      </div>
    )
  }
}

export default combineComponent({
  c: home,
  model: model,
  modelEx: [
    {
      namespace: 'base',
      stateProp: 'comLoading'
    }
  ]
})
