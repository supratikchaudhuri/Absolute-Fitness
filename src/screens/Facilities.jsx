import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
	MDBCard,
	MDBCardImage,
	MDBCardBody,
	MDBCardTitle,
	MDBCardText,
	MDBRow,
	MDBCol,
} from 'mdb-react-ui-kit';

import { useParams } from 'react-router-dom';

function Facilities() {

  const params = useParams()
  const { gym_id } = params

  const user_gym = JSON.parse(localStorage.getItem('user_gym'))

  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    const getFacilities = async () => {
      try {
        const res = await axios.get(`../../gym/${gym_id}/facilities`);
        setFacilities(res.data);
      } 
      catch (err) {
        console.log(err);
      }
    }

    getFacilities();

  }, []);

  return (
    facilities.length > 0
    ?
    <div className='facilities-div'>
      <h4>Facilities</h4>

      {facilities 
        && 
        <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
        {
          facilities.map(facility => (
            <MDBCol>
            <MDBCard className='h-100'	>
              <MDBCardImage
                src={facility.image_url}
                alt='...'
                position='top'
              />
              <MDBCardBody>
                <MDBCardTitle>{facility.name}</MDBCardTitle>
                <MDBCardText>
                  <p>Location: {facility.location}</p>
                  <p>Operating Hours: {facility.opening_time} to {facility.closing_time}</p>
                </MDBCardText>

              </MDBCardBody>
            </MDBCard>
            </MDBCol>
          ))
        }
        </MDBRow>
      }
    </div>
    :
    <div className='no-data '>No Facillieis listed by the gym yet.</div>
  )
}

export default Facilities