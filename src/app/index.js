import React, {Component} from 'react'
import {connect} from 'react-redux'
import {appResize, initApp} from './actions'

if(process.env.BROWSER){
  require('./scss/style.scss')
}
require('./icons/favicon.ico')
require('./icons/splat-512.png')
require('./manifest.json')



@connect((store) => {
  return {
    windowWidth: store.general.windowWidth,
    windowHeight: store.general.windowHeight
  }
})

class App extends Component {
  componentDidMount(){
    if (typeof window !== 'undefined') {
      window.addEventListener("resize", this.viewerResize.bind(this))
      this.props.dispatch(initApp(window.innerWidth, window.innerHeight))
    }
  }

  viewerResize() {
    this.props.dispatch(appResize(window.innerWidth, window.innerHeight))
  }
  render(){
    let {windowWidth, windowHeight} = this.props
    return(
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default App
