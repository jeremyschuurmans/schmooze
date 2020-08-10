import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

class App extends React.Component {
  render () {
    return (
      <>
        <Router>
          <Route exact path="/" render={()=> ("You're home!!")} />
        </Router>
      </>
    );
  }
}

export default App
