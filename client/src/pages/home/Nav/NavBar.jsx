import React, { useState, useContext } from "react";
import NavBarItem from "./NavBarItem";
import { Link, useNavigate } from "react-router-dom";

import { getFromStorage } from "./Storage";
const NavBar = () => {
  const isLoggedIn = getFromStorage("token");
  const [activeItem, setActiveItem] = useState(0);

  const navigative = useNavigate();

  const { token, username } = isLoggedIn;
  const navBarData = [
    {
      type: "Stays",
      icon: "fa-bed",
      active: true,
    },
    {
      type: "Flights",
      icon: "fa-plane",
      active: false,
    },
    {
      type: "Car rentals",
      icon: "fa-car",
      active: false,
    },
    {
      type: "Attractions",
      icon: "fa-bed",
      active: false,
    },
    {
      type: "Airport taxis",
      icon: "fa-taxi",
      active: false,
    },
  ];
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigative("/");
  };
  return (
    <div style={{ background: "#1864ab" }}>
      <div className="p-5 container">
        <div className="d-flex  justify-content-between pb-5">
          <h2 className="text-white" onClick={() => navigative("/")}>
            {" "}
            Booking Website
          </h2>
          <div className="d-flex align-items-center gap-4">
            {!token ? (
              <>
                <Link to="/register">
                  <button className="me-3 p-1 border-0">Register</button>
                </Link>

                <Link to="/login">
                  <button className="p-1 border-0">Login</button>
                </Link>
              </>
            ) : (
              <>
                <p className="pt-2 text-white">{username}</p>
                <Link to="/transaction">
                  <button className="p-1 border-0">Transaction</button>
                </Link>
                <button className="p-1 border-0" onClick={handleLogout}>
                  Log out
                </button>
              </>
            )}
          </div>
        </div>
        <div className="row">
          <ul className="list-unstyled d-flex justify-content-between col-8">
            {navBarData.map((data, index) => (
              <NavBarItem
                key={index}
                type={data.type}
                icon={data.icon}
                active={index === activeItem}
                onClick={() => setActiveItem(index)}
              />
            ))}
          </ul>
          <div className="col-4"></div>
        </div>
        <h2 className="text-white fw-bolder mt-5">
          A lifetime of discounts? It's Genius
        </h2>
        <p className="text-white my-4">
          Get rewarded for your travels-unclock instant saving of 10% or more
          with a free account
        </p>
        {!token ? (
          <Link to="/login">
            <button className="btn btn-primary mb-5">Sign in/Register</button>
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default NavBar;
