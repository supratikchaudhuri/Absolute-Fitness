import React from "react";

const AlertBox = ({ message, type }) => {
  return (
    <div className={`mt-3 col width-100 alert alert-${type} alert-box`}>
      {message}
    </div>
  );
};

export default AlertBox;
