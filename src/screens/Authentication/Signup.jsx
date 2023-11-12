import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";

import axios from "axios";

import {
  validatemail,
  validatePassword,
  validateText,
  validPhone,
} from "../../utils/inputValidation";

import img1 from "../../Images/img1.jpg";
import logoImg from "../../Images/AbsoluteFitnessLogo.jpg";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: null,
    email: "",
    password: null,
    dob: null,
    sex: "",
    gymId: -1,
  });

  const [gymAddressId, setGymAddressId] = useState([]);

  useEffect(() => {
    // getting all gym locations
    const getAllGyms = async () => {
      try {
        const res = await axios.get("gym/");
        const gymData = res.data;
        setGymAddressId(gymData);
      } catch (err) {
        console.log(err);
      }
    };

    getAllGyms();
  }, []);
  //console.log(gymAddressId);  // need to print or above useEffect don't work as expected

  useEffect(() => {
    console.log(userDetails); //using this cuz setState lagging one step behind
  }, [userDetails]);

  const handleChange = (e) => {
    userDetails((o) => ({
      ...o,
      [e.target.name]: e.target.value,
    }));
  };

  const signup = async () => {
    if (
      validateText(userDetails.name) &&
      validatemail(userDetails.email) &&
      validPhone(userDetails.phone) &&
      userDetails.dob !== "" &&
      userDetails.sex !== "" &&
      userDetails.gymId !== -1 &&
      validatePassword(userDetails.password)
    ) {
      try {
        const res = await axios.post("user/signup", userDetails);

        try {
          const res1 = await axios.get(`user/${userDetails.email}`);
          const user = res1.data;
          localStorage.setItem("user", JSON.stringify(user));
        } catch (err1) {
          console.log(err1);
        }

        navigate("/home");
        window.location.reload();
      } catch (err) {
        alert(err.response.data.msg);
      }
    } else {
      alert("Please fill all the fields correctly");
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

          <div className="row">
            <div className="col-xs-12 col-md-6">
              <label for="name-input" className="form-label mb-2">
                Name
              </label>
              <input
                id="name-input"
                className="form-control form-control mb-2"
                type="text"
                onChange={(e) => userDetails(e.target.value)}
                name="name"
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
                onChange={(e) => userDetails(e.target.value)}
                name="phone"
                value={userDetails.phone}
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
                onChange={(e) => userDetails(e.target.value)}
                name="email"
                value={userDetails.email}
                required
              />
            </div>
            <div className="col-xs-12 col-md-6">
              <label for="password-input" className="form-label mb-2">
                Password
              </label>
              <input
                id="password-input"
                className="form-control form-control mb-4"
                type="password"
                onChange={(e) => setUserDetails(e.target.value)}
                value={userDetails.password}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-6">
              <label for="dob-input" className="form-label mb-2">
                Date of Birth
              </label>
              <input
                id="dob-input"
                type="date"
                className="form-control mb-2"
                onChange={(e) => setUserDetails(e.target.value)}
                required
              />
            </div>
            <div className="col-xs-12 col-md-6">
              <label for="sex-input" className="form-label mb-2">
                Sex
              </label>
              <br />
              <select required className="custom-select w-100" id="sex-input">
                <option value="1">Male</option>
                <option value="2">Female</option>
                <option value="3">hijda</option>
              </select>
            </div>
          </div>

          <p className="center mt-3">
            <button
              className=" center btn btn-dark mb-2 px-5"
              type="submit"
              onClick={signup}
              style={{ margin: "auto" }}
            >
              Sign up
            </button>
          </p>
          <p className=" center small mb-2 mt-0">Or</p>

          {/* <div className="center">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                GoogleSuccess(credentialResponse);
              }}
              onError={() => {
                alert("Login with Google failed\n Please try again");
              }}
            />
          </div> */}

          <p className="center small mt-2 mb-0 pb-lg-2">
            Have an account? <a href="login">Login here</a>
          </p>
          <p className="center small mb-5 pb-lg-2">
            Are you a staff? <a href="staff-login">Login here</a>
          </p>
        </form>
      </div>
    </div>
    // <MDBContainer className="my-3">
    //   <MDBCard>
    //     <MDBRow className="g-0">
    //       <MDBCol md="4">
    //         <MDBCardImage
    //           src={img1}
    //           alt="login form"
    //           className="rounded-start h-100"
    //         />
    //       </MDBCol>

    //       <MDBCol md="6">
    //         <MDBCardBody className="d-flex flex-column">
    //           <div className="d-flex flex-row mt-2">
    //             <MDBCardImage
    //               src={logoImg}
    //               alt="login form"
    //               className="rounded"
    //               style={{ height: "70px" }}
    //             />
    //           </div>

    //           <h5 className="fw-normal my-4" style={{ letterSpacing: "1px" }}>
    //             Sign up for an account
    //           </h5>

    //           <MDBInput
    //             wrapperClass="mb-4"
    //             label="Full Name"
    //             type="text"
    //             size="lg"
    //             onChange={handleChange}
    //             name="name"
    //             value={userDetails.name}
    //           />

    //           <MDBRow>
    //             <MDBCol size="md">
    //               <MDBInput
    //                 wrapperClass="col-md-10 mb-3"
    //                 label="Date of birth"
    //                 type="date"
    //                 size="lg"
    //                 onChange={handleChange}
    //                 name="dob"
    //                 value={userDetails.dob}
    //                 max={new Date().toJSON().slice(0, 10)}
    //               />
    //             </MDBCol>
    //             <MDBCol size="md" className="mb-3">
    //               <select
    //                 name="sex"
    //                 onChange={handleChange}
    //                 value={userDetails.sex}
    //               >
    //                 <option value="">--Select Gender--</option>
    //                 <option value="Male">Male</option>
    //                 <option value="Female">Female</option>
    //                 <option value="Other">Other</option>
    //               </select>
    //             </MDBCol>

    //             <MDBCol style={{ maxWidth: "150px" }} className="mb-3">
    //               <select
    //                 name="gymId"
    //                 onChange={handleChange}
    //                 value={userDetails.gymId}
    //                 style={{ maxWidth: "300px" }}
    //               >
    //                 <option value="-1">--Select Gym Address--</option>
    //                 {gymAddressId.map((gym) => (
    //                   <option value={gym.gym_id}>{gym.location}</option>
    //                 ))}
    //               </select>
    //             </MDBCol>
    //           </MDBRow>

    //           <div>
    //             <MDBInput
    //               wrapperClass="mb-0"
    //               label="Phone Number"
    //               type="text"
    //               size="lg"
    //               onChange={handleChange}
    //               name="phone"
    //               value={userDetails.phone}
    //             />
    //             <div className="form-text mb-3">Must be 10 digits long</div>
    //           </div>

    //           <MDBInput
    //             wrapperClass="mb-4"
    //             label="Email address"
    //             type="email"
    //             size="lg"
    //             onChange={handleChange}
    //             name="email"
    //             value={userDetails.email}
    //           />

    //           <div>
    //             <MDBInput
    //               wrapperClass="mb-0"
    //               label="Choose a password"
    //               type="password"
    //               size="lg"
    //               onChange={handleChange}
    //               name="password"
    //               value={userDetails.password}
    //             />
    //             <div className="form-text mb-3">
    //               atleast 8 letters and have 1 uppercase, lowercase and special
    //               character (!@#$%^&*)
    //             </div>
    //           </div>

    //           <MDBBtn
    //             className="mb-4 px-5"
    //             color="dark"
    //             size="lg"
    //             type="submit"
    //             onClick={signup}
    //           >
    //             Sign Up
    //           </MDBBtn>

    //           <p className="mb-1 pb-lg-2">
    //             Already have an account?
    //             <a href="login" style={{ color: "#ffb703" }}>
    //               {" "}
    //               Log in
    //             </a>
    //           </p>
    //         </MDBCardBody>
    //       </MDBCol>
    //     </MDBRow>
    //   </MDBCard>
    // </MDBContainer>
  );
}

export default Signup;
