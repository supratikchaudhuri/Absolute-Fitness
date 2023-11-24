import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CardElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { createCheckoutSession, getProductWithPricing } from "../../api/stripe";

function MembershipPricingPlans() {
  const [productPrices, setProductPrices] = useState([]);
  const stripe = useStripe();
  const elements = useElements();

  //

  useEffect(() => {
    const getGymMembershipPrices = async () => {
      const res = await getProductWithPricing();
      console.log(res.data);
      setProductPrices(res.data);
    };

    getGymMembershipPrices();
  }, []);

  console.log(productPrices);

  const subscribe = async (priceId) => {
    console.log(priceId);
    const res = await createCheckoutSession(priceId);
    console.log(res);
    const checkout_url = res.data;
    // redirct to checkout page
    window.location.href = checkout_url;
  };

  return (
    <>
      <div className="card-details-form">
        {/* <CardElement /> */}
        {/* <PaymentElement /> */}
      </div>

      {/* <div className="choose-plans-div">
        {products &&
          products.prices &&
          products.prices.map((price, idx) => {
            return (
              <div className="card plan-card" data-key="{idx}">
                <div className="card-body">
                  <h5 className="card-title">{price.unit_amount}</h5>
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
      </div> */}

      <div className="container mt-2">
        <h1 className="text-center mb-4">Pricing Plans</h1>
        <div className="row">
          {productPrices.prices &&
            productPrices.prices.map((price, idx) => {
              return (
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-header bg-secondary-light text-white">
                      <h5 className="card-title text-dark">
                        {price.nickname}
                        <span className="badge bg-danger float-end">
                          Most Popular
                        </span>
                      </h5>
                    </div>
                    <div className="card-body">
                      <h2 className="card-title">
                        ${price.unit_amount / 100}/month
                      </h2>
                      <p className="card-text">{price.nickname} adasdas</p>
                      <button
                        className="btn btn-primary"
                        onClick={() => subscribe(price.id)}
                      >
                        Choose Plan
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default MembershipPricingPlans;
