import React from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';

function PaymentPlans() {
  return (
    <div className='payment-plans-div'>
    <MDBCard className='plan-card'>
      <MDBCardBody>
        <MDBCardTitle>$100/Mo</MDBCardTitle>
        <MDBCardText>
          Set up montly subscription plan.
        </MDBCardText>
        <MDBBtn>Subscribe</MDBBtn>
      </MDBCardBody>
    </MDBCard>

    <MDBCard className='plan-card'>
      <MDBCardBody>
        <MDBCardTitle>$1050/Year</MDBCardTitle>
        <MDBCardText>
          Pay only once for the entire year.
        </MDBCardText>
        <MDBBtn>Buy</MDBBtn>
      </MDBCardBody>
    </MDBCard>
    </div>
  )
}

export default PaymentPlans