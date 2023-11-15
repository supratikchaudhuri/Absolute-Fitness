// https://www.robinwieruch.de/react-router-private-routes/

import React from "react";
import { Outlet } from "react-router-dom";

const PrivateRoute = ({ redirectPath = "/login", children }) => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  if (!user.accessToken) {
    return (
      <>
        <div class="card m-4">
          <h5 class="card-header">Thanks for trusting Absolute Fitness</h5>
          <div class="card-body">
            <h5 class="card-title">Please Log in to enjoy access</h5>
            <p class="card-text">
              This service may require subscriptions. Please login to continue.
            </p>
            <a href="/login" class="btn btn-primary">
              Login Here
            </a>
          </div>
        </div>
      </>
    );
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
