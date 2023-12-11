import React, { useState } from "react";

import img1 from "../../Images/img1.jpg";
import logoImg from "../../Images/AbsoluteFitnessLogo.jpg";
import { requestResetPassword } from "../../api/authenticate";
import AlertBox from "../../components/AlertBox";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [msg, setMsg] = useState(undefined);

  const sendLinToEmail = async (e) => {
    e.preventDefault();
    const _msg = await requestResetPassword(username);
    setMsg(_msg);
  };
  return (
    <div className="container">
      <div className="d-flex flex-row mt-5">
        <div className="d-none d-md-block col-md-4">
          <img
            id="login-image"
            src={img1}
            alt="login-form-img"
            className="rounded-start h-100 w-100"
          />
        </div>

        <form
          className="login-form col-md-8 ms-2"
          onSubmit={(e) => sendLinToEmail(e)}
        >
          <div className="d-flex flex-row mt-2 w-100">
            <img
              src={logoImg}
              alt="login form"
              className="rounded center"
              style={{ "max-width": "100px" }}
            />
          </div>

          <h5 className="center mt-2 mb-4">
            Reset your Absolte Fitness Account Password
          </h5>

          <label for="email-input" className="form-label mb-2">
            Email
          </label>
          <input
            id="email-input"
            className="form-control form-control mb-2"
            type="email"
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            required
            value={username}
          />

          <p className="center">
            <button
              className=" center btn btn-dark mt-2 mb-2 px-5"
              type="submit"
              style={{ margin: "auto" }}
            >
              Get Password Reset Link
            </button>
          </p>

          {msg && <AlertBox message={msg} type="primary" />}

          <p className=" center small mb-2 mt-0">Or</p>

          <p className="center small mt-2 mb-0 pb-lg-2">
            Don't have an account? <a href="/signup">Signup here</a>
          </p>
          <p className="center small mb-0 pb-lg-2">
            Already have an account? <a href="/login">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
