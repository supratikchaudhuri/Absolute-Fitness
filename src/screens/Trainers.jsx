import React from 'react';

import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';

function Trainers() {
    const trainers = [
        {
            name: "Jimmy",
            speciality: "Calisthenics",
            yearsOfExp: 6,
            image: "https://www.thimble.com/wp-content/uploads/2022/05/Personal-Trainer-Salary-Guide.jpg"
        }, {
            name: "Tom",
            speciality: "Weight Training",
            yearsOfExp: 11,
            image: "https://hips.hearstapps.com/hmg-prod/images/mh-trainer-2-1533576998.png"
        }, {
            name: "Emma",
            speciality: "Weight Loss",
            yearsOfExp: 4,
            image: "https://ici.net.au/blog/wp-content/uploads/2019/04/BecomePersonalTrainer-1024x683.jpg"
        }, {
          name: "Emily",
          speciality: "Weight Training",
          yearsOfExp: 11,
          image: "https://hips.hearstapps.com/hmg-prod/images/mh-trainer-2-1533576998.png"
      }, {
          name: "Raj",
          speciality: "Weight Loss",
          yearsOfExp: 4,
          image: "https://ici.net.au/blog/wp-content/uploads/2019/04/BecomePersonalTrainer-1024x683.jpg"
      }
    ]

  return (
    <div className='trainerDiv'>
      <h1>Meet The team</h1>
      <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
      {
        trainers.map(trainer => (
          <MDBCol>
          <MDBCard>
            <MDBCardImage
              src={trainer.image}
              alt='...'
              position='top'
            />
            <MDBCardBody>
              <MDBCardTitle>{trainer.name}</MDBCardTitle>
              <MDBCardText>
                <p>{trainer.yearsOfExp}</p>
                This is a longer card with supporting text below as a natural lead-in to additional content.
                This content is a little bit longer.
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        ))
      }
    </MDBRow>
    </div>
  )
}

export default Trainers