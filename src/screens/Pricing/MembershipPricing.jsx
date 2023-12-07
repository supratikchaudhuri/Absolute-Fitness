import React, { useEffect, useState } from "react";
import { createCheckoutSession, getProductWithPricing } from "../../api/stripe";
import AlertBox from "../../components/AlertBox";

function MembershipPricingPlans() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [productPrices, setProductPrices] = useState([]);

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
    window.location.href = checkout_url;
  };

  return user.subscribed ? (
    <AlertBox
      type="success"
      message="Congratulations, you're already subscribed"
    />
  ) : (
    <>
      <AlertBox
        message="This is a test environment. No real money would be deducted from your account"
        type="warning"
        anchor={{ name: "More info", href: "https://google.com" }}
      />
      <div className="container mt-2">
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
