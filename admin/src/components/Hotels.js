import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classes from "./Hotels.module.css";
import url_http from "../usehttp";
const Hotels = () => {
  const [allHotels, setAllHotels] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const res = await axios.get(`${url_http}/admin/hotelsList`);

      setAllHotels(res.data);
    })();
  }, []);

  const deleteHotelHandle = async (id) => {
    try {
      const res = await axios.post(
        `${url_http}/admin/deleteHotel`,
        { id },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      if (error) {
        alert(error.response.data.message);
      }
    }
  };
  return (
    <>
      <div className="d-flex justify-content-between my-3">
        <h2>Hotels List</h2>
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={() => navigate("/newHotel")}
        >
          Add new
        </button>
      </div>
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
              <span className="border-start ps-2">Name</span>
            </th>
            <th>
              <span className="border-start ps-2">Type</span>
            </th>
            <th>
              <span className="border-start ps-2">Title</span>
            </th>
            <th>
              <span className="border-start ps-2">City</span>
            </th>
            <th>
              <span className="border-start ps-2">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {allHotels.map((hotel) => (
            <tr key={hotel._id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{hotel._id}</td>
              <td>{hotel.name}</td>
              <td>{hotel.type}</td>
              <td>{hotel.title}</td>
              <td>{hotel.city}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-danger "
                  onClick={() => {
                    if (window.confirm("are you sure?")) {
                      deleteHotelHandle(hotel._id);
                    }
                  }}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-outline-success ms-3"
                  onClick={() => navigate(`/editHotel/${hotel._id}`)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Hotels;
