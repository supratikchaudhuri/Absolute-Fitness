import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

function PaymentPlans() {
  const [product, setProduct] = useState([]);
  const stripe = useStripe();
  const elements = useElements();

  const createSubscription = async (name, email, priceId) => {
    try {
      // create a payment method
      const { paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement("card"),
        billing_details: {
          name,
          email,
        },
      });

      const res = await axios.post("stripe/create-subscription", {
        name,
        email,
        priceId,
        paymentMethod: paymentMethod.id,
      });
      const { clientSecret, subscriptionId } = res.data;

      // confirm the payment by the user
      const { error } = await stripe.confirmPayment({
        clientSecret,
        confirmParams: {
          return_url: "http://localhost:3000/my-subscriptions",
        },
      });
      if (error) alert("There are an error subscribing");
      else {
        alert("Subcription successful.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getGymMembershipPrices = async () => {
      const res = await axios.get("stripe/gym-membership-pricing");
      setProduct(res.data);
    };

    getGymMembershipPrices();
  }, []);

  console.log(product);

  const subscribe = (priceId) => {
    const { email, name } = JSON.parse(localStorage.getItem("user"));
    createSubscription(name, email, priceId);
  };

  return (
    <>
      <div className="card-details-form">
        <CardElement />
      </div>

      <stripe-buy-button
        buy-button-id="buy_btn_1OC7VRSIsW8FsEuEUNqWmQm0"
        publishable-key="pk_test_51N4IuESIsW8FsEuEN6OPvDtj95w1XrlO17O9gLaFcrDTRDQWc5CdCCHeqgKznFdcQAGhuHLbzDsFD1NJIlMpFgdW00iQ2mlzNY"
      ></stripe-buy-button>

      <div className="choose-plans-div">
        {product.prices &&
          product.prices.map((price, idx) => {
            return (
              <MDBCard className="plan-card" key={idx}>
                <MDBCardBody>
                  <MDBCardTitle>{price.amount}</MDBCardTitle>
                  <MDBCardText>{price.nickname}</MDBCardText>

                  <MDBBtn onClick={() => subscribe(price.id)}>Subscribe</MDBBtn>
                </MDBCardBody>
              </MDBCard>
            );
          })}
      </div>
    </>
  );
}

export default PaymentPlans;
