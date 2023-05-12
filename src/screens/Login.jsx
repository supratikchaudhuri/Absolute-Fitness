import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';

import img1 from "../Images/img1.jpg";
import logoImg from "../Images/AbsoluteFitnessLogo.jpg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";



function Login() {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

const login = async () => {
  try {
    const res = await axios.post("user/login", {username, password})
    console.log(res.data);
    try {
      const res1 = await axios.get(`user/${username}`)
      const user = res1.data
      localStorage.setItem('user', JSON.stringify(user))
      console.log(JSON.parse(localStorage.getItem('user')));

      const res2 = await axios.get(`gym/${user.gym_id}`)
      const user_gym = res2.data;
      localStorage.setItem('user_gym', JSON.stringify(user_gym))
      console.log(JSON.parse(localStorage.getItem('user_gym')));


    } catch (err1) {
      console.log(err1);
    }

    navigate('/home');
    window.location.reload(); // doing this to view navbar

  } catch (err) {
    alert("Invalid username or password.\n Please try again.")
    setPassword("");
  }
}

const GoogleSuccess = (res) => {
  //store credentials in th background
  const {email, name, picture} = jwt_decode(res.credential)
  localStorage.setItem('user', JSON.stringify({picture, name, email}))
  navigate('/home');
    window.location.reload();
}

  return (
    <MDBContainer className="my-5">

      <MDBCard>
        <MDBRow className='g-0'>

          <MDBCol md='4'>
            <MDBCardImage src={img1} alt="login form" className='rounded-start h-100' />
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2'>
              <MDBCardImage src={logoImg} alt="login form" className='rounded' style={{'height': '70px'}}/>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Log into your account</h5>
                
                <MDBInput wrapperClass='mb-4' label='Enter email' type='email' size="lg"
                  onChange={(e) => setUsername(e.target.value)} name = 'username' value={username}/>
                
                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"
                  onChange={(e) => setPassword(e.target.value)} value={password}/>

              <MDBBtn className="mb-2 px-5" color='dark' size='lg' type='submit' onClick={login}>Login</MDBBtn>
              <p className='small mb-2 mt-0'>Or</p>

              <div className='third-party-auth'>
                <GoogleLogin
                  onSuccess={credentialResponse => {
                    GoogleSuccess(credentialResponse);
                  }}
                  onError={() => {
                    alert("Login with Google failed\n Please try again")
                  }}
                />
              </div>
              
              <p className="small mt-2 mb-0 pb-lg-2" >Don't have an account? <a href="signup" style={{color: '#ffb703'}}>Register here</a></p>
              <p className="small mb-5 pb-lg-2" >Are you a staff? <a href="staff-login" style={{color: '#ffb703'}}>Login here</a></p>

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
}

export default Login;