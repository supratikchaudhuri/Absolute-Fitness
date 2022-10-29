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
import {validatemail, validatePassword, validateText} from '../utils/inputValidation';

function Signup() {

  const [formValue, setFormValue] = useState({
    fname: '',
    lname: '',
    email: '',
    dob: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

const signup = () => {
  if(validateText(formValue.fname) &&
    validateText(formValue.lname) &&
    validatemail (formValue.email) &&
    formValue.dob != '' && 
    validatePassword(formValue.password)) {
      console.log("Your Account has been sent for approval.");
    }
  else {
    alert("wrong values")
  }
  //send grid send email saying that make sure you've paid for shit.
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

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign up for an account</h5>
                
                <MDBRow>
                  <MDBCol size="md">
                    <MDBInput wrapperClass='col-md-11 mb-4' label='First Name' type='text' size="lg"
                    onChange={handleChange} name = 'fname' value={formValue.fname}/>
                  </MDBCol>
                  <MDBCol size="md">
                    <MDBInput wrapperClass='col-md-11 mb-4' label='Last Name' type='text' size="lg"
                    onChange={handleChange} name = 'lname'  value={formValue.lname}/>
                  </MDBCol>
                </MDBRow>
                

                <MDBInput wrapperClass='col-md-5 mb-4' label='Date of birth' type='date' size="lg"
                    onChange={handleChange} name = 'dob'  value={formValue.dob}/>

                <MDBInput wrapperClass='mb-4' label='Email address' type='email' size="lg"
                  onChange={handleChange} name = 'email'   value={formValue.email}/>
              
                <MDBInput wrapperClass='mb-4' label='Choose a password' type='password' size="lg"
                  onChange={handleChange} name = 'password'  value={formValue.password}/>

              <MDBBtn className="mb-4 px-5" color='dark' size='lg' type='submit' onClick={signup}>Sign Up</MDBBtn>
              <a className="small text-muted" href="#!">Forgot password?</a>
              <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Already have an account? <a href="#!" style={{color: '#393f81'}}>Log in</a></p>

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

export default Signup;