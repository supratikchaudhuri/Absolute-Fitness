import React, { useEffect, useState } from "react";
import AlertBox from "../components/AlertBox";
import { useParams } from "react-router-dom";
import { getGymMembers } from "../api/gym";
import { deleteGymUser } from "../api/user";

function GymMembers() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { gymId } = useParams();
  const [members, setMembers] = useState([]);
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);
  const [subscribedOnly, setSubscribedOnly] = useState(false);

  console.log(members);

  const getMembers = async () => {
    const res = await getGymMembers(gymId);

    for (let i = 0; i < res.length; i++) {
      res[i].dob = res[i].dob.substring(0, 10);
      res[i].subscribed = res[i].subscribed ? "Yes" : "No";
    }

    setMembers(res);
    if (ResizeObserver.length) {
      setCols(Object.keys(res[0]));
      setRows(res.map((row) => Object.values(row)));
    }
  };

  const deleteUser = async (e, email) => {
    const ans = window.confirm("Are you sure you want to delete this member?");
    if (ans) {
      const status = await deleteGymUser(email);
      if (status === 200) {
        setMembers(members.filter((m) => m.email !== email));
      }
    }
  };

  const handleCheckboxChange = (e) => {
    setSubscribedOnly(e.target.checked);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const input = document.querySelector("input").value;

    if (input === "" && !subscribedOnly) {
      getMembers();
    } else {
      const filteredMembers = members.filter((member) => {
        return (
          (input === "" ||
            member.name.toLowerCase().includes(input.toLowerCase()) ||
            member.email.toLowerCase().includes(input.toLowerCase()) ||
            member.phone.toLowerCase().includes(input.toLowerCase()) ||
            member.dob.toLowerCase().includes(input.toLowerCase()) ||
            member.sex.toLowerCase().includes(input.toLowerCase())) &&
          (!subscribedOnly || (subscribedOnly && member.subscribed === "Yes"))
        );
      });

      setRows(filteredMembers.map((row) => Object.values(row)));
    }
  };

  useEffect(() => {
    getMembers();
  }, [subscribedOnly]);

  return (
    <div className="gym-members-div">
      <form className="form-inline mb-3" onSubmit={handleFormSubmit}>
        <div className="d-flex align-items-center">
          <div className="col-xs-12">
            <input
              className="form-control col-xs-12"
              type="search"
              placeholder="Search name, email or phone"
              aria-label="Search"
            />
          </div>

          <div className="col-xs-12">
            <input
              className="form-check-input"
              type="checkbox"
              checked={subscribedOnly}
              onChange={handleCheckboxChange}
              id="subscribedOnly"
            />

            <label className="ms-2 form-check-label" htmlFor="subscribedOnly">
              Subscribers
            </label>
          </div>

          <div className="col ms-auto">
            <button className="btn btn-outline-success" type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </form>

      {members.length > 0 ? (
        <table
          className="table mt-0"
          align="middle"
          style={{ maxWidth: "1400px", margin: "auto" }}
        >
          <thead className="bg-light">
            <tr className="center">
              {cols.map((item, index) => (
                <th key={index} scope="col">
                  <strong>{item.toUpperCase()}</strong>
                </th>
              ))}
              {(user.type === "admin" || user.type === "root") && (
                <th scope="col">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="center">
                {row.map((item, colIndex) => (
                  <td className="m-auto" key={colIndex}>
                    {colIndex === 0 ? (
                      <>
                        {item} {"   "}
                        <a href={`/user/profile/${item}`}>Profile</a>
                      </>
                    ) : item !== null ? (
                      item
                    ) : (
                      "--"
                    )}
                  </td>
                ))}

                {(user.type === "admin" || user.type === "root") && (
                  <td>
                    <i
                      className="fas fa-trash icon"
                      onClick={(e) => deleteUser(e, row[0])}
                    ></i>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <AlertBox message={"No member data found"} type="danger" />
      )}
    </div>
  );
}

export default GymMembers;
