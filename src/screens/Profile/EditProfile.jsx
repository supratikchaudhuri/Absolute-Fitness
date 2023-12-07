import React, { useState } from "react";
import { updateUser } from "../../api/user";
import { updateStaff } from "../../api/staff";

const EditProfile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [updatedUser, setUpdatedUser] = useState(user);

    const updateProfileFn = async (e) => {
        e.preventDefault();
        let status;

        if (user.type === "member") status = await updateUser(updatedUser);
        else status = await updateStaff(updatedUser);

        if (status === 200) {
            alert("Profile Updated Successfully");
            window.location.href = "/user/profile";
        } else {
            alert("Something went wrong");
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-md-4 width-auto fit-content mb-3">
                    <i
                        className="fa fa-user avatar mb-3"
                        aria-hidden="true"
                    ></i>
                    <br />
                </div>
                <div className="col-xs-12 col-md-8 ms-auto">
                    <form onSubmit={(e) => updateProfileFn(e)}>
                        <div className="row">
                            <label for="name" className="form-label mt-2">
                                <strong>Name</strong>
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                placeholder="Dainel"
                                value={updatedUser.name}
                                onChange={(e) =>
                                    setUpdatedUser((o) => ({
                                        ...o,
                                        name: e.target.value,
                                    }))
                                }
                            />
                        </div>

                        <div className="row">
                            <label for="phone" className="form-label mt-2">
                                <strong>Phone</strong>
                            </label>
                            <input
                                type="text"
                                id="phone"
                                className="form-control"
                                placeholder="98XXXXXX8756"
                                value={updatedUser.phone}
                                onChange={(e) =>
                                    setUpdatedUser((o) => ({
                                        ...o,
                                        phone: e.target.value,
                                    }))
                                }
                            />
                        </div>

                        <div className="row">
                            <label for="email" className="form-label mt-2">
                                <strong>Email</strong>
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="xyz@gmail.com"
                                value={updatedUser.username}
                                disabled
                                // onChange={(e) =>
                                //     setUpdatedUser((o) => ({
                                //         ...o,
                                //         username: e.target.value,
                                //     }))
                                // }
                            />
                        </div>

                        <div className="row">
                            <label for="dob" className="form-label mt-2">
                                <strong>Date of Birth</strong>
                            </label>
                            <input
                                type="date"
                                id="dob"
                                className="form-control"
                                value={updatedUser.dob}
                                onChange={(e) =>
                                    setUpdatedUser((o) => ({
                                        ...o,
                                        dob: e.target.value,
                                    }))
                                }
                            />
                        </div>

                        <div className="row">
                            <label for="password" className="form-label mt-2">
                                <strong>Password</strong> (enter new password if
                                you want to change it)
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={updatedUser.password}
                                onChange={(e) =>
                                    setUpdatedUser((o) => ({
                                        ...o,
                                        password: e.target.value,
                                    }))
                                }
                            />
                        </div>

                        <button type="submit" className="btn btn-primary mt-3">
                            Update
                        </button>
                        <a
                            href="/user/profile"
                            type="button"
                            className="btn btn-danger mt-3 ms-3"
                        >
                            Cancel
                        </a>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
