import { useContext, useEffect } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser as regularUser } from "@fortawesome/free-regular-svg-icons";
import {
  faHotel,
  faTruck,
  faHospital,
  faRightFromBracket,
  faSquare,
  faCity,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./Root.module.css";
import { AuthContext, getFromStorage } from "../context/AuthContext";
const Root = () => {
  const { logout } = useContext(AuthContext);
  const isLogged = getFromStorage("login");

  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, [isLogged, logout, navigate]);

  return (
    <div className={classes.adminPage}>
      <div className="row ">
        <h3
          className={`${classes.head} border-end mb-0 py-3 text-center col-2`}
        >
          Admin Page
        </h3>
        <div className="col-10"></div>
        <div className={`col-2 pe-0 `}>
          <ul className={`list-unstyled ${classes.list} border-top`}>
            <li>MAIN</li>
            <li>
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isActive ? classes.active : isPending ? "pending" : ""
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`w-5 h-5 ${classes.grid}`}
                >
                  <path
                    fillRule="evenodd"
                    d="M4.25 2A2.25 2.25 0 0 0 2 4.25v2.5A2.25 2.25 0 0 0 4.25 9h2.5A2.25 2.25 0 0 0 9 6.75v-2.5A2.25 2.25 0 0 0 6.75 2h-2.5Zm0 9A2.25 2.25 0 0 0 2 13.25v2.5A2.25 2.25 0 0 0 4.25 18h2.5A2.25 2.25 0 0 0 9 15.75v-2.5A2.25 2.25 0 0 0 6.75 11h-2.5Zm9-9A2.25 2.25 0 0 0 11 4.25v2.5A2.25 2.25 0 0 0 13.25 9h2.5A2.25 2.25 0 0 0 18 6.75v-2.5A2.25 2.25 0 0 0 15.75 2h-2.5Zm0 9A2.25 2.25 0 0 0 11 13.25v2.5A2.25 2.25 0 0 0 13.25 18h2.5A2.25 2.25 0 0 0 18 15.75v-2.5A2.25 2.25 0 0 0 15.75 11h-2.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span> Dashboard</span>
              </NavLink>
            </li>

            <li>Lists</li>
            <li>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                <FontAwesomeIcon icon={regularUser} className={classes.icon} />
                Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/hotels"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                <FontAwesomeIcon icon={faHotel} className={classes.icon} />
                Hotels
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/rooms"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                <FontAwesomeIcon icon={faSquare} className={classes.icon} />
                Rooms
              </NavLink>
            </li>
            <li>
              <NavLink
                to="transactions"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                <FontAwesomeIcon icon={faTruck} className={classes.icon} />
                Transactions
              </NavLink>
            </li>
            <li>NEW</li>

            <li>
              <NavLink
                to="/newHotel"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                <FontAwesomeIcon icon={faCity} className={classes.icon} />
                New Hotel
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/newRoom"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                <FontAwesomeIcon icon={faHospital} className={classes.icon} />
                New Rom
              </NavLink>
            </li>
            <li>USER</li>
            <li onClick={() => logout()}>
              <FontAwesomeIcon
                icon={faRightFromBracket}
                className={classes.icon}
              />
              Logout
            </li>
          </ul>
        </div>
        <main className={`col-10 border-top border-start ${classes.border}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Root;
