import React from 'react'
import Nav from './Nav'

class Header extends React.Component{
  render(){
    return (
      <header>
        <section>
          <h1>Isomorphic React App</h1>
          <h2>by Finbar Maginn</h2>
          <Nav />
        </section>
      </header>
    )
  }
}

export default Header;
