import React from "react";
import { useJwt } from "react-jwt";

function Navbar() {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  let user = JSON.parse(localStorage.getItem("user")) || {};

  const { decodedToken } = useJwt(user.accessToken);

  if (decodedToken) {
    user = {
      ...user,
      type: decodedToken.type,
      subscribed: decodedToken.subscribed || false,
    };
    localStorage.setItem("user", JSON.stringify(user));
  }

  const path = window.location.pathname;

  const navBarLink = [
    {
      name: "Gyms",
      link: "/gyms",
    },
    {
      name: "Pricing",
      link: "/pricing-plans",
    },
    {
      name: "Check Nutrition",
      link: "/nutrition",
    },
  ];

  const adminLinks = [
    {
      name: "My Gym",
      link: `/gym/${user.gym_id}`,
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
      name: "Health Record",
      link: "/health-record",
    },
    {
      name: "Health Plan",
      link: "/health-plan",
    },
    { name: "Workout Plan", link: "/workout-plan" },
    { name: "Diet Plan", link: "/diet-plan" },
  ];

  const rootLinks = [
    {
      name: "Members",
      link: "/all-members",
    },
    {
      name: "Staff",
      link: "/all-staff",
    },
    {
      name: "Dashboard",
      link: "/dashboard",
    },
  ];

  return (
    <>
      <nav className="custom-navbar fixed-top navbar navbar-dark bg-primary navbar-expand-lg">
        <a className="navbar-brand" href="/">
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
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      path.includes(item.link) ? "active" : ""
                    }`}
                    href={item.link}
                  >
                    {item.name}
                  </a>
                </li>
              );
            })}

            {user.accessToken && (
              <>
                {/* admin links */}
                {user.type === "admin" &&
                  adminLinks.map((item) => {
                    return (
                      <li className="nav-item">
                        <a
                          className={`nav-link ${
                            path.includes(item.link) ? "active" : ""
                          }`}
                          href={item.link}
                        >
                          {item.name}
                        </a>
                      </li>
                    );
                  })}

                {/* trainer links */}
                {user.type === "trainer" &&
                  trainerLinks.map((item) => {
                    return (
                      <li className="nav-item">
                        <a
                          className={`nav-link ${
                            path.includes(item.link) ? "active" : ""
                          }`}
                          href={item.link}
                        >
                          {item.name}
                        </a>
                      </li>
                    );
                  })}

                {/* customer links */}
                {user.type === "member" &&
                  memberLinks.map((item) => {
                    return (
                      <li className="nav-item">
                        <a
                          className={`nav-link ${
                            path.includes(item.link) ? "active" : ""
                          }`}
                          href={item.link}
                        >
                          {item.name}
                        </a>
                      </li>
                    );
                  })}

                {/* root links */}
                {user.type === "root" &&
                  rootLinks.map((item) => {
                    return (
                      <li className="nav-item">
                        <a
                          className={`nav-link ${
                            path.includes(item.link) ? "active" : ""
                          }`}
                          href={item.link}
                        >
                          {item.name}
                        </a>
                      </li>
                    );
                  })}
              </>
            )}
          </ul>

          {user.accessToken ? (
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
                  <a className="dropdown-item" href="/user/profile">
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
          ) : (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
