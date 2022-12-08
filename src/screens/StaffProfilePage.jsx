import React, {useEffect, useState} from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBTextArea
} from 'mdb-react-ui-kit';
import axios from 'axios';

//can merge this page with ProfilePage screen in the future if have time
function StaffProfilePage() {
  const user = JSON.parse(localStorage.getItem('user'));

  const [showEditForm, setShowEditForm] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({...user, ['password']: null})

  const handleChange = (e) => {
    setUpdatedProfile({...updatedProfile, [e.target.name]: e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      console.log("here");
      const res = await axios.put(`/staff/${user.staff_id}`, {...updatedProfile, ['gymId']: user.gym_id});
      let newProfile = updatedProfile
      delete newProfile.password
      console.log(newProfile);
      localStorage.setItem('user', JSON.stringify(newProfile));
      setShowEditForm(false)
    }
    catch(err) {
      console.log(err);
    }
  }
  console.log(updatedProfile);

  return (
    <>
    <div className='edit-form-div' style={{display: showEditForm ? 'inline' : 'none'}}>
        <form className='m-4 popup-form' onSubmit={handleSubmit}>
          <MDBInput className='mb-4' type='email' label='Email address' disabled name='email' value={user.staff_id}/>
          
          <MDBRow className='mb-4 w-3'>
            <MDBCol>
              <MDBInput label='Name' name='name' value={updatedProfile.name} onChange={handleChange}/>
            </MDBCol>
            <MDBCol>
              <MDBInput label='phone' name='phone' value={updatedProfile.phone} onChange={handleChange}/>
            </MDBCol>
          </MDBRow>

          <MDBRow className='mb-4 w-3'>
            <MDBCol>
              <MDBInput label='Salary' name='salary' value={updatedProfile.salary} onChange={handleChange}/>
            </MDBCol>
            <MDBCol>
              <MDBInput label='Employment Type' name='part_time' value={updatedProfile.part_time} onChange={handleChange}/>
            </MDBCol>
          </MDBRow>

          <MDBTextArea className='mb-4' id='textAreaExample' rows={3} 
            label='Job Description'
            name='description'
            value={updatedProfile.description} 
            onChange={handleChange}
          />
          
          <MDBInput className='mb-4' type='password' label='Password' name='password' onChange={handleChange}/>

          <MDBBtn type='submit' className='mb-0' block>
            Update
          </MDBBtn>
          <MDBBtn type='button' color='danger' onClick={e => setShowEditForm(false)} className='mb-0' block>
            Cancel
          </MDBBtn>
        </form>
      </div>


    <div className='profile-div'>
      <MDBCard alignment='center'>
        <MDBCardHeader>
          <img src="https://static.scistarter.org/img/nobody.png" alt="Avatar" className="avatar"/>
        </MDBCardHeader>


        <MDBCardBody>
          <MDBCardTitle>{user.name}</MDBCardTitle>
          <MDBCardText>Staff ID: {user.staff_id}</MDBCardText>
          <MDBCardText>{user.type.toUpperCase()}</MDBCardText>
          <MDBCardText>Phone: {user.phone}</MDBCardText>
          <MDBCardText>Employment: {user.part_time ? 'Part Time' : 'Full Time'}</MDBCardText>
          <MDBCardText>Your Gym: {user.gym_id}</MDBCardText>
          <MDBCardText>Salary: {user.salary}</MDBCardText>
          <MDBCardText>Role: {user.description}</MDBCardText>

          
        </MDBCardBody>

        <MDBCardFooter className='text-muted'>
          <MDBBtn outline onClick={e => setShowEditForm(true)}>Edit Profile</MDBBtn>
        </MDBCardFooter>
      </MDBCard>
    </div>
    </>
  )
}

export default StaffProfilePage