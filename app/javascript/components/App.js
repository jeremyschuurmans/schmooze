import React from "react"
import Navigation from "./Navigation"
import Messages from "./Messages"
import { BrowserRouter as Router, Route } from "react-router-dom"

class App extends React.Component {
  render() {
    return (
      <>
        <div id="root" className="relative flex w-full h-screen overflow-hidden antialiased bg-gray-200">
          <div className="relative flex flex-col hidden h-full bg-white border-r border-gray-300 shadow-xl md:block transform transition-all duration-500 ease-in-out"
            style={{ width: "24rem" }}>
            <div className="flex justify-between px-3 pt-1 text-white">
              <div className="flex items-center w-full py-2">
              </div>
            </div>
            <div className="border-b shadow-bot">
              <div className="flex flex-row items-center inline-block px-2 list-none select-none">
                <div className="flex-auto px-1 mx-1 -mb-px text-center rounded-t-lg last:mr-0">
                  <div
                    className="flex items-center justify-center block py-5 text-xl font-semibold leading-normal tracking-wide border-b-2 border-transparent">
                    Channels
                    </div>
                </div>
              </div>
            </div>
            {/* <Channels />
            <NewChannel /> */}
          </div>
          <div className="relative flex flex-col flex-1">
            <Navigation />
            {/* <Channel /> */}
            <Router>
              <Route exact path="/" component={Messages} />
            </Router>
          </div>
        </div>
      </>
    );
  }
}

export default App
