import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./Dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faCommentsDollar,
  faScaleBalanced,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { getFromStorage } from "../context/AuthContext";
const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const user = getFromStorage("login");
  useEffect(() => {
    (async () => {
      const res = await axios.post(
        "http://localhost:5000/admin/getTransaction",
        { transaction: "latest transactions" }
      );
      setTransactions(res.data);
    })();
  }, []);
  const statusHandle = (status) => {
    if (status === "Booked") {
      return <span className={classes.colorBooked}>{status}</span>;
    } else if (status === "Checkin") {
      return <span className="text-bg-success p-1 rounded">{status}</span>;
    } else if (status === "Checkout") {
      return <span className={classes.colorCheckout}>{status}</span>;
    }
  };

  const totalRevenue = transactions.reduce(
    (total, current) => total + current.price,
    0
  );
  console.log(transactions);

  const numberOfUsers = [
    ...new Set(transactions.map((transaction) => transaction.userId)),
  ];

  return (
    <>
      <div className="d-flex gap-4">
        <div className={`${classes.infoboard} flex-fill`}>
          <h5 className="text-black-50">USERS</h5>
          <p>{numberOfUsers.length}</p>
          <div className="d-flex justify-content-end align-items-end">
            <FontAwesomeIcon
              icon={faUser}
              className="text-danger bg-danger-subtle p-1 rounded-1"
            />
          </div>
        </div>
        <div className={`${classes.infoboard} flex-fill`}>
          <h5 className="text-black-50 ">ORDERS</h5>
          <p>{transactions.length}</p>
          <div className="d-flex justify-content-end align-items-end">
            <FontAwesomeIcon
              icon={faCartShopping}
              className="text-warning bg-warning-subtle p-1 rounded-1"
            />
          </div>
        </div>
        <div className={`${classes.infoboard} flex-fill`}>
          <h5 className="text-black-50">ENRNINGS</h5>
          <p>${totalRevenue}</p>
          <div className="d-flex justify-content-end align-items-end">
            <FontAwesomeIcon
              icon={faCommentsDollar}
              className="text-success bg-success-subtle p-1 rounded-1"
            />
          </div>
        </div>
        <div className={`${classes.infoboard} flex-fill`}>
          <h5 className="text-black-50">BALANCE</h5>
          <p>$100</p>
          <div className="d-flex justify-content-end align-items-end">
            <FontAwesomeIcon
              icon={faScaleBalanced}
              style={{ color: "#be4bdb", backgroundColor: "#eebefa" }}
              className="p-1 rounded-1"
            />
          </div>
        </div>
      </div>
      <div className="shadow p-4 mt-5  ">
        <h2>Latest Transactions</h2>
        <table className="w-100 ">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>
                <span className="border-start ps-2">ID</span>
              </th>
              <th>
                <span className="border-start ps-2">User</span>
              </th>
              <th>
                <span className="border-start ps-2">Hotel</span>
              </th>
              <th>
                <span className="border-start ps-2">Room</span>
              </th>
              <th>
                <span className="border-start ps-2">Date</span>
              </th>
              <th>
                <span className="border-start ps-2">Price</span>
              </th>
              <th>
                <span className="border-start ps-2">Payment Method</span>
              </th>
              <th>
                <span className="border-start ps-2">Status</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((hotel) => (
              <tr key={hotel._id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{hotel._id}</td>
                <td>{hotel.user}</td>
                <td>{hotel.hotel.name}</td>
                <td>
                  {hotel.room.map((number, index, array) => (
                    <span key={index}>
                      {number.slice(0, 3)}
                      {index < array.length - 1 && ","}
                    </span>
                  ))}
                </td>
                <td>{`${format(new Date(hotel.startDate), "dd/MM/yyyy")} -
                    ${format(new Date(hotel.endDate), "dd/MM/yyyy")}`}</td>
                <td>{hotel.price}</td>
                <td>{hotel.payment}</td>
                <td>{statusHandle(hotel.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={`${classes.empty} border border-top-0`}></div>
        <div
          className={` border border-top-0 d-flex gap-4 justify-content-end align-items-center p-2`}
        >
          1-{transactions.length} of {transactions.length}
          <button className="btn border-0">
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button className="btn border-0">
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
