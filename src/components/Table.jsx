import React, {useEffect, useState} from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBIcon, MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn } from 'mdb-react-ui-kit';

function Table({cols, rows}) {

  const [showEditForm, setShowEditForm] = useState(false);
  // console.log(editFormCSS);

  // useEffect(() => {
  //   console.log(editFormCSS);
  // }, [editFormCSS])

  const displayEditForm = (e) => {
    setShowEditForm(true);
  }

  const handleEdit = (e) => {
    e.preventDefault()
    //edit login
    //axios post
    setShowEditForm(false)
  }

  return (
    <>
    <div className='edit-form-div' style={{display: showEditForm ? 'inline' : 'none'}}>
      <form className='m-4' onSubmit={handleEdit}>
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
      </form>
    </div>
    
    <MDBTable className='table mt-5' align='middle'>
      <MDBTableHead light>
        <tr>
					{
						cols.map(
							(item) => <th scope='col'>{item}</th>
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
              {/* {user.isAdmin && <td><MDBIcon className= "icon" fas icon="pen" /></td>} */}

              <td><MDBIcon className= "icon" fas icon="pen" onClick={displayEditForm}/></td>
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