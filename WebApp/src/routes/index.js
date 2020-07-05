import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({match}) => (
  <div className="gx-main-content-wrapper gx-py-4 gx-px-5">
    <Switch>
      <PrivateRoute path={`${match.url}appointments`} role="seller" component={asyncComponent(() => import('./Appointments'))}/>
      <PrivateRoute path={`${match.url}availability`} role="seller" component={asyncComponent(() => import('./Availability'))}/>
    </Switch>
  </div>
);

const PrivateRoute = ({ component: Component, role: Role, ...rest }) => {
  const isAuthenticate = (localStorage.getItem('token'));
  const role = JSON.parse(localStorage.getItem('data')).role;
  let roleCheck = true;
  if (role !== Role) roleCheck = false;
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticate && roleCheck) {
          return <Component {...props} />
        } else {
          return <Redirect
            to={{
              pathname: "/not-found",
              state: { from: props.location }
            }}
          />
        }
      }
      }
    />
  );
}

export default App;
