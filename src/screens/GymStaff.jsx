import axios from 'axios';
import { MDBBtn, MDBCol, MDBInput, MDBRow, MDBTextArea } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react'
import Table from '../components/Table';
function GymStaff() {
  const user = JSON.parse(localStorage.getItem('user'))

  const [staff, setStaff] = useState(null)
  const [showEditForm, setShowEditForm] = useState(false);
  const [staffDetails, setStaffDetails] = useState(null);
  const [showAddStaffForm, setShowAddStaddForm] = useState(false);
  const [newStaffDetails, setNewStaffDetails] = useState({
    name: '', 
    gymId: user.gym_id, 
    description: '',
    password: 'password',
    phone: '',
    salary: '',
    partTime: false
  })


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
      alert(err.response.data.msg);
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
      alert(err.response.data.msg);
    }
  }

  const getStaff = async() => {
    try {
      const res = await axios.get(`/gym/${user.gym_id}/staff`);
      setStaff(res.data);
    }
    catch(err) {
      alert(err.response.data.msg);
    }
  }

  const addStaff = async () => {
    // alert('user added')
    try {
      const res = await axios.post(`/staff/signup`, newStaffDetails);
      getStaff();
    }
    catch(err) {
      alert(err.response.data.msg);
    }
  }

  useEffect(() => {
    getStaff();
  }, [])



  const renderEditForm = (
    staffDetails && 
    <div className='edit-form-div' style={{display: showEditForm ? 'inline' : 'none'}}>
      <form className='m-4 popup-form' onSubmit={e => {e.preventDefault(); handleSubmit(staffDetails)}}>
      <MDBRow className='mb-4 w-3'>
          <MDBCol>
            <MDBInput disabled
              label='ID' 
              name='staff_id'
              value={staffDetails.staff_id} 
            />
          </MDBCol>
          <MDBCol>
            <MDBInput 
              label='Part Time' 
              name='part_time'
              value={staffDetails.part_time} 
              onChange={e => setStaffDetails({...staffDetails, [e.target.name]: e.target.value})}
            />
          </MDBCol>
          <MDBCol>
            <MDBInput 
              label='Salary'
              name='salary' 
              value={staffDetails.salary} 
              onChange={e => setStaffDetails({...staffDetails, [e.target.name]: e.target.value})}
            />
          </MDBCol>
        </MDBRow>

        <MDBRow className='mb-4 w-3'>
          <MDBCol>
            <MDBInput 
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
    <>
    <div className='add-staff-form' style={{display: showAddStaffForm ? 'inline' : 'none'}}>
      <form className='m-4 popup-form' onSubmit={e => {e.preventDefault(); addStaff(newStaffDetails)}}>
        <MDBRow className='mb-3 w-3'>
          <MDBCol>
            <MDBInput disabled
              label='ID' 
              name='staffId'
              value={newStaffDetails.staffId} 
            />
          </MDBCol>
          <MDBCol>
            <MDBInput 
              label='Part Time' 
              name='partTime'
              value={newStaffDetails.partTime} 
              onChange={e => setNewStaffDetails({...newStaffDetails, [e.target.name]: e.target.value})}
            />
          </MDBCol>
          <MDBCol>
            <MDBInput 
              label='Salary'
              name='salary' 
              value={newStaffDetails.salary} 
              onChange={e => setNewStaffDetails({...newStaffDetails, [e.target.name]: e.target.value})}
            />
          </MDBCol>
        </MDBRow>

        <MDBRow className='mb-3'>
          <MDBCol>
            <MDBInput 
              label='Staff Name' 
              name='name'
              value={newStaffDetails.name} 
              onChange={e => setNewStaffDetails({...newStaffDetails, [e.target.name]: e.target.value})}
            />
          </MDBCol>

          <MDBCol>
            <MDBInput 
              label='Phone' 
              name='phone'
              value={newStaffDetails.phone} 
              onChange={e => setNewStaffDetails({...newStaffDetails, [e.target.name]: e.target.value})}
            />
          </MDBCol>
        </MDBRow>

        <MDBRow className='mb-3'>
          <MDBCol>
            <MDBInput
              label='description'
              name='description'
              value={newStaffDetails.description}
              onChange={e => setNewStaffDetails({...newStaffDetails, [e.target.name]: e.target.value})}
            />
          </MDBCol>
        </MDBRow>

        <MDBBtn type='submit' className='mb-0' block onClick={e => setShowAddStaddForm(false)}>
          Add Staff
        </MDBBtn>
        <MDBBtn color='danger' onClick={e => setShowAddStaddForm(false)} className='mb-0' block type='button'>
          Cancel
        </MDBBtn>
      </form>
    </div>


    {
      staff 
      ?
      <div className='gym-staff-div'>
        {renderEditForm}
        <Table 
          content='staff' 
          data={staff} 
          deleteItem={deleteUser}
          displayEditForm={displayEditForm}
          renderEditForm={renderEditForm} 
          setStaffDetails={setStaffDetails}
        >
        </Table>

        <MDBBtn onClick={e => setShowAddStaddForm(true)}>Add Staff</MDBBtn>

      </div>
      :
      <div>No staff in this gym yet</div>
    }
    </>
  )
}

export default GymStaff