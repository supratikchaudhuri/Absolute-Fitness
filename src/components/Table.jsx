import React, {useEffect, useState} from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBIcon, MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';

function Table({content, data}) {
  const user = JSON.parse(localStorage.getItem('user'));

  const [showEditForm, setShowEditForm] = useState(false);
  const cols = Object.keys(data[0]);

  const rows = []
  for(var i = 0; i < data.length; i++) {
    rows.push(Object.values(data[i]))
  }
  console.log(rows);

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
    // try {
    //   const res = axios.delete(`/user/${email}`)
    //   alert("Member successfuly deleted !")
    // }
    // catch(err) {
    //   console.log(err);
    // }
  }

  return (
    <>
    {
      content === 'members' 
      &&
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
    }

    {
      content === 'staff'
      &&
      <div>staff form</div>
    }
    
    
    
    <MDBTable className='table mt-5' align='middle'>
      <MDBTableHead light>
        <tr>
					{
						cols.map(
							(item) => <th scope='col'>{item.toUpperCase()}</th>
						)
					}
        </tr>
      </MDBTableHead>
      <MDBTableBody>
				{
					rows.map((row, idx) => 
						<tr key={idx}>
							{row.map((item) => 
								<td>{item}</td>
							)
							}

              
              {user.type === 'member' && <td><MDBIcon className= "icon" fas icon="pen" onClick={displayEditForm}/></td>}
              {user.type === 'admin' && <td><MDBIcon className= "icon" fas icon="trash" onClick={e => deleteUser(e, row[0])} /></td>}
						</tr>
						
					)
				}


        <tr>
          <th scope='row'>1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        
      </MDBTableBody>
      <tfoot>
        <tr>
          <td>Footer</td>
          <td>Footer</td>
          <td>Footer</td>
          <td>Footer</td>
        </tr>
      </tfoot>
    </MDBTable>

    </>
  )
}

export default Table