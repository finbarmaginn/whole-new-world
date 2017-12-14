import React from 'react'
import {connect} from 'react-redux'

if(process.env.BROWSER) require('./about.scss')

@connect((store) => {
  return {
    windowWidth: store.general.windowWidth,
    windowHeight: store.general.windowHeight
  }
})

class About extends React.Component {
  render() {
    let {windowWidth, windowHeight} = this.props;
    return (
      <section>
        <h3>About</h3>
        <p className="browserSize">{windowWidth} + {windowHeight}</p>
      </section>
    )
  }
}

export default About
