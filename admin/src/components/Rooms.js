import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import classes from "./Rooms.module.css";
import url_http from "../usehttp";

const Rooms = () => {
  const [roomList, setRoomList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const res = await axios.get(`${url_http}/admin/roomsList`, {
        headers: { "Content-Type": "application/json" },
      });

      setRoomList(res.data);
    })();
  }, []);
  const numberOfRooms = roomList.length;
  const nextHandler = () => {
    setCurrentPage(currentPage + 1);
  };
  const prevHandler = () => {
    setCurrentPage(currentPage - 1);
  };
  const itemsPerPage = 10; //số lượng room trên /trang
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayItems = roomList.slice(startIndex, endIndex);

  const deleteRoomHandle = async (_id) => {
    try {
      await axios.post(
        `${url_http}/admin/deleteRoom`,
        { _id },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between my-3">
          <h2>Rooms List</h2>
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => navigate("/newRoom")}
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
                <span className="border-start ps-2">Title</span>
              </th>
              <th>
                <span className="border-start ps-2">Description</span>
              </th>
              <th>
                <span className="border-start ps-2">Price</span>
              </th>
              <th>
                <span className="border-start ps-2">Max People</span>
              </th>
              <th>
                <span className="border-start ps-2">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {displayItems.map((room) => (
              <tr key={room._id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{room._id}</td>
                <td>{room.title}</td>
                <td>{room.desc}</td>
                <td>{room.price}</td>
                <td>{room.maxPeople}</td>

                <td>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => {
                      if (window.confirm("Are you sure?")) {
                        deleteRoomHandle(room._id);
                      }
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-outline-success"
                    onClick={() => navigate(`/editRoom/${room._id}`)}
                  >
                    {" "}
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={`${classes.empty} border border-top-0`}></div>
        <div
          className={` border border-top-0 d-flex gap-4 justify-content-end align-items-center p-2`}
        >
          1-{numberOfRooms} of {numberOfRooms}
          <button
            className="btn border-0"
            onClick={prevHandler}
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button
            className="btn border-0"
            onClick={nextHandler}
            disabled={endIndex >= roomList.length}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
