import React from 'react'
import { combineComponent } from '@/utils/combiner'
import { testService } from "@/utils/service"
import model from './model.js'
import './css.scss'

class test1 extends React.Component {
  static defaultProps = {
    customerList: []
  }

  getCustomerList = () => {
    testService.getTestList({
      a: 1,
      b: 2,
      c: 3
    })
  }

  render() {
    let { customerList, comLoading } = this.props
    return(
      <div className={'user-list'}>
        <button onClick={this.getCustomerList}>请求示例列表{comLoading ? '(loading...)' : ''}</button>
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
      namespace: 'base',
      stateProp: 'comLoading'
    }
  ]
})
