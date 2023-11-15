// https://www.robinwieruch.de/react-router-private-routes/

import React from "react";
import { Outlet } from "react-router-dom";

const PrivateRoute = ({ redirectPath = "/login", children }) => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  if (!user.accessToken) {
    return (
      <>
        <a className="btn btn-primary" href="/login">
          Please Login to acess
        </a>
      </>
    );
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
