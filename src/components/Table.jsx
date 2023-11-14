import React from "react";

function Table({
  content,
  data,
  deleteItem,
  displayEditForm,
  setStaffDetails,
  setEquipments,
}) {
  const user = JSON.parse(localStorage.getItem("user"));

  const cols = Object.keys(data[0]);

  const rows = [];
  for (var i = 0; i < data.length; i++) {
    rows.push(Object.values(data[i]));
  }
  console.log(data);

  return (
    <>
      <table
        className="table mt-0"
        align="middle"
        style={{ maxWidth: "1400px", margin: "auto" }}
      >
        <thead className="bg-light">
          <tr className="center ">
            {cols.map((item, index) => (
              <th className="active" key={index} scope="col">
                {item.toUpperCase().replace("_", " ")}
              </th>
            ))}
            {user.type === "admin" && <th scope="col"></th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="center">
              {row.map((item, colIndex) => (
                <td className="m-auto" key={colIndex}>
                  {item !== null ? item : "--"}
                </td>
              ))}

              {user.type === "admin" && content === "staff" && (
                <td>
                  <i
                    style={{ marginRight: "30px" }}
                    className="fas fa-pen icon"
                    onClick={(e) => {
                      displayEditForm(true);
                      setStaffDetails(data[rowIndex]);
                    }}
                  ></i>
                </td>
              )}

              {user.type === "admin" && content === "equipments" && (
                <td>
                  <i
                    style={{ marginRight: "30px" }}
                    className="fas fa-pen icon"
                    onClick={(e) => {
                      displayEditForm(true);
                      setEquipments([
                        {
                          ...data[rowIndex],
                          image_url: data[rowIndex].image_url.props.src,
                        },
                      ]);
                    }}
                  ></i>
                </td>
              )}

              {user.type === "admin" &&
                (content === "staff" || content === "members") && (
                  <td>
                    <i
                      className="fas fa-trash icon"
                      onClick={(e) => deleteItem(e, row[0])}
                    ></i>
                  </td>
                )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
