import React from "react";

import styled from "./CityList.module.css";

import Card from "react-bootstrap/Card";

const CityList = (props) => {
  return (
    <li className="position-relative">
      <a href="#" className="text-decoration-none text-white ">
        <img
          src={props.image}
          alt={props.name}
          className="w-100
        rounded "
          style={{ height: "300px" }}
        />

        <div className="position-absolute bottom-0 ms-4">
          <h1 className="fw-bolder">{props.name}</h1>
          <p className="fs-4 fw-bold mb-4">{props.subText}</p>
        </div>
      </a>
    </li>
  );
};

const TypeHotel = (props) => {
  return (
    <li>
      <a href="#" className="text-decoration-none text-black">
        <Card className="border-0">
          <Card.Img
            variant="top"
            src={props.image}
            className={`${styled.styledImg}  rounded `}
          />
          <Card.Body className="ps-0">
            <Card.Title className="fw-bold">{props.name}</Card.Title>
            <Card.Text>{`${props.count}`}</Card.Text>
          </Card.Body>
        </Card>
      </a>
    </li>
  );
};

const HotelList = (props) => {
  return (
    <li className="mb-5">
      <div>
        <Card className="border-0">
          <Card.Img
            variant="top"
            src={props.image_url}
            className={styled.styledImgList}
          />
          <Card.Body className="ps-0">
            <Card.Link className="fw-bold " style={{ color: "purple" }}>
              {props.name}
            </Card.Link>
            <Card.Text>{props.city}</Card.Text>
            <Card.Text className="fw-semibold ">{`Starting from ${props.price}$`}</Card.Text>
            <Card.Text>
              <span
                className="text-white p-1 me-3"
                style={{ background: "#1864ab" }}
              >
                {props.rate}
              </span>
              rating
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </li>
  );
};

export { CityList, TypeHotel, HotelList };
