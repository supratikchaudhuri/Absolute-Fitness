import React, { useEffect, useState } from "react";
import AlertBox from "../components/AlertBox";
import { getGymStaff } from "../api/gym";
import { useParams } from "react-router-dom";
import { addStaff, deleteStaff, updateStaff } from "../api/staff";

function GymStaff() {
    const { gymId } = useParams();
    const user = JSON.parse(localStorage.getItem("user"));

    const [staffs, setStaffs] = useState(null);

    const [showForm, setShowForm] = useState(false);
    const [staffDetails, setStaffDetails] = useState({ gym_id: gymId });
    const [formType, setFormType] = useState("EDIT");

    const displayEditForm = (e) => {
        setShowForm(true);
    };

    console.log(staffDetails);

    const addGymStaff = async () => {
        const status = await addStaff(staffDetails);
        if (status === 200) {
            const newStaffMember = Object.keys(staffs[0]).reduce(
                (acc, key) => ({ ...acc, [key]: staffDetails[key] || "" }),
                {}
            );
            setStaffs([...staffs, newStaffMember]);
            setStaffDetails({ gym_id: gymId });
            setShowForm(false);
        } else {
            alert("Error adding new staff");
        }
    };

    const updateGymStaff = async () => {
        if (staffDetails && staffDetails.phone.length !== 10) {
            alert("Phone needs to be 10 digits long");
            return;
        }

        const status = await updateStaff(staffDetails);
        console.log(status);

        if (status === 200) {
            setStaffs(
                staffs.map((s) =>
                    s.staff_id === staffDetails.staff_id ? staffDetails : s
                )
            );
        } else {
            alert("Error updating staff");
        }

        setShowForm(false);
    };

    const deleteGymStaff = async (e, staffId) => {
        if (staffId === user.staff_id) {
            alert("You cannot delete yourself!");
            return;
        }

        const ans = window.confirm(
            "Are you sure you want to delete this staff?"
        );
        if (ans) {
            const status = await deleteStaff(staffId);

            if (status === 200) {
                setStaffs(staffs.filter((s) => s.staff_id !== staffId));
                // Update cols and rows after staff is deleted
                alert("Staff deleted successfully");
            }
        }
    };

    const getStaff = async () => {
        const res = await getGymStaff(gymId);
        setStaffs(res);
    };

    useEffect(() => {
        getStaff();
    }, []);

    const renderForm = showForm && (
        <div className="edit-form-div">
            <form
                className="m-4 popup-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    formType === "ADD" ? addGymStaff() : updateGymStaff();
                }}
            >
                <div className="mb-2 row">
                    <div className="row mb-2">
                        <div className="col">
                            <label htmlFor="staffID" className="form-label">
                                Email*
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="staffID"
                                name="staff_id"
                                value={staffDetails.staff_id}
                                disabled={formType === "EDIT"}
                                onChange={(e) =>
                                    setStaffDetails({
                                        ...staffDetails,
                                        staff_id: e.target.value,
                                    })
                                }
                                placeholder="abc@af.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-2 row">
                        <div className="col">
                            <label htmlFor="firstName" className="form-label">
                                Name*
                            </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                id="firstName"
                                name="name"
                                value={staffDetails.name}
                                placeholder="John"
                                onChange={(e) =>
                                    setStaffDetails({
                                        ...staffDetails,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="phone" className="form-label">
                                Phone*
                            </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={staffDetails.phone}
                                placeholder="9876543210"
                                onChange={(e) =>
                                    setStaffDetails({
                                        ...staffDetails,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="col">
                            <label
                                className="form-label"
                                htmlFor="employee-type"
                            >
                                Employee Type*
                            </label>
                            <select
                                required
                                className="custom-select w-100"
                                id="employee-type"
                                name="type"
                                value={staffDetails.type}
                                onChange={(e) =>
                                    setStaffDetails({
                                        ...staffDetails,
                                        type: e.target.value,
                                    })
                                }
                            >
                                <option selected value={null}>
                                    Choose...
                                </option>
                                <option value="staff">Staff</option>
                                {user.type === "root" && (
                                    <option value="admin">Admin</option>
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="row mb-2">
                        <div className="col">
                            <label for="sex" className="form-label">
                                Sex
                            </label>
                            <select
                                required
                                className="custom-select w-100"
                                id="sex"
                                name="sex"
                                value={staffDetails.sex}
                                onChange={(e) =>
                                    setStaffDetails({
                                        ...staffDetails,
                                        sex: e.target.value,
                                    })
                                }
                            >
                                <option value={null}>Choose...</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="col">
                            <label htmlFor="salary" className="form-label">
                                Salary*
                            </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                id="salary"
                                name="salary"
                                value={staffDetails.salary}
                                placeholder="10000"
                                onChange={(e) =>
                                    setStaffDetails({
                                        ...staffDetails,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="col">
                            <label htmlFor="dob" className="form-label">
                                Date Of Birth*
                            </label>
                            <input
                                type="date"
                                required
                                className="form-control"
                                id="dob"
                                name="dob"
                                value={staffDetails.dob}
                                onChange={(e) =>
                                    setStaffDetails({
                                        ...staffDetails,
                                        dob: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Job Description*
                    </label>
                    <textarea
                        className="form-control"
                        id="description"
                        required
                        rows="3"
                        name="description"
                        value={staffDetails.description}
                        placeholder="Job Description"
                        onChange={(e) =>
                            setStaffDetails({
                                ...staffDetails,
                                [e.target.name]: e.target.value,
                            })
                        }
                    ></textarea>
                </div>
                <div className="row">
                    <div className="col">
                        <button type="submit" className="btn btn-primary mb-0">
                            {console.log(formType)}
                            {formType === "ADD" ? "Add" : "Update"}
                        </button>
                    </div>
                    <div className="col">
                        <button
                            type="button"
                            className="btn btn-danger mb-0"
                            onClick={() => setShowForm(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );

    return (
        <>
            {staffs && staffs.length > 0 ? (
                <div className=" container gym-staff-div center">
                    {renderForm}
                    <button
                        className="btn btn-outline-primary float-end"
                        onClick={(e) => {
                            setShowForm(true);
                            setFormType("ADD");
                            setStaffDetails({ gym_id: gymId });
                        }}
                    >
                        Add Staff
                    </button>
                    <h4>Gym Staff</h4>

                    <table
                        className="table mt-2"
                        align="middle"
                        style={{ maxWidth: "1400px", margin: "auto" }}
                    >
                        <thead className="bg-light">
                            <tr className="center">
                                {Object.keys(staffs[0]).map((item, index) => (
                                    <th key={index} scope="col">
                                        <strong>
                                            {item
                                                .replace("_", " ")
                                                .toUpperCase()}
                                        </strong>
                                    </th>
                                ))}
                                {(user.type === "admin" ||
                                    user.type === "root") && (
                                    <th scope="col">Actions</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {staffs
                                .map((staff) => Object.values(staff))
                                .map((row, rowIndex) => (
                                    <tr key={rowIndex} className="center">
                                        {row.map((item, colIndex) => (
                                            <td
                                                className="m-auto"
                                                key={colIndex}
                                            >
                                                {item}
                                            </td>
                                        ))}

                                        {(user.type === "admin" ||
                                            user.type === "root") && (
                                            <td className="d-flex justify-content-between align-items-center">
                                                <i
                                                    className="fas fa-pen icon"
                                                    onClick={(e) => {
                                                        displayEditForm(true);
                                                        setFormType("EDIT");
                                                        setStaffDetails(
                                                            staffs[rowIndex]
                                                        );
                                                    }}
                                                ></i>

                                                <i
                                                    className="fas fa-trash icon ms-2"
                                                    onClick={(e) =>
                                                        deleteGymStaff(
                                                            e,
                                                            row[0]
                                                        )
                                                    }
                                                ></i>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <AlertBox message="No Staff found" type="danger" />
            )}
        </>
    );
}

export default GymStaff;
