// top of react tree
import React, {Component} from 'react'

class App extends Component {
  render(){
    let {username} = this.props
    return(
      <div>
        <h1>React App</h1>
        {username}
      </div>
    )
  }
}

export default App
