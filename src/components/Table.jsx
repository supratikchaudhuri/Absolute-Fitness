import React from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdb-react-ui-kit';

function Table({content, data, deleteItem, displayEditForm, setStaffDetails, setEquipments}) {
  const user = JSON.parse(localStorage.getItem('user'));

  const cols = Object.keys(data[0]);

  const rows = []
  for(var i = 0; i < data.length; i++) {
    rows.push(Object.values(data[i]))
  }
  console.log(rows);

  return (
    <>
    
    <MDBTable className='table mt-0 table' align='middle'>
      <MDBTableHead light>
        <tr>
					{
						cols.map(
							(item) => (
                // conditions when not to display a particular item
                // (
                //   content == 'equipments' && (item == 'gym_id' || item == 'equipment_id')
                // )
                // ? 
                // null
                // :
                // <th scope='col'>{console.log(content + item)}</th>
                <th scope='col'>{item.toUpperCase()}</th>
              )
						)
            
					}
          {user.type == 'admin' && <th scope='col'></th>}
          
        </tr>
      </MDBTableHead>
      <MDBTableBody>
				{
					rows.map((row, idx) => 
						<tr key={idx}>
							{row.map((item) => (
                // (
                //   content == 'equipments' && (item == 'gym_id' || item == 'equipment_id')
                // )
                // ? 
                // null
                // :
                // <td>{console.log(item)}</td>
                <td>{item !== null ? item : '--'}</td>
              ))}

              <div className='update-btn-table'>
                {user.type === 'admin' && content === 'staff'  
                // style={{marginRight: '30px'}} 
                  && 
                  <td>
                    <MDBIcon style={{marginRight: '30px'}} 
                      className= "icon" fas icon="pen" 
                      onClick={e => {displayEditForm(true); setStaffDetails(data[idx])}}
                    /> 
                  </td>
                }

                {
                  user.type === 'admin' && content === 'equipments'
                  && 
                  <td>
                    <MDBIcon style={{marginRight: '30px'}} 
                      className= "icon" fas icon="pen" 
                      onClick={e => {displayEditForm(true); setEquipments([{...data[idx], image_url: data[idx].image_url.props.src}])}}
                    /> 
                  </td>
                }

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