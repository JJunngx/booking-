import React, { useEffect, useState } from "react";
import classes from "./Transaction.module.css";
import axios from "axios";
import HomePage from "../pages/home/Nav/HomePage";
import NavBar from "../pages/home/Nav/NavBar";
import Form from "../pages/home/form/Form";
import Footer from "../pages/home/footer/Footer";
import { format } from "date-fns";
import { getFromStorage } from "../pages/home/Nav/Storage";
const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const user = getFromStorage("token");
  useEffect(() => {
    (async () => {
      const res = await axios.post("http://localhost:5000/getTransaction", {
        id: user.userId,
      });
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

  return (
    <div>
      <NavBar />
      <HomePage />
      <div className="container">
        <h1>Your Transactions</h1>
        <table className="w-100">
          <thead>
            <tr>
              <th style={{ width: "5%" }}>#</th>
              <th style={{ width: "25%" }}>Hotel</th>
              <th style={{ width: "10%" }}>Room</th>
              <th style={{ width: "20%" }}>Date</th>
              <th style={{ width: "10%" }}>Price</th>
              <th style={{ width: "20%" }}>Payment Method</th>
              <th style={{ width: "10%" }}>status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((hotel, index) => (
              <tr key={hotel._id}>
                <td>{index + 1}</td>
                <td>{hotel.hotel.name}</td>
                <td>
                  {hotel.room.map((number, index, array) => (
                    <span key={index}>
                      {number.slice(0, 3)}
                      {index < array.length - 1 && ","}
                    </span>
                  ))}
                </td>

                <td>
                  {`${format(new Date(hotel.startDate), "dd/MM/yyyy")} -
                    ${format(new Date(hotel.endDate), "dd/MM/yyyy")}`}
                </td>
                <td>{hotel.price}</td>
                <td>{hotel.payment}</td>
                <td>{statusHandle(hotel.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Form />
      <Footer />
    </div>
  );
};

export default Transaction;
