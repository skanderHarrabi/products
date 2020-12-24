import React, { useRef } from "react";
import { connect, Provider } from "react-redux";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import HomePage from "./pages/home-page/Home";
import PageNotFound from "./pages/404/404";
import store from "./stores/store-dev";
import './App.scss';



const App = props => {
  return (
    <Provider store={store}>
      <div className={"app"}>
        <Switch location={props.history.location}>
          <Route exact path={"/"} component={HomePage} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Provider>
  );
};

const mapStateToProps = reduxStore => {
  return {
    isLoggedIn: reduxStore.authReducer.isLoggedIn,
    user: reduxStore.authReducer.user,
    isLoadingUser: reduxStore.authReducer.isLoadingUser
  };
};

export default withRouter(
  connect(
    mapStateToProps,
  )(App)
);
