import React, { forwardRef, useState, useEffect } from "react";
import axios from "axios";
import classes from "./InputHotel.module.css";
import { useParams } from "react-router-dom";
const InputHotel = forwardRef((props, ref) => {
  const {
    name,
    city,
    address,
    cheapestPrice,
    desc,
    distance,
    featured,
    photos,
    rooms,
    type,
    title,
  } = props.hotel ?? {};
  console.log(props);
  const params = useParams();
  const [roomName, setRoomName] = useState([]);

  useEffect(() => {
    const roomResult = async () => {
      const res = await axios.post(
        "http://localhost:5000/admin/roomName",
        {},
        { headers: { "Content-Type": "application/json" } }
      );
      setRoomName(res.data);
    };

    roomResult();
  }, []);
  if (featured === undefined && Object.keys(params).length !== 0) return;

  return (
    <div>
      <div className="text-body-tertiary shadow  p-3 my-3 ms-2 ">
        Add New Product
      </div>
      <form
        className="shadow px-5 py-2 row justify-content-between ms-2"
        onSubmit={props.handle}
      >
        <div className="col-5">
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              placeholder="name hotel"
              className={classes.input}
              defaultValue={name}
              ref={ref.nameRef}
              required
            />
          </div>
          <div className="mb-3">
            <label>City</label>
            <input
              type="text"
              placeholder="city"
              className={classes.input}
              defaultValue={city}
              ref={ref.cityRef}
              required
            />
          </div>
          <div className="mb-3">
            <label>Distance from City Center</label>
            <input
              type="text"
              placeholder="distance"
              className={classes.input}
              defaultValue={distance}
              ref={ref.distanceRef}
              required
            />
          </div>
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
            <label>Images</label>
            <textarea
              rows="2"
              cols="50"
              placeholder="link image"
              className="d-block w-100"
              defaultValue={photos}
              ref={ref.imageRef}
              required
            ></textarea>
          </div>
        </div>
        <div className="col-5">
          <div className="mb-3">
            <label>Type</label>
            <input
              type="text"
              placeholder="type hotel"
              className={classes.input}
              defaultValue={type}
              ref={ref.typeRef}
              required
            />
          </div>
          <div className="mb-3">
            <label>Address</label>
            <input
              type="text"
              className={classes.input}
              defaultValue={address}
              ref={ref.addressRef}
              required
            />
          </div>
          <div className="mb-3">
            <label>Title</label>
            <input
              type="text"
              className={classes.input}
              defaultValue={title}
              ref={ref.titleRef}
              required
            />
          </div>

          <div className="mb-3">
            <label>price</label>
            <input
              type="number"
              className={classes.input}
              defaultValue={cheapestPrice}
              ref={ref.priceRef}
              required
            />
          </div>
          <div className="mb-3">
            <label>Featured</label>
            <select
              className="d-block"
              defaultValue={featured}
              name="selectFeatured"
              ref={ref.featuredRef}
              required
            >
              <option value="false">No</option>
              <option value="true">True</option>
            </select>
          </div>
        </div>
        <label className="mt-5 d-block">Rooms</label>

        <select
          multiple
          name="rooms"
          onChange={props.handleRoomChange}
          defaultValue={rooms}
        >
          {roomName.map((room) => (
            <option key={room._id} value={room._id}>
              {room.title}
            </option>
          ))}
        </select>
        <button type="submit" className={classes.button}>
          Send
        </button>
      </form>
    </div>
  );
});

export default InputHotel;
