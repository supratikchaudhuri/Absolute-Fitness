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
import {validatemail, validPhone} from '../utils/inputValidation.js';

import img1 from "../Images/img1.jpg";
import logoImg from "../Images/AbsoluteFitnessLogo.jpg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

const login = async () => {
  console.log(username +" . " + password);
  if(validatemail(username) || validPhone(username)) {
    try {
      const res = await axios.post("user/login", {username, password})
      navigate('/home');
    } catch (err) {
      alert("Wrong username or password.\n Please try again.")
      setPassword("");
      setUsername("");
    }
  } else {
    alert("please check if the values are correct")
  }
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
                
                <MDBInput wrapperClass='mb-4' label='Enter email or phone' type='text' size="lg"
                  onChange={(e) => setUsername(e.target.value)} name = 'username' value={username}/>
                
                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"
                  onChange={(e) => setPassword(e.target.value)} value={password}/>

              <MDBBtn className="mb-4 px-5" color='dark' size='lg' type='submit' onClick={login}>Login</MDBBtn>
              <a className="small text-muted" href="#!">Forgot password?</a>
              <p className="mb-5 pb-lg-2" >Don't have an account? <a href="signup" style={{color: '#ffb703'}}>Register here</a></p>

              <div className='d-flex flex-row justify-content-start'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
}

export default Login;