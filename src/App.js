import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";

import  "@fortawesome/fontawesome-free/js/all";
import TopBar from "./components/navbar/TopBar";
import Bio from "./components/Bio/Bio";
import useWindowDimensions from "./hooks/windowDims";

import "./App.scss";
import Showcase from "./components/Showcase/Showcase";
import Rainbow from "./components/Rainbow/Rainbow";
import { welcomeUser } from "./util/consoleMessage";

function App() {
  const { breakpoint } = useWindowDimensions();

  useEffect(() => {
    welcomeUser();
  }, []);

  return (
    <Router>
      <div id="App">
        <div bg="dark" variant="dark" className="mainContainer _container">
          <Switch>
            <Route exact path="/">
              <TopBar breakpoint={breakpoint} />

              <Bio />
              <Showcase />
            </Route>

            <Route exact path="/:item">
              <Showcase />
            </Route>
          </Switch>

          <Rainbow />
        </div>
      </div>
    </Router>
  );
}

export default App;
