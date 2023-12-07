// https://www.robinwieruch.de/react-router-private-routes/

import React from "react";
import { Outlet } from "react-router-dom";

const SubscriberRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  console.log(user);
  if (
    !user.type === "root" ||
    !user.type === "admin" ||
    (user.type === "member" && !user.subscribed)
  ) {
    return (
      <>
        <div class="card m-4">
          <h5 class="card-header">Thanks for trusting Absolute Fitness</h5>
          <div class="card-body">
            <h5 class="card-title">
              Please subscribe to any memebership plans to unlick this feature
            </h5>

            <a href="/pricing-plans" class="btn btn-primary">
              Check Plans Here
            </a>
          </div>
        </div>
      </>
    );
  }

  return children || <Outlet />;
};

export default SubscriberRoute;
