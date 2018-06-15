import React from 'react'
import { combineComponent } from '@/utils/combiner'
import dispatchLoader from '@/utils/dispatchLoader'
import model from './model.js'
import './css.scss'

class test1 extends React.Component {
  static defaultProps = {
    customerList: []
  }

  getCustomerList = () => {
    dispatchLoader(this.props.dispatch, {
      type: 'test1/customerList',
      url: '/api/myproj/customList',
      method: 'POST',
      payload: {
        a: 1,
        b: 2,
        c: 3
      }
    })
  }
  componentDidMount() {
    console.log('>> indexPage:', 'start!')
    console.log('this.props', this.props)
  }
  render() {
    let { customerList } = this.props
    console.log('customerList:', customerList)
    return(
      <div className={'user-list'}>
        <button onClick={this.getCustomerList}>获取客户信息</button>
        {
          customerList.map((eachUserInfo, index) => {
            return (
              <div className={'user-info-item'} key={`user-info-item-${index}`}>
                <span className={'label'}>姓名：</span>
                <span className={'username'}>{eachUserInfo.name}</span>
                <span className={'label'}>年龄：</span>
                <span className={'age'}>{eachUserInfo.age}</span>
              </div>
            )
          })
        }
        <br />
      </div>
    )
  }
}

export default combineComponent({
  c: test1,
  model: model,
  modelEx: [
    {
      namespance: 'base',
      stateProp: 'showloading'
    }
  ]
})
