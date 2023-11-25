import React from "react";

const AlertBox = ({ message, type, anchor }) => {
  return (
    <div className={`mt-3 col width-100 alert alert-${type} alert-box`}>
      {message}
      <br />
      {anchor && (
        <a href={anchor.href} className="center pointer">
          {anchor.name}
        </a>
      )}
    </div>
  );
};

export default AlertBox;
