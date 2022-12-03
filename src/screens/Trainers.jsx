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
    <div className='trainer-div'>
      <h1>Meet The team</h1>
      {
        trainers && 
      
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
                <Link to={'jimmy/performace'}>
                  <MDBBtn className='text-dark' color='light'>
                    See Performance
                  </MDBBtn>
                </Link>

                <MDBBtn className='text-dark' color='light'>
                    Hire
                  </MDBBtn>

              </div>

              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          ))
        }
      </MDBRow>
    }
    </div>
  )
}

export default Trainers





    // const trainers = [
    //     {
    //         name: "Jimmy",
    //         speciality: "Calisthenics",
    //         yearsOfExp: 6,
    //         image: "https://www.thimble.com/wp-content/uploads/2022/05/Personal-Trainer-Salary-Guide.jpg"
    //     }, {
    //         name: "Tom",
    //         speciality: "Weight Training",
    //         yearsOfExp: 11,
    //         image: "https://hips.hearstapps.com/hmg-prod/images/mh-trainer-2-1533576998.png"
    //     }, {
    //         name: "Emma",
    //         speciality: "Weight Loss",
    //         yearsOfExp: 4,
    //         image: "https://ici.net.au/blog/wp-content/uploads/2019/04/BecomePersonalTrainer-1024x683.jpg"
    //     }, {
    //       name: "Emily",
    //       speciality: "Weight Training",
    //       yearsOfExp: 11,
    //       image: "https://hips.hearstapps.com/hmg-prod/images/mh-trainer-2-1533576998.png"
    //   }, {
    //       name: "Raj",
    //       speciality: "Weight Loss",
    //       yearsOfExp: 4,
    //       image: "https://ici.net.au/blog/wp-content/uploads/2019/04/BecomePersonalTrainer-1024x683.jpg"
    //   }
    // ]