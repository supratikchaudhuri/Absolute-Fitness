import React from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

function Table({cols, rows}) {

	console.log(rows);
  return (
    <MDBTable className='table' align='middle'>
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
					rows.map((row) => 
						<tr>
							{row.map((item) => 
								<td>{item}</td>
							)
							}
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
  )
}

export default Table