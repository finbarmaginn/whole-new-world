const general = function reducer(state = {
  windowWidth: null,
  windowHeight: null
}, action) {
  switch (action.type) {
    case "APP_RESIZE": {
      return {
        ...state,
        windowWidth: action.payload.windowWidth,
        windowHeight: action.payload.windowHeight
      }
    } case "INIT_APP": {
      return {
        ...state,
        windowWidth:action.payload.windowWidth,
        windowHeight: action.payload.windowHeight
      }
    }
  }
  return state
}

export default general
