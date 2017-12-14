import React from 'react'

if (process.env.BROWSER) require('./footer.scss')

class Header extends React.Component {
  render() {
    return (
      <footer>
        <section>
          <p>Footer Component</p>
        </section>
      </footer>
    )
  }
}

export default Header;
