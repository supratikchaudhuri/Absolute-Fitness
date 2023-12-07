import React, { useState } from "react";

import img1 from "../../Images/img1.jpg";
import logoImg from "../../Images/AbsoluteFitnessLogo.jpg";
import { useParams } from "react-router-dom";
import { resetPassword } from "../../api/authenticate";
import AlertBox from "../../components/AlertBox";

const SetupNewPassword = () => {
    const { token } = useParams();

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [resetPasswordSuccessful, setResetPasswordSuccessful] =
        useState(false);

    const resetUserPassword = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const { status, msg } = await resetPassword(token, password);
        if (status === 200) {
            setResetPasswordSuccessful(true);
        } else {
            alert(msg);
            setResetPasswordSuccessful(false);
        }
    };

    return (
        <div className="container">
            <div className="d-flex flex-row mt-5">
                <div className="d-none d-md-block col-md-4">
                    <img
                        id="login-image"
                        src={img1}
                        alt="login-form-img"
                        className="rounded-start h-100 w-100"
                    />
                </div>

                <form
                    className="login-form col-md-8 ms-2"
                    onSubmit={(e) => resetUserPassword(e)}
                >
                    <div className="d-flex flex-row mt-2 w-100">
                        <img
                            src={logoImg}
                            alt="login form"
                            className="rounded center"
                            style={{ "max-width": "100px" }}
                        />
                    </div>

                    <h5 className="center mt-2 mb-4">
                        Reset your Absolte Fitness Account Password
                    </h5>

                    <label for="password-input" className="form-label mb-2">
                        New Password
                    </label>
                    <div className="row">
                        <div className="col-11">
                            <input
                                id="password-input"
                                className="form-control form-control mb-4"
                                type={showPassword ? "text" : "password"}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter New Password"
                                required
                                value={password}
                            />
                        </div>
                        <div
                            className="col-1"
                            onClick={(e) => setShowPassword(!showPassword)}
                        >
                            <i class="fa-solid fa-eye"></i>
                        </div>
                    </div>

                    <label for="password-input" className="form-label mb-2">
                        Confirm Password
                    </label>
                    <div className="row">
                        <div className="col-11">
                            <input
                                id="password-input"
                                className="form-control form-control mb-4"
                                placeholder="Enter Confirm Password"
                                type={showConfirmPassword ? "text" : "password"}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                value={confirmPassword}
                                required
                            />
                        </div>
                        <div
                            className="col-1"
                            onClick={(e) =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                        >
                            <i class="fa-solid fa-eye"></i>
                        </div>
                    </div>

                    <p className="center">
                        <button
                            className=" center btn btn-dark mt-2 mb-2 px-5"
                            type="submit"
                            style={{ margin: "auto" }}
                        >
                            Reset Password
                        </button>
                    </p>

                    {resetPasswordSuccessful && (
                        <>
                            <AlertBox
                                message="Password reset successfully. Please Login with new password"
                                type="success"
                            />
                            <p className="center">
                                <a
                                    className="center btn btn-dark mt-2 mb-2 px-5"
                                    href="/login"
                                >
                                    Login Here
                                </a>
                            </p>
                        </>
                    )}

                    <p className=" center small mb-2 mt-0">Or</p>

                    <p className="center small mt-2 mb-0 pb-lg-2">
                        Don't have an account? <a href="/signup">Signup here</a>
                    </p>
                    <p className="center small mb-0 pb-lg-2">
                        Are you a staff? <a href="/staff-login">Login here</a>
                    </p>
                    <p className="center small mb-5 pb-lg-2">
                        Forgot Password?{" "}
                        <a href="/forgot-password">Click here</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SetupNewPassword;
