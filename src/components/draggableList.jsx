import React from 'react'
import { Button, ClassNameX, Icon } from '@/components/ui'

export default class DraggableList extends React.Component {
  static defaultProps = {
    className: '',
    listItems: [],
    itemShow: 6,
    itemHeight: 70,
    heightUnit: 'px',
    onListDragged: () => {}
  }

  state = {
    listItems: []
  }

  listItemDOM = []
  dragRelativeTop = 0

  refDragRelative = (ref) => {
    this.dragRelativeTop = ref.offsetTop
  }

  refDragItem = (index) => {
    return (ref) => {
      this.listItemDOM[index] = ref
    }
  }

  pickDraggingBarFromEvent = (event) => {
    let dragEvent
    if (event.changedTouches) {
      dragEvent = event.changedTouches[0]
    } else {
      dragEvent = event
    }
    const dragTarget = event.target
    const dragItem = dragTarget.parentElement.parentElement
    const isDraggingBar = dragTarget.classList.value.indexOf('anticon-retweet') !== -1
    if (isDraggingBar) {
      return {
        isDraggingBar: true,
        offSet: {
          x: dragEvent.clientX,
          y: dragEvent.clientY
        },
        draggingItem: dragItem,
        draggingItemIndex: this.listItemDOM.indexOf(dragItem)
      }
    }
    return {
      isDraggingBar: false
    }
  }

  handleDragStart = (event) => {
    // console.log('dragStart', event.target)
    const draggingData = this.pickDraggingBarFromEvent(event)
    if (draggingData.isDraggingBar) {
      this.dragStartOffSet = draggingData.offSet
      console.log('handleDragStart', draggingData.offSet);
    }
  }

  handleDragging = (event) => {
    // console.log('draging', event.target)
    const { itemHeight } = this.props
    const draggingData = this.pickDraggingBarFromEvent(event)
    if (draggingData.isDraggingBar) {
      const indexDeviation = Math.round((draggingData.offSet.y - this.dragStartOffSet.y) / itemHeight)
      // console.log('draggingOffSet', draggingData.offSet, '     indexDeviation', indexDeviation);
    }
  }

  handleDragEnd = (event) => {
    // console.log('dragEnd', event.target)
    const { itemHeight, onListDragged } = this.props
    const draggingData = this.pickDraggingBarFromEvent(event)
    if (draggingData.isDraggingBar) {
      const listItems = Object.assign([], this.state.listItems)
      const dragItemIndex = draggingData.draggingItemIndex
      const dragItemViewIndex = listItems[dragItemIndex].index
      const indexDeviation = Math.round((draggingData.offSet.y - this.dragStartOffSet.y) / itemHeight)
      let targetIndex = dragItemViewIndex + indexDeviation
      console.log('draggingOffSet:', draggingData.offSet, ' | indexDeviation:', indexDeviation, ' | targetIndex:', targetIndex);
      if (targetIndex < 0) {
        targetIndex = 0
      }
      if (targetIndex > (this.listItemDOM.length - 1)) {
        targetIndex = (this.listItemDOM.length - 1)
      }

      let swapItemIndex = -1
      listItems.map((item, index) => { if (item.index === targetIndex) { swapItemIndex = index } })
      // const swapItemViewIndex = listItems[swapItemIndex].index
      listItems[dragItemIndex].index = listItems[swapItemIndex].index
      this.setState({ listItems: listItems })
      setTimeout(() => {
        listItems[swapItemIndex].index = dragItemViewIndex
        this.setState({ listItems: listItems })
      }, 300)
      onListDragged(listItems)
    }
  }

  componentDidMount () {
    // console.log('DraggableList componentDidMount')
    this.setState({listItems: this.props.listItems})
  }

  componentWillReceiveProps(nextProps) {
    // console.log('DraggableList componentWillReceiveProps')
    this.setState({listItems: nextProps.listItems})
  }

  render() {
    const { className, itemHeight, itemShow, heightUnit } = this.props
    const { listItems } = this.state
    const wrapClassName = ['draggable-list'].concat(className)
    return (
      <div className={ClassNameX(wrapClassName)}>
        <Button className={ClassNameX('roll-btn', {toggle: 'hide', by: 1})} type={'primary'}>
          <Icon type="caret-up" />
        </Button>
        <div className={'draggable-content'} ref={this.refDragRelative} style={{height: itemShow * itemHeight + heightUnit}}>
          {
            listItems.map((listItem, index) => {
              return (
                <div
                  className={'draggable-item'}
                  key={index}
                  ref={this.refDragItem(index)}
                  onDragStart={this.handleDragStart}
                  onDrag={this.handleDragging}
                  onDragEnd={this.handleDragEnd}
                  onTouchStart={this.handleDragStart}
                  onTouchMove={this.handleDragging}
                  onTouchEnd={this.handleDragEnd}
                  style={{marginTop: listItem.index * itemHeight + heightUnit}}
                >
                  <div className={'item-content'}>
                    {listItem.element}
                  </div>
                  <div className={'item-drag-handle'}>
                    <Icon type="retweet" draggable={true} />
                  </div>
                </div>
              )
            })
          }
        </div>
        <Button className={ClassNameX('roll-btn', {toggle: 'hide', by: 1})} type={'primary'} disabled={true}>
          <Icon type="caret-down" />
        </Button>
      </div>
    )
  }
}