import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const DetailItem = (props) => {
  return (
    <div>
      <div className="row ">
        <div className="col">
          <h2 className="fw-bold">{props.name}</h2>
          <p className="fs-5">
            {/* <i className="fa-solid
            fa-location-dot"></i> */}
            <FontAwesomeIcon icon={faLocationDot} className="me-2" />
            {props.address}
          </p>
        </div>
        <div className="col d-flex justify-content-end align-items-center ">
          <button className="btn btn-primary fs-4" onClick={props.onSetHotel}>
            Reserve or Book Now!
          </button>
        </div>
      </div>
      <p className="text-primary">
        Excellent location-{props.distance}m from center
      </p>
      <p className=" fw-semibold" style={{ color: "#2f9e44" }}>
        Book a stay over ${props.price} at this property and get a free airport
        taxi
      </p>
      <div className="row row-cols-3 g-2">
        {props.photos.map((photo, index) => (
          <img src={photo} key={index} alt="" />
        ))}
      </div>
      <div className="row mt-5 align-items-center">
        <div className="col-9">
          <h3 className="fw-bold mb-4">{props.title}</h3>
          <p>{props.description}</p>
        </div>
        <div className="col-3 p-4" style={{ background: "#e7f5ff" }}>
          <p className="fs-4">
            <span className="fw-bold"> {`$${props.nine_night_price}`}</span>
            (1 nights)
          </p>
          <button className="btn btn-primary w-100 " onClick={props.onSetHotel}>
            Reserve or Book Now!
          </button>
        </div>
      </div>
    </div>
  );
};
export default DetailItem;
