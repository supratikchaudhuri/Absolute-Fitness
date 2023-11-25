import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CardElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { createCheckoutSession, getProductWithPricing } from "../../api/stripe";
import AlertBox from "../../components/AlertBox";

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
      <AlertBox
        message="This is a test envioronment. No real money would be deducted from your account"
        type="warning"
        anchor={{ name: "More info", href: "https://google.com" }}
      />

      <div className="container mt-2">
        {/* <button className="btn btn-success float-end">
          Add New Subscripption
        </button> */}
        <h1 className="text-center mb-4">Pricing Plans</h1>
        <div className="row">
          {productPrices.prices &&
            productPrices.prices.map((price, idx) => {
              return (
                <div className="col-md-4 mb-2" key={idx}>
                  <div className="card">
                    <div className="card-header bg-secondary-light text-white">
                      <h5 className="card-title text-dark">
                        {price.lookup_key}
                        {idx === productPrices.prices.length - 1 && (
                          <span className="badge bg-danger float-end">
                            Most Popular
                          </span>
                        )}
                      </h5>
                    </div>
                    <div className="card-body">
                      <h2 className="card-title">
                        ${price.unit_amount / 100}
                        {price.recurring
                          ? `/${price.recurring.interval}`
                          : " One Time Payment"}
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
