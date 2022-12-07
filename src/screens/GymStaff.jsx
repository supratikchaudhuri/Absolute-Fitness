import axios from 'axios';
import { MDBBtn, MDBCol, MDBInput, MDBRow } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react'
import Table from '../components/Table';
function GymStaff() {
  const user = JSON.parse(localStorage.getItem('user'))

  const [staff, setStaff] = useState(null)
  const [showEditForm, setShowEditForm] = useState(false);

  const displayEditForm = (e) => {
    setShowEditForm(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // const res = axios.
    } catch(err) {
      console.log(err);
    }
    
    setShowEditForm(false)
  }

  const deleteUser = async (e, email) => {
    console.log(email);
    try {
      // await axios.delete(`/user/${email}`)
      getStaff();
      alert("Staff successfuly deleted !")
    }
    catch(err) {
      console.log(err);
    }
  }

  const getStaff = async() => {
    console.log("here");
    try {
      const res = await axios.get(`/gym/${user.gym_id}/staff`);
      setStaff(res.data);
      console.log(res.data);
    }
    catch(err) {
      console.log(err);
    }
  }

  const addUser = async () => {
    alert('user added')
    try {
      // await axios.put();
    }
    catch(err) {

    }

    getStaff();
  }

  useEffect(() => {
    getStaff();
  }, [])

  return (
    staff 
    ?
    <div className='gym-staff-div'>
      <div className='edit-form-div' style={{display: showEditForm ? 'inline' : 'none'}}>
        <form className='m-4' onSubmit={handleSubmit}>
          <MDBRow className='mb-4 w-3'>
            <MDBCol>
              <MDBInput id='form3Example1' label='First name' />
            </MDBCol>
            <MDBCol>
              <MDBInput id='form3Example2' label='Last name' />
            </MDBCol>
          </MDBRow>
          <MDBInput className='mb-4' type='email' id='form3Example3' label='Email address' />
          <MDBInput className='mb-4' type='password' id='form3Example4' label='Password' />

          <MDBBtn type='submit' className='mb-0' block>
            Update
          </MDBBtn>
          <MDBBtn color='danger' onClick={e => setShowEditForm(false)} className='mb-0' block>
            Cancle
          </MDBBtn>
        </form>
      </div>

      <Table 
        content='staff' 
        data={staff} 
        handleSubmit={handleSubmit} 
        deleteUser={deleteUser}
        displayEditForm={displayEditForm}>  
      </Table>

      <MDBBtn onClick={addUser}>Add Staff</MDBBtn>

    </div>
    :
    <div>No staff in this gym yet</div>
  )
}

export default GymStaff