import React from "react";

function Table({
  content,
  data,
  deleteItem,
  displayEditForm,
  setStaffDetails,
  setEquipments,
  firstItemLink,
  firstItemPath,
}) {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const cols = Object.keys(data[0]);

  const rows = [];
  for (var i = 0; i < data.length; i++) {
    rows.push(Object.values(data[i]));
  }

  return (
    <>
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
            {user.type === "admin" &&
              (content === "equipments" || content === "members") && (
                <th scope="col"></th>
              )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="center">
              {row.map((item, colIndex) => (
                <td className="m-auto" key={colIndex}>
                  {colIndex === 0 && firstItemLink ? (
                    <>
                      {item} {"   "}
                      <a href={`${firstItemPath.path}/${item}`}>
                        {firstItemPath.name}
                      </a>
                    </>
                  ) : item !== null ? (
                    item
                  ) : (
                    "--"
                  )}
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
      ;
    </>
  );
}

export default Table;
