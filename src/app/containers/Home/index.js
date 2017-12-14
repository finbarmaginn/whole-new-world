import React from 'react'

if(process.env.BROWSER) require('./home.scss')

class Home extends React.Component {
  render() {
    return (
      <section>
        <h3>Home</h3>
      </section>
    )
  }
}

export default Home
