import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from '../Utils/Common';

// handle the private routes
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => getToken() ? <Component {...props} /> : <Redirect to={{ pathname: process.env.PUBLIC_URL + '/login', state: { from: props.location } }} />}
    />
  )
}

export default PrivateRoute;