import React, { useState, useEffect } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';

import axios from 'axios';

import {validatemail, validatePassword, validateText, validPhone} from '../utils/inputValidation';

import img1 from "../Images/img1.jpg";
import logoImg from "../Images/AbsoluteFitnessLogo.jpg";

function Signup() {

  const [formValue, setFormValue] = useState({
    name: '',
    phone: '',
    email: '',
    dob: '',
    password: '',
    sex: 'Male',
    gymId: 1
  });


  useEffect(() => {
    console.log(formValue); //using this cuz setState lagging one step behind
  }, [formValue])

  const handleChange = (e) => {
    // setFormValue({ ...formValue, [e.target.name]: e.target.value });
    setFormValue(prevState => ({...prevState, [e.target.name]: e.target.value}));
  };

  const signup = async () => {
    if(validateText(formValue.name)   &&
      validatemail (formValue.email)  &&
      validPhone(formValue.phone)     &&
      formValue.dob !== ''            && 
      validatePassword(formValue.password)) {
        console.log("Your Account has been sent for approval.");
        console.log(formValue);
        
        try {
          const res = await axios.post('user/signup', formValue)
          console.log(res);
        }
        catch(err) {
          console.log(err);
        }

      }
    else {
      alert("wrong values")
    }

    


    //send grid send email saying that make sure you've paid for shit.
  }

  return (
    <MDBContainer className="my-3">

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

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign up for an account</h5>
                
                {/* <MDBRow>
                  <MDBCol size="md"> */}
                  <MDBInput wrapperClass='col-md-11 mb-4' label='Full Name (only letter ans space allowed)' type='text' size="lg"
                  onChange={handleChange} name = 'name' value={formValue.name}/>
                  {/* </MDBCol>
                  <MDBCol size="md">
                    <MDBInput wrapperClass='col-md-11 mb-4' label='Last Name' type='text' size="lg"
                    onChange={handleChange} name = 'lname'  value={formValue.lname}/>
                  </MDBCol>
                </MDBRow> */}

                <MDBRow>
                  <MDBCol size="md">
                  <MDBInput wrapperClass='col-md-11 mb-4' label='Date of birth' type='date' size="lg"
                    onChange={handleChange} name = 'dob'  value={formValue.dob}/>
                  </MDBCol>
                  <MDBCol size="md" >

                    <select name='sex' onChange={handleChange} value={formValue.sex}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>

                  </MDBCol>
                </MDBRow>

                <MDBInput wrapperClass='mb-4' label='Phone Number (10 digits)' type='text' size="lg"
                  onChange={handleChange} name = 'phone'   value={formValue.phone}/>

                <MDBInput wrapperClass='mb-4' label='Email address' type='email' size="lg"
                  onChange={handleChange} name = 'email'   value={formValue.email}/>
              
                <MDBInput wrapperClass='mb-4' label='Choose password (must have 1 uppercase, lowecase and special char)' type='password' size="lg"
                  onChange={handleChange} name = 'password'  value={formValue.password}/>

              <MDBBtn className="mb-4 px-5" color='dark' size='lg' type='submit' onClick={signup}>Sign Up</MDBBtn>
              <a className="small text-muted" href="#!">Forgot password?</a>
              
              <p className="mb-1 pb-lg-2" >Already have an account? 
                <a href="login" style={{color: '#ffb703'}}>  Log in</a>
              </p>

              <a href="#!" className="small text-muted me-1">Terms of use.</a>
              <a href="#!" className="small text-muted">Privacy policy</a>

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
}

export default Signup;