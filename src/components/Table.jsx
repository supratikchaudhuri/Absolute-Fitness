import React, {useEffect, useState} from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBIcon, MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn } from 'mdb-react-ui-kit';

function Table({content, data, deleteUser, displayEditForm}) {
  const user = JSON.parse(localStorage.getItem('user'));

  const cols = Object.keys(data[0]);

  const rows = []
  for(var i = 0; i < data.length; i++) {
    rows.push(Object.values(data[i]))
  }
  console.log(rows);

  return (
    <>
    
    <MDBTable className='table mt-0' align='middle'>
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

              <div className='update-btn-table'>
                {user.type === 'admin' && content==='staff' 
                  && <td><MDBIcon style={{marginRight: '30px'}} className= "icon" fas icon="pen" onClick={displayEditForm}/></td>}

                {user.type === 'admin' 
                  && <td><MDBIcon className= "icon" fas icon="trash" onClick={e => deleteUser(e, row[0])} /></td>}
              </div>
              
						</tr>
						
					)
				}
        
      </MDBTableBody>
    </MDBTable>

    </>
  )
}

export default Table