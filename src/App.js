import React from "react";
import { Route, Switch, Router } from "react-router-dom";
import "./App.css";
import Registration from "./views/Registration";
import Login from "./views/Login";
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Registration} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
