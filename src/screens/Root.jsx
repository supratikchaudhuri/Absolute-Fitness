import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Root() {
  const navigate = useNavigate();
  //   useEffect(() => {
  //     if (window.location.pathname == "/") {
  //       navigate("/login");
  //     }
  //   }, []);

  return <div>Root</div>;
}

export default Root;
