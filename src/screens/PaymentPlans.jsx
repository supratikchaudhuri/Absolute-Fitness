import React, { useEffect, useState } from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import axios from 'axios';

function PaymentPlans() {

  const [plans, setPlans] = useState([]);
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const getAllProducts = async() => {
      // const res = await axios.get("stripe/products");
      const res = await axios.get("stripe/gym-membership-pricing");
      setProducts(res.data)
    }

    const getAllPrices = async() => {
      const res = await axios.get("stripe/prices");
      setPlans(res.data);
    }

    getAllProducts();
    getAllPrices();
    

  }, []);

  console.log(products);
  console.log(plans);

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