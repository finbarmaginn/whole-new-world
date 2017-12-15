import React from 'react'
import Nav from '../Nav'
import {Link} from 'react-router-dom'

// if(process.env.BROWSER) require('./header.scss')

class Header extends React.Component {
  render() {
    return (<header>

      <section>
        <h1>
          <Link to="/">Isomorphic React App</Link>
          <br/>
          <span>by Finbar Maginn</span>
        </h1>
        <Nav/>
      </section>
    </header>)
  }
}

export default Header;
