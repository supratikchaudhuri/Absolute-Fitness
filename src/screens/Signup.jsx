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
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    name: '',
    phone: '',
    email: '',
    dob: '',
    password: '',
    sex: '',
    gymId: -1
  });

  const [gymAddressId, setGymAddressId] = useState([]);
  

  useEffect(() => {
    // getting all gym locations 
    const getAllGyms = async () => {
      try {
        const res = await axios.get("gym/");
        const gymData = res.data;
        setGymAddressId(gymData)
      } catch (err) {
        console.log(err);
      }
    }

    getAllGyms();

  }, [])
  //console.log(gymAddressId);  // need to print or above useEffect don't work as expected


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
      formValue.sex !== ''            &&
      formValue.gymId !== -1          &&
      validatePassword(formValue.password)) {
        
        try {
          const res = await axios.post('user/signup', formValue)

          try {
            const res1 = await axios.get(`user/${formValue.email}`)
            const user = res1.data
            localStorage.setItem('user', JSON.stringify(user))
            
          } catch (err1) {
            console.log(err1);
          }

          navigate('/home');
          window.location.reload();

        }
        catch(err) {
          alert(err.response.data.msg);
        }

      }
    else {
      alert("Please fill all the fields correctly")
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

              <h5 className="fw-normal my-4" style={{letterSpacing: '1px'}}>Sign up for an account</h5>
                
          
              <MDBInput wrapperClass='mb-4' label='Full Name' type='text' size="lg"
              onChange={handleChange} name = 'name' value={formValue.name}/>
                

              <MDBRow>
                <MDBCol size="md">
                <MDBInput wrapperClass='col-md-10 mb-3' label='Date of birth' type='date' size="lg" 
                  onChange={handleChange} name = 'dob'  value={formValue.dob} max={new Date().toJSON().slice(0, 10)}/>
                </MDBCol>
                <MDBCol size="md" className='mb-3'>
                  <select name='sex' onChange={handleChange} value={formValue.sex}>
                  <option value="">--Select Gender--</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </MDBCol>

                <MDBCol style={{maxWidth: '150px'}} className='mb-3'>
                  <select name='gymId' onChange={handleChange} value={formValue.gymId} style={{maxWidth: '300px'}}>
                  <option value="-1">--Select Gym Address--</option>
                  {
                    gymAddressId.map(gym => (
                      <option value={gym.gym_id}>{gym.location}</option>
                    ))
                  }
                  </select>
                </MDBCol>
                
              </MDBRow>
                
              <div>
                <MDBInput wrapperClass='mb-0' label='Phone Number' type='text' size="lg"
                  onChange={handleChange} name = 'phone'   value={formValue.phone}/>
                <div className='form-text mb-3'>
                  Must be 10 digits long
                </div>
              </div>
              

              <MDBInput wrapperClass='mb-4' label='Email address' type='email' size="lg"
                onChange={handleChange} name = 'email'   value={formValue.email}/>
            
              
              <div> 
                <MDBInput wrapperClass='mb-0' label='Choose a password' type='password' size="lg"
                  onChange={handleChange} name = 'password'  value={formValue.password}/>
                <div className='form-text mb-3'>
                  atleast 8 letters and have 1 uppercase, lowercase and special character (!@#$%^&*)
                </div>
              </div>
              

              <MDBBtn className="mb-4 px-5" color='dark' size='lg' type='submit' onClick={signup}>Sign Up</MDBBtn>
              
              <p className="mb-1 pb-lg-2" >Already have an account? 
                <a href="login" style={{color: '#ffb703'}}>  Log in</a>
              </p>
            

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
}

export default Signup;