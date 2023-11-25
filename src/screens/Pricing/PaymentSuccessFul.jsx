import React, { useEffect } from "react";
import gif from "../../Images/doggoGif.gif";

const PaymentSuccessFul = () => {
  useEffect(() => {
    const res = { accessToken: "dummy" };
    const newAccessToken = res.accessToken;
    // localStorage.setItem(
    //   "user",
    //   JSON.stringify({ ...res, accessToken: newAccessToken })
    // );
  }, []);
  return (
    <div className="container ">
      <div className="card text-center shadow p-3 mb-5 bg-white rounded">
        <div className="card-body">
          <img src={gif} alt="gif" />
          <h1 className="card-title mt-1">Payment Successful!</h1>
          <p className="card-text">Thank you for your purchase.</p>
          <a href="/" className="btn btn-primary">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessFul;
