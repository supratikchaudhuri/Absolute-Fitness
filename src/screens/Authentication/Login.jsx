import React, { useState } from "react";

import img1 from "../../Images/img1.jpg";
import logoImg from "../../Images/AbsoluteFitnessLogo.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post("user/login", { username, password });
      console.log(res.data);
      try {
        const res1 = await axios.get(`user/${username}`);
        const user = res1.data;
        localStorage.setItem("user", JSON.stringify(user));
        console.log(JSON.parse(localStorage.getItem("user")));

        const res2 = await axios.get(`gym/${user.gym_id}`);
        const user_gym = res2.data;
        localStorage.setItem("user_gym", JSON.stringify(user_gym));
        console.log(JSON.parse(localStorage.getItem("user_gym")));
      } catch (err1) {
        console.log(err1);
      }

      navigate("/home");
      window.location.reload(); // doing this to view navbar
    } catch (err) {
      alert("Invalid username or password.\n Please try again.");
      setPassword("");
    }
  };

  const GoogleSuccess = (res) => {
    //store credentials in th background
    const { email, name, picture } = jwt_decode(res.credential);
    localStorage.setItem("user", JSON.stringify({ picture, name, email }));
    navigate("/home");
    window.location.reload();
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

        <form className="login-form col-md-8 ms-2">
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
          <input
            id="password-input"
            className="form-control form-control mb-4"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <p className="center">
            <button
              className=" center btn btn-dark mb-2 px-5"
              type="submit"
              onClick={login}
              style={{ margin: "auto" }}
            >
              Login
            </button>
          </p>
          <p className=" center small mb-2 mt-0">Or</p>

          <div className="center">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                GoogleSuccess(credentialResponse);
              }}
              onError={() => {
                alert("Login with Google failed\n Please try again");
              }}
            />
          </div>

          <p className="center small mt-2 mb-0 pb-lg-2">
            Don't have an account? <a href="signup">Signup here</a>
          </p>
          <p className="center small mb-5 pb-lg-2">
            Are you a staff? <a href="staff-login">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
