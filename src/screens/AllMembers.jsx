import React, { useEffect, useState } from "react";
import { getAllUsers } from "../api/user";
import AlertBox from "../components/AlertBox";
import Table from "../components/Table";

const AllUsers = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [users, setUsers] = useState([]);
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);

  const fetchAllUsers = async () => {
    const res = await getAllUsers();
    setUsers(res);
    setCols(Object.keys(res[0]));
    setRows(res.map((row) => Object.values(row)));
  };
  console.log(users);
  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="container center">
      <h4>Absolute Fitness Users</h4>
      <h6>Got {users.length} users</h6>
      {users.length ? (
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
                <th scope="col"></th>
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
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <AlertBox message="No users found" type="danger" />
      )}
    </div>
  );
};

export default AllUsers;
