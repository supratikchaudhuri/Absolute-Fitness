import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  validatemail,
  validatePassword,
  validateText,
  validPhone,
} from "../../utils/inputValidation";

import img1 from "../../Images/img1.jpg";
import logoImg from "../../Images/AbsoluteFitnessLogo.jpg";
import { signup } from "../../api/user";

function Signup() {
  const [userDetails, setUserDetails] = useState({
    name: null,
    phone: null,
    email: null,
    password: null,
    dob: null,
    sex: null,
    gymId: -1,
  });

  const [gyms, setGyms] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const getAllGyms = async () => {
    const data = await getAllGyms();
    setGyms(data);
  };

  useEffect(() => {
    getAllGyms();
  }, []);

  const handleChange = (e) => {
    setUserDetails((o) => ({
      ...o,
      [e.target.name]: e.target.value,
    }));
  };
  console.log(userDetails);

  const signupMethod = async (e) => {
    e.preventDefault();
    console.log(userDetails);
    // if (
    //   validateText(userDetails.name) &&
    //   validatemail(userDetails.email) &&
    //   validPhone(userDetails.phone) &&
    //   userDetails.dob !== "" &&
    //   userDetails.sex !== "" &&
    //   userDetails.gymId !== -1 &&
    //   validatePassword(userDetails.password)
    // ) {
    try {
      const status = await signup(userDetails);
      if (status === 200) window.location.href = "/home";
    } catch (err) {
      throw err;
    }
  };
  // else {
  //   alert("Please fill all the fields correctly");
  // }
  //   };

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
          onSubmit={(e) => signupMethod(e)}
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

          <div className="row">
            <div className="col-xs-12 col-md-6">
              <label for="name-input" className="form-label mb-2">
                Name
              </label>
              <input
                id="name-input"
                className="form-control form-control mb-2"
                type="text"
                onChange={handleChange}
                name="name"
                placeholder="James Wiliams"
                value={userDetails.name}
                required
              />
            </div>
            <div className="col-xs-12 col-md-6">
              <label for="phone-input" className="form-label mb-2">
                Phone
              </label>
              <input
                id="phone-input"
                className="form-control form-control mb-2"
                type="number"
                onChange={handleChange}
                name="phone"
                value={userDetails.phone}
                placeholder="9876543210"
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-6">
              <label for="email-input" className="form-label mb-2">
                Email
              </label>
              <input
                id="email-input"
                className="form-control form-control mb-2"
                type="email"
                onChange={handleChange}
                name="email"
                placeholder="Jame@gmail.com"
                value={userDetails.email}
                required
              />
            </div>
            <div className="col-xs-12 col-md-6">
              <label for="password-input" className="form-label mb-2">
                Password
              </label>
              <div className="row">
                <div className="col-11">
                  <input
                    id="password-input"
                    className="form-control form-control mb-4"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    value={userDetails.password}
                    required
                  />
                </div>
                <div
                  className="col-1"
                  onClick={(e) => setShowPassword(!showPassword)}
                >
                  <i class="fa-solid fa-eye"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-6 mb-3">
              <label for="dob-input" className="form-label mb-2">
                Date of Birth
              </label>
              <input
                id="dob-input"
                type="date"
                name="dob"
                className="form-control mb-2"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-xs-12 col-md-6">
              <label for="sex-input" className="form-label mb-2">
                Sex
              </label>
              <br />
              <select
                required
                className="custom-select w-100"
                id="sex-input"
                name="sex"
                onChange={(e) =>
                  setUserDetails((o) => ({
                    ...o,
                    sex: e.target.value,
                  }))
                }
              >
                <option>Choose your sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col col-xs-12">
              <label for="gym-input" className="form-label mb-2">
                Choose your gym
              </label>
              <select
                required
                className="custom-select w-100"
                id="gym-input"
                name="gymId"
                onChange={(e) =>
                  setUserDetails((o) => ({
                    ...o,
                    gymId: parseInt(e.target.value, 10),
                  }))
                }
              >
                <option>Choose your gym</option>
                {gyms.map((gym) => (
                  <option key={gym.gym_id} value={gym.gym_id}>
                    {gym.branch || `Zip: ${gym.pincode}`} Branch
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="center mt-3">
            <button
              className=" center btn btn-dark mb-2 px-5"
              type="submit"
              style={{ margin: "auto" }}
            >
              Sign up
            </button>
          </p>
          <p className=" center small mb-2 mt-0">Or</p>

          <p className="center small mt-2 mb-0 pb-lg-2">
            Have an account? <a href="/login">Login here</a>
          </p>
          <p className="center small mb-5 pb-lg-2">
            Are you a staff? <a href="/staff-login">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
