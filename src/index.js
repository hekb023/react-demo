import React from "react";
import ReactDom from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./index.css";
import reducers from "./reducer";
import "./config";

import AuthRoute from "./container/authRoute/authRoute";
import Login from "./container/login/login";
import Register from "./container/register/register";
import Bossinfo from "./container/bossinfo/bossinfo";
import Geniusinfo from "./container/geniusinfo/geniusinfo";
import Dashboard from "./container/dashboard/dashboard";

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : () => {}
  )
);

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute />
        <Switch>
          <Route path="/geniusinfo" component={Geniusinfo} />
          <Route path="/bossinfo" component={Bossinfo} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
