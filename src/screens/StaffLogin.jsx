import React, { useContext, useState } from 'react';
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

function StaffLogin() {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const staffLogin = async () => {

    try {
      localStorage.clear();
      const res = await axios.post("staff/login", {username, password})
      console.log(res.data);
      
      try {
        const res1 = await axios.get(`staff/${username}`)
        const user = res1.data
        localStorage.setItem('user', JSON.stringify(user))
        console.log(JSON.parse(localStorage.getItem('user')));

        const res2 = await axios.get(`gym/${user.gym_id}`)
        const user_gym = res2.data;
        localStorage.setItem('user_gym', JSON.stringify(user_gym))
        console.log(JSON.parse(localStorage.getItem('user_gym')));

      } catch (err1) {
        alert(err1.response.data.msg);
      }

      navigate('/home');
      window.location.reload();

    } catch (err) {
      alert(err.response.data.msg || err)
      setPassword("");
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

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Log into staff account</h5>
                
                <MDBInput wrapperClass='mb-4' label='Staff Id' type='text' size="lg"
                  onChange={(e) => setUsername(e.target.value)} name = 'username' value={username}/>
                
                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"
                  onChange={(e) => setPassword(e.target.value)} value={password}/>

              <MDBBtn className="mb-4 px-5" color='dark' size='lg' type='submit' onClick={staffLogin}>Login</MDBBtn>

              <p className="small mb-5 pb-lg-2" >Not a staff? <a href="login" style={{color: '#ffb703'}}>Login here</a></p>

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
}

export default StaffLogin;