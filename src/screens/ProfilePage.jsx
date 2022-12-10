import React, { useEffect, useState } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardHeader,
    MDBCardFooter,
    MDBBtn,
    MDBRow,
    MDBCol,
    MDBInput,
} from "mdb-react-ui-kit";
import axios from "axios";

function ProfilePage() {
    const user = JSON.parse(localStorage.getItem("user"));

    const [showEditForm, setShowEditForm] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState({
        ...user,
        ["password"]: null,
    });

    const handleChange = (e) => {
        setUpdatedProfile({
            ...updatedProfile,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(updatedProfile);
        if (updatedProfile["phone"].length != 10) {
            alert("phone needs to be 10 digits long");
            return;
        }
        try {
            if (user.type === "member") {
                const res = await axios.put(`/user/${user.email}`, {
                    ...updatedProfile,
                    ["gymId"]: user.gym_id,
                });
                let newProfile = updatedProfile;
                delete newProfile.password;
                console.log(newProfile);
                localStorage.setItem("user", JSON.stringify(newProfile));
                setShowEditForm(false);
                alert("Profile Updated Successfully !");
            }
        } catch (err) {
            alert(err.response.data.msg || err);
        }
    };

    return (
        <>
            <div
                className="edit-form-div"
                style={{ display: showEditForm ? "inline" : "none" }}
            >
                <form className="m-4 popup-form" onSubmit={handleSubmit}>
                    <MDBInput
                        className="mb-4"
                        type="email"
                        label="Email address"
                        disabled
                        name="email"
                        value={user.email}
                    />
                    <MDBRow className="mb-4 w-3">
                        <MDBCol>
                            <MDBInput
                                label="Name"
                                name="name"
                                value={updatedProfile.name}
                                onChange={handleChange}
                            />
                        </MDBCol>
                        <MDBCol>
                            <MDBInput
                                label="phone"
                                name="phone"
                                value={updatedProfile.phone}
                                onChange={handleChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBInput
                        wrapperClass="col-md-10 mb-3"
                        label="Date of birth"
                        type="date"
                        size="lg"
                        max={new Date().toJSON().slice(0, 10)}
                        name="dob"
                        value={updatedProfile.dob.substring(0, 10)}
                        onChange={handleChange}
                    />

                    <MDBInput
                        className="mb-4"
                        type="password"
                        label="Password (leave empty if you do not want to change)"
                        name="password"
                        onChange={handleChange}
                    />

                    <MDBBtn type="submit" className="mb-0" block>
                        Update
                    </MDBBtn>
                    <MDBBtn
                        type="button"
                        color="danger"
                        onClick={(e) => setShowEditForm(false)}
                        className="mb-0"
                        block
                    >
                        Cancel
                    </MDBBtn>
                </form>
            </div>

            <div className="profile-div">
                <MDBCard alignment="center">
                    <MDBCardHeader>
                        <img
                            src="https://static.scistarter.org/img/nobody.png"
                            alt="Avatar"
                            className="avatar"
                        />
                    </MDBCardHeader>

                    <MDBCardBody>
                        <MDBCardTitle>{user.name}</MDBCardTitle>
                        <MDBCardText>email : {user.email}</MDBCardText>
                        <MDBCardText>Phone: {user.phone}</MDBCardText>
                        <MDBCardText>
                            Date of Birth: {user.dob.substring(0, 10)}
                        </MDBCardText>
                        <MDBCardText>Sex: {user.sex}</MDBCardText>
                        <MDBCardText>Your Gym: {user.gym_id}</MDBCardText>
                    </MDBCardBody>

                    <MDBCardFooter className="text-muted">
                        <MDBBtn outline onClick={(e) => setShowEditForm(true)}>
                            Edit Profile
                        </MDBBtn>
                    </MDBCardFooter>
                </MDBCard>
            </div>
        </>
    );
}

export default ProfilePage;
