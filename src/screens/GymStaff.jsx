import React, { useState } from 'react'
function GymStaff() {
  const user = JSON.parse(localStorage.getItem('user'))

  cosnt [staff, setStaff] = useState(null)
  const [showEditForm, setShowEditForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // const res = axios.
    } catch(err) {
      console.log(err);
    }
    
    setShowEditForm(false)
  }

  return (
    staff 
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

      Gym Staffs

      <Table 
        content='members' 
        data={staff} 
        handleSubmit={handleSubmit} 
        displayEditForm={displayEditForm}>  
      </Table>

    </div>
    :
    <div>No members in this gym yet</div>
  )
}

export default GymStaff