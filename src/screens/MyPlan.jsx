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
import axios from 'axios';

function MyPlan() {

  const user = localStorage.getItem('user');
  const [myPlan, setMyPlan] = useState(null);

  useEffect(() => {
    const getPlanDetails = async () => {
      const res = await axios.get(`user/${user.email}/healthPlan`);
      setMyPlan(res.data);
    }

    getPlanDetails();
  }, [])
  console.log(myPlan);

  return (
    <div className='plan-div'>

    {myPlan && 
    
    <>
      <p>Your trainer: {myPlan.trainer}</p>

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
    </>
    }
    </div>
  )
}

export default MyPlan