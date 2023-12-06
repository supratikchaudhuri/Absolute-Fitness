import React, { useState } from "react";

import img1 from "../../Images/img1.jpg";
import logoImg from "../../Images/AbsoluteFitnessLogo.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StaffLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const staffLogin = async () => {
    try {
      localStorage.clear();
      const res = await axios.post("staff/login", { username, password });
      const user = res.data;

      try {
        localStorage.setItem("user", JSON.stringify(user));
        console.log(JSON.parse(localStorage.getItem("user")));

        const res2 = await axios.get(`gym/${user.gym_id}`, {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        });
        const user_gym = res2.data;
        localStorage.setItem("user_gym", JSON.stringify(user_gym));

        window.location.href = "/home";
      } catch (err1) {
        alert(err1.response.data.msg);
      }
    } catch (err) {
      alert(err.response.data.msg || err);
      //   setPassword("");
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
            Staff ID
          </label>
          <input
            id="email-input"
            className="form-control form-control mb-2"
            type="email"
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            placeholder="staff"
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
              onClick={staffLogin}
              style={{ margin: "auto" }}
            >
              Login
            </button>
          </p>
          <p className=" center small mb-2 mt-0">Or</p>

          <p className="center small mb-5 pb-lg-2">
            Not a staff? <a href="login">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default StaffLogin;
