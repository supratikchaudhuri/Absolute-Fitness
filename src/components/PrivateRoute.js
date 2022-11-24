import React from 'react';
import { Navigate, Route } from 'react-router-dom';

export default function PrivateRoute({ component: Component, ...rest }) {
  const user = localStorage.getItem('user');
  
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props}></Component>
        ) : (
          <Navigate to="/signup" />
        )
      }
    ></Route>
  );
}