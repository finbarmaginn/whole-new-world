export function initApp(newWidth, newHeight){
  return {
    type: "INIT_APP",
    payload: {
      windowWidth: newWidth,
      windowHeight: newHeight
    }
  }
}

export function appResize(newWidth, newHeight){
  return {
    type: "APP_RESIZE",
    payload: {
      windowWidth: newWidth,
      windowHeight: newHeight
    }
  }
}
