import React, { useState } from "react";

import img1 from "../../Images/img1.jpg";
import logoImg from "../../Images/AbsoluteFitnessLogo.jpg";
import { login } from "../../api/authenticate";

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const status = await login(username, password);
      if (status === 200) window.location.href = "/home";
    } catch (err) {
      alert("Invalid username or password.\n Please try again.");
    }
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
          onSubmit={(e) => loginUser(e)}
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
            Log into your Absolte Fitness Account
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
            value={username}
          />

          <label for="password-input" className="form-label mb-2">
            Password
          </label>
          <div className="row">
            <div className="col-11">
              <input
                id="password-input"
                className="form-control form-control mb-4"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div
              className="col-1"
              onClick={(e) => setShowPassword(!showPassword)}
            >
              <i class="fa-solid fa-eye"></i>
            </div>
          </div>

          <p className="center">
            <button
              className=" center btn btn-dark mb-2 px-5"
              type="submit"
              style={{ margin: "auto" }}
            >
              Login
            </button>
          </p>
          <p className=" center small mb-2 mt-0">Or</p>

          <p className="center small mt-2 mb-0 pb-lg-2">
            Don't have an account? <a href="/signup">Signup here</a>
          </p>
          <p className="center small mb-0 pb-lg-2">
            Are you a staff? <a href="/staff-login">Login here</a>
          </p>
          <p className="center small mb-5 pb-lg-2">
            Forgot Password? <a href="/forgot-password">Click here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;
