import React from "react";
import { Router } from "react-router";
import history from "@app/shared/utils/history";
import { Route, Switch } from "react-router-dom";
import routes from "@app/shared/constants/routes";
import Home from "@app/pages/home/home";
import Login from "@app/pages/login/login";
// https://v5.reactrouter.com/core/api/Hooks/uselocation

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={routes.DASHBOARD} component={Home} />
        <Route exact path={routes.HOME} component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
