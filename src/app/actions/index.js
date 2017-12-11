export function appResize(newWidth, newHeight){
  return {
    type: "APP_RESIZE",
    payload: {
      windowWidth: newWidth,
      windowHeight: newHeight
    }
  }
}
