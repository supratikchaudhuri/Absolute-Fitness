import React, {useEffect, useState} from 'react';
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardLink,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';

function MyPlan() {

  const [myplan, setMyPlan] = useState(null);

  useEffect(() => {
    //wanna use useContext here
    const getPlanDetails = () => {

    }
  })


  return (
    <div className='planDiv'>
    <MDBCard>
      <MDBCardImage position='top' alt='...' src='https://mdbootstrap.com/img/new/standard/city/062.webp' 
        style={{maxHeight: '300 px', maxWidth: '300px'}}
        />
      <MDBCardBody>
        <MDBCardTitle>Plan Name</MDBCardTitle>
        <MDBCardText>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </MDBCardText>
      </MDBCardBody>
      <MDBListGroup flush>
        <MDBListGroupItem>StartDate: </MDBListGroupItem>
        <MDBListGroupItem>EndDate</MDBListGroupItem>
        <MDBListGroupItem>Plan Cost</MDBListGroupItem>
      </MDBListGroup>
      <MDBCardBody>
        <MDBCardLink href='#'>Renew Plan</MDBCardLink>
        <MDBCardLink href='#'>Change Plan</MDBCardLink>
      </MDBCardBody>
    </MDBCard>
    </div>
  )
}

export default MyPlan