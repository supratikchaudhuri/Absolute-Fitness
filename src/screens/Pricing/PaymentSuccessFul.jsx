import React, { useEffect } from "react";
import gif from "../../Images/doggoGif.gif";
import { useParams, useSearchParams } from "react-router-dom";
import { paymentSuccessful } from "../../api/user";

const PaymentSuccessFul = () => {
    // const { token: paymentToken } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const paymentToken = searchParams.get("token");

    const paymentSuccessfulByUser = async (paymentToken) => {
        await paymentSuccessful(paymentToken);
    };

    useEffect(() => {
        paymentSuccessfulByUser(paymentToken);
    }, []);
    return (
        <div className="container ">
            <div className="card text-center shadow p-3 mb-5 bg-white rounded">
                <div className="card-body">
                    <img src={gif} alt="gif" />
                    <h1 className="card-title mt-1">Payment Successful!</h1>
                    <p className="card-text">Thank you for your purchase.</p>
                    <a href="/" className="btn btn-primary">
                        Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccessFul;
