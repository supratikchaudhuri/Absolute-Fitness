import React, { useEffect, useState } from "react";
import Table from "../components/Table";
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

  const getMembers = async () => {
    const res = await getGymMembers(gymId);
    setMembers(res);
    setCols(Object.keys(res[0]));
    setRows(res.map((row) => Object.values(row)));
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

  useEffect(() => {
    getMembers();
  }, []);
  // TODO: add customer type
  const search = (e) => {
    e.preventDefault();
    const input = document.querySelector("input").value;
    if (input === "") {
      getMembers();
    } else {
      const filteredMembers = members.filter((member) => {
        return (
          member.name.toLowerCase().includes(input.toLowerCase()) ||
          member.email.toLowerCase().includes(input.toLowerCase()) ||
          member.phone.toLowerCase().includes(input.toLowerCase()) ||
          member.dob.toLowerCase().includes(input.toLowerCase()) ||
          member.sex.toLowerCase().includes(input.toLowerCase())
        );
      });
      setMembers(filteredMembers);
    }
  };

  return (
    <div className="gym-members-div">
      <form className="form-inline mb-3" onSubmit={search}>
        <div className="row mx-auto">
          <div className="col">
            <input
              className="form-control"
              type="search"
              placeholder="Search name, email or phone"
              aria-label="Search"
            />
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
                        <a href={`user/profile/${item}`}>Profile</a>
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
