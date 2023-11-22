import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CardElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { getProducts } from "../api/stripe";

function PaymentPlans() {
  const [products, setProducts] = useState([]);
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
      const res = await getProducts();
      console.log(res);
      setProducts(res);
    };

    getGymMembershipPrices();
  }, []);

  console.log(products);

  const subscribe = (priceId) => {
    const { email, name } = JSON.parse(localStorage.getItem("user"));
    createSubscription(name, email, priceId);
  };

  return (
    <>
      <div className="card-details-form">
        <CardElement />
        {/* <PaymentElement /> */}
      </div>

      <stripe-buy-button
        buy-button-id="buy_btn_1OC7VRSIsW8FsEuEUNqWmQm0"
        publishable-key="pk_test_51N4IuESIsW8FsEuEN6OPvDtj95w1XrlO17O9gLaFcrDTRDQWc5CdCCHeqgKznFdcQAGhuHLbzDsFD1NJIlMpFgdW00iQ2mlzNY"
      ></stripe-buy-button>

      <div className="choose-plans-div">
        {products &&
          products.prices &&
          products.prices.map((price, idx) => {
            return (
              <div className="card plan-card" data-key="{idx}">
                <div className="card-body">
                  <h5 className="card-title">{price.amount}</h5>
                  <p className="card-text">{price.nickname}</p>

                  <button
                    className="btn btn-primary"
                    onClick={() => subscribe(price.id)}
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default PaymentPlans;
