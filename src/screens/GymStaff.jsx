import axios from 'axios';
import { MDBBtn, MDBCol, MDBInput, MDBRow, MDBTextArea } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react'
import Table from '../components/Table';
function GymStaff() {
  const user = JSON.parse(localStorage.getItem('user'))

  const [staff, setStaff] = useState(null)
  const [showEditForm, setShowEditForm] = useState(false);
  const [staffDetails, setStaffDetails] = useState(null);

  const displayEditForm = (e) => {
    setShowEditForm(true);
  }

  const handleSubmit = async (updatedStaff) => {
    try {
      updatedStaff['staffId'] = updatedStaff['staff_id']
      updatedStaff['partTime'] = updatedStaff['part_time']

      const res = await axios.put(`/staff/${updatedStaff.staff_id}`, updatedStaff);
      getStaff();
      alert('Staff updated successfully!')
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
    try {
      const res = await axios.get(`/gym/${user.gym_id}/staff`);
      setStaff(res.data);
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



  const renderEditForm = (
    staffDetails && 
    <div className='edit-form-div' style={{display: showEditForm ? 'inline' : 'none'}}>
      <form className='m-4' onSubmit={e => {e.preventDefault(); handleSubmit(staffDetails)}}>
      <MDBRow className='mb-4 w-3'>
          <MDBCol>
            <MDBInput id='form3Example1' disabled
              label='ID' 
              name='staff_id'
              value={staffDetails.staff_id} 
            />
          </MDBCol>
          <MDBCol>
            <MDBInput id='form3Example2' 
              label='Part Time' 
              name='part_time'
              value={staffDetails.part_time} 
              onChange={e => setStaffDetails({...staffDetails, [e.target.name]: e.target.value})}
            />
          </MDBCol>
          <MDBCol>
            <MDBInput id='form3Example2' 
              label='Salary'
              name='salary' 
              value={staffDetails.salary} 
              onChange={e => setStaffDetails({...staffDetails, [e.target.name]: e.target.value})}
            />
          </MDBCol>
        </MDBRow>

        <MDBRow className='mb-4 w-3'>
          <MDBCol>
            <MDBInput id='form3Example1' 
              label='First name' 
              name='name'
              value={staffDetails.name} 
              onChange={e => setStaffDetails({...staffDetails, [e.target.name]: e.target.value})}
            />
          </MDBCol>
          <MDBCol>
            <MDBInput 
              label='Phone' 
              value={staffDetails.phone} 
              name='phone'
              onChange={e => setStaffDetails({...staffDetails, [e.target.name]: e.target.value})}
            />
          </MDBCol>
        </MDBRow>
        <MDBTextArea className='mb-4' id='textAreaExample' rows={3} 
          label='Job Description'
          name='description'
          value={staffDetails.description} 
          onChange={e => setStaffDetails({...staffDetails, [e.target.name]: e.target.value})}
          />
        <MDBBtn type='submit' className='mb-0' block>
          Update
        </MDBBtn>
        <MDBBtn color='danger' onClick={e => setShowEditForm(false)} className='mb-0' block type='button'>
          Cancel
        </MDBBtn>
      </form>
    </div>
  )

console.log(staffDetails);
  return (
    staff 
    ?
    <div className='gym-staff-div'>
      {renderEditForm}
      <Table 
        content='staff' 
        data={staff} 
        deleteUser={deleteUser}
        displayEditForm={displayEditForm}
        renderEditForm={renderEditForm} 
        setStaffDetails={setStaffDetails}
      >
      </Table>

      <MDBBtn onClick={addUser}>Add Staff</MDBBtn>

    </div>
    :
    <div>No staff in this gym yet</div>
  )
}

export default GymStaff