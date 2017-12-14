import React from 'react'
import {
  Link
} from 'react-router-dom'

if (process.env.BROWSER) require('./nav.scss')


class Nav extends React.Component {
  render() {
    return ( <
      nav >
      <
      ul >
      <
      li > < Link to = "/gallery" > Gallery < /Link></li >
      <
      li > < Link to = "/about" > About < /Link></li >
      <
      /ul> < /
      nav >
    )
  }
}

export default Nav