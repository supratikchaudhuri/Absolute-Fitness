import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from '../components/Table';
import { MDBInput, MDBCol, MDBRow, MDBBtn } from 'mdb-react-ui-kit';

function GymMembers() {
  const user = JSON.parse(localStorage.getItem('user'))

  const [members, setMembers] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const displayEditForm = (e) => {
    setShowEditForm(true);
  }

  const getMembers = async() => {
    try {
      const res = await axios.get(`/gym/${user.gym_id}/members`);
      setMembers(res.data);
    }
    catch(err) {
      console.log(err);
    }
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
      await axios.delete(`/user/${email}`)
      getMembers();
      alert("Member successfuly deleted !")
    }
    catch(err) {
      console.log(err);
    }
  }


  useEffect(() => {
    getMembers();
  }, [])
  

  return (
    
    members 
    ?
    <div className='gym-members-div'>
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
        content='members' 
        data={members} 
        deleteUser={deleteUser} 
        displayEditForm={displayEditForm}>  
      </Table>

    </div>
    :
    <div>No members in this gym yet</div>
    
  )
}

export default GymMembers