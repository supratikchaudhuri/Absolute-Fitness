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
import {validatemail, validatePassword} from '../utils/inputValidation.js';

function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const login = () => {
  if(validatemail(email) && validatePassword(password)) {
    alert("You've logged in!")
  } 
  else {
    alert("Please enter a valid email id or password.")
  }
}

  return (
    <MDBContainer className="my-5">

      <MDBCard>
        <MDBRow className='g-0'>

          <MDBCol md='4'>
            <MDBCardImage src='https://img.freepik.com/free-vector/simple-dark-gym-motivational-mobile-wallpaper_23-2149442206.jpg?w=360' alt="login form" className='rounded-start h-100' />
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2'>
              <MDBCardImage src='https://image3.mouthshut.com/images/imagesp/925964509s.jpg' alt="login form" className='rounded' style={{'height': '70px'}}/>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Log into your account</h5>
                
                <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg"
                  onChange={(e) => setEmail(e.target.value)}/>
                
                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"
                  onChange={(e) => setPassword(e.target.value)}/>

              <MDBBtn className="mb-4 px-5" color='dark' size='lg' type='submit' onClick={login}>Login</MDBBtn>
              <a className="small text-muted" href="#!">Forgot password?</a>
              <p className="mb-5 pb-lg-2" >Don't have an account? <a href="" style={{color: '#393f81'}}>Register here</a></p>

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