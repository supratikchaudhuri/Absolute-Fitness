import React from "react";
import { useJwt } from "react-jwt";

function Navbar() {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  let user = JSON.parse(localStorage.getItem("user")) || {};

  const { decodedToken, isExpired } = useJwt(user.accessToken);
  console.log(decodedToken);
  console.log(isExpired);

  if (decodedToken) {
    user = { ...user, type: decodedToken.type };
    localStorage.setItem("user", JSON.stringify(user));
  }
  console.log(user);

  const path = window.location.pathname;

  const navBarLink = [
    {
      name: "Home",
      link: "/home",
    },
    {
      name: "Pricing",
      link: "/pricing",
    },
  ];

  const adminLinks = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
  ];

  const trainerLinks = [
    {
      name: "Client",
      link: "/client",
    },
  ];

  const memberLinks = [
    {
      name: "Health Plan",
      link: "/health-plan",
    },
    {
      name: "Health Progress",
      link: "/health-progress",
    },
  ];

  return (
    <>
      <nav className="custom-navbar fixed-top navbar navbar-dark bg-primary navbar-expand-lg">
        <a className="navbar-brand" href=".">
          <span>Absolute Fitness</span>{" "}
          <i className="ms-2 fa-solid fa-dumbbell"></i>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#af-navbar"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ border: "1px solid white" }}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="af-navbar">
          <ul className="navbar-nav">
            {/* common links */}
            {navBarLink.map((item) => {
              return (
                <li
                  className={`nav-item ${
                    path.includes(item.link) ? "active" : ""
                  }`}
                >
                  <a className="nav-link" href={item.link}>
                    {item.name}
                  </a>
                </li>
              );
            })}

            {/* admin links */}
            {user.type === "admin" &&
              adminLinks.map((item) => {
                return (
                  <li
                    className={`nav-item ${
                      path.includes(item.link) ? "active" : ""
                    }`}
                  >
                    <a className="nav-link" href={item.link}>
                      {item.name}
                    </a>
                  </li>
                );
              })}

            {/* trainer links */}
            {user.type === "trainer" &&
              trainerLinks.map((item) => {
                return (
                  <li
                    className={`nav-item ${
                      path.includes(item.link) ? "active" : ""
                    }`}
                  >
                    <a className="nav-link" href={item.link}>
                      {item.name}
                    </a>
                  </li>
                );
              })}

            {/* customer links */}
            {user.type === "member" &&
              memberLinks.map((item) => {
                return (
                  <li
                    className={`nav-item ${
                      path.includes(item.link) ? "active" : ""
                    }`}
                  >
                    <a className="nav-link" href={item.link}>
                      {item.name}
                    </a>
                  </li>
                );
              })}

            {/* user links */}
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
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
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/profile">
                  Profile
                </a>
                {user.type === "customer" && (
                  <a className="dropdown-item" href="/payment">
                    My Subscription
                  </a>
                )}
                <div className="dropdown-divider"></div>
                <p
                  className="dropdown-item mb-0 pointer"
                  onClick={(e) => {
                    var ans = window.confirm(
                      "Are you sure you want to log out?"
                    );
                    if (ans) {
                      logout();
                    }
                  }}
                >
                  Log Out
                </p>
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
