import React, { useEffect, useState } from 'react';

import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn
} from 'mdb-react-ui-kit';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function Trainers() {

  const params = useParams()
  const { gym_id } = params

  const user_gym = JSON.parse(localStorage.getItem('user_gym'))

  const [trainers, setTrainers] = useState([])

  useEffect(() => {
    const getTrainers = async () => {
      try {
        const res = await axios.get(`../../gym/${gym_id}/trainers`);
        setTrainers(res.data);
      } 
      catch (err) {
        console.log(err);
      }
    }

    getTrainers();

  }, []);
  console.log(trainers);

  return (
    trainers.length > 0
    ?
    <div className='trainer-div'>
      <h4>Meet The team</h4>
        <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
        {
          trainers.map(trainer => (
            <MDBCol>
            <MDBCard>
              <MDBCardImage
                src={trainer.image_url}
                alt='...'
                position='top'
              />
              <MDBCardBody>
                <MDBCardTitle>{trainer.name}</MDBCardTitle>
                <MDBCardText>
                  <p>{trainer.speciality}</p>
                  <p>{trainer.years_of_exp}</p>
                  <p>{trainer.description}</p>
                </MDBCardText>

              <div>
                <Link to={'/trainer/' + (trainer.staff_id) + '/memberRecords'}>
                  <MDBBtn className='text-dark' color='light'>
                    See Performance
                  </MDBBtn>
                </Link>

              </div>

              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          ))
        }
      </MDBRow>
    </div>
    :
    <div className='no-data'>No Trainers Data Found.</div>
  )
}

export default Trainers