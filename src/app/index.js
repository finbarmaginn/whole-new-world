import React, {Component} from 'react'
import {connect} from 'react-redux'
import {appResize} from './actions'
import Header from './components/Header'
import Footer from './components/Footer'

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
      this.viewerResize()
    }
  }
  viewerResize() {
    this.props.dispatch(appResize(window.innerWidth, window.innerHeight))
  }
  render(){
    let {windowWidth, windowHeight} = this.props
    return(
      <div>
        <Header />
        <section>
          <p>{windowWidth} + {windowHeight}</p>
        </section>
        <Footer />
      </div>
    )
  }
}

export default App
