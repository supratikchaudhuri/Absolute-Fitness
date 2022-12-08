import React from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdb-react-ui-kit';

function Table({content, data, deleteItem, displayEditForm, setStaffDetails, setEquipments}) {
  const user = JSON.parse(localStorage.getItem('user'));

  const cols = Object.keys(data[0]);

  const rows = []
  for(var i = 0; i < data.length; i++) {
    rows.push(Object.values(data[i]))
  }
  // console.log(rows);

  return (
    <>
    
    <MDBTable className='table mt-0 table' align='middle'>
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
								// <td>{console.log(item)}</td>
                <td>{item ? item : ''}</td>
							)
							}

              <div className='update-btn-table'>
                {user.type === 'admin' && content === 'staff'  
                  && <td><MDBIcon style={{marginRight: '30px'}} 
                        className= "icon" fas icon="pen" 
                        onClick={e => {displayEditForm(true); setStaffDetails(data[idx])}}/> 
                        {/* onClick={e => renderEditForm(row[0], row[1], row[2], row[3], row[4], row[5])}/>  */}
                      </td>}

                {user.type==='admin' && content==='equipments'
                  && <td><MDBIcon style={{marginRight: '30px'}} 
                        className= "icon" fas icon="pen" 
                        onClick={e => {displayEditForm(true); setEquipments([{...data[idx], image_url: data[idx].image_url.props.src}])}}/> 
                      </td>}

                {user.type === 'admin' 
                  && <td><MDBIcon className= "icon" fas icon="trash" onClick={e => deleteItem(e, row[0])} /></td>}
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