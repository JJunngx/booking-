import React, { forwardRef, useEffect, useState } from "react";

import axios from "axios";
import classes from "./InputRoom.module.css";
import url_http from "../usehttp";
const InputRoom = forwardRef((props, ref) => {
  const [nameHotel, setNameHotel] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await axios.get(`${url_http}/admin/nameHotel`, {
        headers: { "Content-Type": "application/json" },
      });
      setNameHotel(res.data);
    })();
  }, []);
  const { title, price, maxPeople, desc, roomNumbers } = props.room ?? {};

  return (
    <form className="shadow px-5 py-2  ms-2" onSubmit={props.handle}>
      <div className="row justify-content-between">
        <div className="col-5">
          <div className="mb-3">
            <label>Title</label>
            <input
              type="text"
              placeholder="title"
              className={classes.input}
              defaultValue={title}
              ref={ref.titleRef}
              required
            />
          </div>
          <div className="mb-3">
            <label>Price</label>
            <input
              type="number"
              placeholder="price"
              className={classes.input}
              defaultValue={price}
              ref={ref.priceRef}
              required
            />
          </div>
        </div>
        <div className="col-5">
          <div className="mb-3">
            <label>Description</label>
            <input
              type="text"
              placeholder="description"
              className={classes.input}
              defaultValue={desc}
              ref={ref.descriptionRef}
              required
            />
          </div>
          <div className="mb-3">
            <label>Max people</label>
            <input
              type="number"
              placeholder="price"
              min={1}
              className={classes.input}
              defaultValue={maxPeople}
              ref={ref.maxPeopleRef}
              required
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="mb-3">
          <label>Rooms</label>
          <textarea
            rows="2"
            cols="30"
            placeholder="number room"
            className="d-block w-100"
            defaultValue={roomNumbers}
            ref={ref.numberRoomRef}
            required
          ></textarea>
        </div>
        {!props?.id && (
          <div className="mb-3">
            <label>Choose a hotel</label>
            <select className="d-block">
              {nameHotel.map((name, index) => (
                <option value={name} key={index}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        )}
        <button type="submit" className={classes.button}>
          Send
        </button>
      </div>
    </form>
  );
});

export default InputRoom;
