import React from "react"
import Messages from "./Messages"
import { BrowserRouter as Router, Route } from "react-router-dom"

class App extends React.Component {
  render () {
    return (
      <>
        <Router>
          <Route exact path="/" component={Messages} />
        </Router>
      </>
    );
  }
}

export default App
