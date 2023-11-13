import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [showNavRight, setShowNavRight] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const userType = user.type;

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <nav className="custom-navbar fixed-top navbar navbar-dark bg-primary navbar-expand-lg">
        <a class="navbar-brand" href=".">
          Ab fit
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#af-navbar"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ border: "1px solid white" }}
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="af-navbar">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href=".">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href=".">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href=".">
                Pricing
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li class="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="."
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {user.name}
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href=".">
                  Profile
                </a>
                <a class="dropdown-item" href=".">
                  Subscriptions
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href=".">
                  Log Out
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

// <MDBNavbar
//   expand="lg"
//   light
//   style={{ color: "red", "background-color": "#4cc9f0" }}
// >
//   <MDBContainer fluid>
//     <MDBNavbarBrand href="#">
//       Absolute Fitness{" "}
//       <i className="fas fa-dumbbell" style={{ "margin-left": "5px" }}></i>
//     </MDBNavbarBrand>
//     <MDBNavbarToggler
//       type="button"
//       data-target="#navbarText"
//       aria-controls="navbarText"
//       aria-expanded="false"
//       aria-label="Toggle navigation"
//     >
//       <MDBIcon icon="bars" fas />
//     </MDBNavbarToggler>
//     <MDBCollapse navbar>
//       <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
//         {userType === "member" && (
//           <>
//             <MDBNavbarItem>
//               <Link to="/home">
//                 <MDBNavbarLink active={true} h aria-current="page">
//                   Gyms
//                 </MDBNavbarLink>
//               </Link>
//             </MDBNavbarItem>
//             <MDBNavbarItem>
//               <Link to={"user/" + user.email + "/health-plan"}>
//                 <MDBNavbarLink active={false}>Health Plan</MDBNavbarLink>
//               </Link>
//             </MDBNavbarItem>
//             <MDBNavbarItem>
//               <Link to={"user/" + user.email + "/health-record/"}>
//                 <MDBNavbarLink active={false} h>
//                   Health Progress
//                 </MDBNavbarLink>
//               </Link>
//             </MDBNavbarItem>

//             <MDBNavbarItem>
//               <Link to={"/payment-plans"}>
//                 <MDBNavbarLink active={false} h>
//                   Plans
//                 </MDBNavbarLink>
//               </Link>
//             </MDBNavbarItem>
//             {/* <MDBNavbarItem >
//               <MDBNavbarLink active={false} h onClick={e => alert("Newsletters comming soon!")}>Newsletter</MDBNavbarLink>
//             </MDBNavbarItem> */}
//           </>
//         )}

//         {userType === "admin" && (
//           <>
//             <MDBNavbarItem>
//               <Link to="/home">
//                 <MDBNavbarLink active={true} h aria-current="page">
//                   Gyms
//                 </MDBNavbarLink>
//               </Link>
//             </MDBNavbarItem>
//             <MDBNavbarItem>
//               <Link to={"gym/" + user.gym_id + "/members"}>
//                 <MDBNavbarLink active={false}>Members</MDBNavbarLink>
//               </Link>
//             </MDBNavbarItem>
//             <MDBNavbarItem>
//               <Link to={"gym/" + user.gym_id + "/staff"}>
//                 <MDBNavbarLink active={false} h>
//                   Staff
//                 </MDBNavbarLink>
//               </Link>
//             </MDBNavbarItem>
//             <MDBNavbarItem>
//               <Link to={"gym/" + user.gym_id + "/equipments"}>
//                 <MDBNavbarLink active={false} h>
//                   Equipments
//                 </MDBNavbarLink>
//               </Link>
//             </MDBNavbarItem>
//           </>
//         )}

//         {userType === "trainer" && (
//           <>
//             <MDBNavbarItem>
//               <Link to="/home">
//                 <MDBNavbarLink active={true} h aria-current="page">
//                   Gyms
//                 </MDBNavbarLink>
//               </Link>
//             </MDBNavbarItem>
//             <MDBNavbarItem>
//               <Link to={"trainer/" + user.gym_id + "/members"}>
//                 <MDBNavbarLink active={false}>My Clients</MDBNavbarLink>
//               </Link>
//             </MDBNavbarItem>
//           </>
//         )}
//       </MDBNavbarNav>
//     </MDBCollapse>
//   </MDBContainer>

//   <MDBContainer fluid>
//     <MDBNavbarToggler
//       type="button"
//       data-target="#navbarRightAlignExample"
//       aria-controls="navbarRightAlignExample"
//       aria-expanded="false"
//       aria-label="Toggle navigation"
//       onClick={() => setShowNavRight(!showNavRight)}
//     >
//       <MDBIcon icon="bars" fas />
//     </MDBNavbarToggler>

//     <MDBCollapse navbar show={showNavRight}>
//       <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
//         <MDBNavbarItem style={{ cursor: "pointer" }}>
//           <MDBDropdown>
//             <MDBDropdownToggle tag="a" className="nav-link">
//               {user.name}
//             </MDBDropdownToggle>
//             <MDBDropdownMenu>
//               <Link
//                 to={
//                   user.staff_id
//                     ? "staff/" + user.staff_id + "/profile"
//                     : "user/" + user.email + "/profile"
//                 }
//               >
//                 <MDBDropdownItem link href="">
//                   Profile
//                 </MDBDropdownItem>
//               </Link>
//               <MDBDropdownItem link href="" onClick={logout}>
//                 Log Out
//               </MDBDropdownItem>
//             </MDBDropdownMenu>
//           </MDBDropdown>
//         </MDBNavbarItem>
//       </MDBNavbarNav>
//     </MDBCollapse>
//   </MDBContainer>
// </MDBNavbar>;
