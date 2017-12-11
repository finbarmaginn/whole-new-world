// top of react tree
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {appResize} from './actions'
import Header from './components/Header'
import Footer from './components/Footer'
// require('./css/style.css')

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
    return(
      <div>
        <Header />
        <section>
          <p>
            {this.props.windowWidth} + {this.props.windowHeight}
          </p>
        </section>
        <Footer />
      </div>
    )
  }
}

export default App
