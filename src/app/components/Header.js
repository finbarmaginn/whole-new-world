import React from 'react'
import Nav from './Nav'
import {Link} from 'react-router-dom'

class Header extends React.Component{
  render(){
    return (
      <header>
        <section>
          <h1><Link to="/">Isomorphic React App</Link></h1>
          <h2>by Finbar Maginn</h2>
          <Nav />
        </section>
      </header>
    )
  }
}

export default Header;
