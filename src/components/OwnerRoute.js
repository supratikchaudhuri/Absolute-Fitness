// https://www.robinwieruch.de/react-router-private-routes/

import React from "react";
import { Outlet } from "react-router-dom";
import AlertBox from "./AlertBox";

const OwnerRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  console.log(children);

  if (!user.accessToken || !user.isSubscribed) {
    return (
      <>
        <AlertBox
          message="Rights reserved for Absolute Fitness Gymnasium Owner only"
          type="danger"
        />
      </>
    );
  }

  return children || <Outlet />;
};

export default OwnerRoute;
