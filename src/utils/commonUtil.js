import dispatchX, { loaderState } from '@/utils/dispatchLoader'

// set page title
export const setTitle = (title) => {
  document.title = title
}

// dom click history go
export const pushHistory = (history, path) => {
  return () => {
    history.push(path)
  }
}

// history go
export const linkToWithParam = (option) => {
  const { history, linkTo, paramState, param } = option
  return () => {
    dispatchX({
      type: paramState,
      payload: param
    })
    history.push(linkTo)
  }
}

// force history go anywhere
export const forcePushHistory = (path) => {
  const app = loaderState().get('app')
  const history = app._history
  history.push(path)
  history.go()
}

// fill number into some length string
export const fillNumber = (number, length) => {
  return (new Array(length).join(0) + number).slice(-length)
}

// log state middleware
export const logStateChange = () => {
  return {
    onStateChange: (state) => {
      if (process.env.NODE_ENV === 'development') {
        const dt = new Date()
        const groupName = `State Change ${fillNumber(dt.getHours(), 2)}:${fillNumber(dt.getMinutes(), 2)}′${fillNumber(dt.getSeconds(), 2)}″`
        console.group(groupName)
        console.log(state)
        console.groupEnd(groupName)
      }
    }
  }
}

const dateToLocaleObject = (date) => {
  return {
    year: date.getYear() + 1900,
    month: fillNumber(date.getMonth() + 1, 2),
    day: fillNumber(date.getDate(), 2),
    hour: fillNumber(date.getHours(), 2),
    minute: fillNumber(date.getMinutes(), 2),
    second: fillNumber(date.getSeconds(), 2)
  }
}

// timeObject
export const time = {
  dateToLocaleObject,
  UTCToLocale: (UTC10) => {
    const _date = new Date(UTC10 * 1000 - (new Date()).getTimezoneOffset() * 60000)
    return dateToLocaleObject(_date)
  }
}

export const joinThousandsSeparator = (num) => {
  return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}
