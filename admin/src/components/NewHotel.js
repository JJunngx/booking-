import React, { useRef, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import InputHotel from "./InputHotel";
import url_http from "../usehttp";
const NewHotel = () => {
  const inputRef = {
    nameRef: useRef(null),
    cityRef: useRef(null),
    distanceRef: useRef(null),
    descriptionRef: useRef(null),
    imageRef: useRef(null),
    typeRef: useRef(null),
    addressRef: useRef(null),
    titleRef: useRef(null),
    priceRef: useRef(null),
    featuredRef: useRef("false"),
    roomRef: useRef(null),
  };
  const [selectRooms, setSelectRooms] = useState([]);

  const navigate = useNavigate();
  const handleRoomChange = (event) => {
    const options = event.target.options;
    const selectedRoomIds = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedRoomIds.push(options[i].value);
      }
    }
    setSelectRooms(selectedRoomIds);
  };
  const newHotelHandle = async (e) => {
    e.preventDefault();
    const nameEntered = inputRef.nameRef.current.value;
    const cityEntered = inputRef.cityRef.current.value;
    const distanceEntered = inputRef.distanceRef.current.value;
    const descriptionEntered = inputRef.descriptionRef.current.value;
    const imageEntered = inputRef.imageRef.current.value;
    const typeEntered = inputRef.typeRef.current.value;
    const addressEntered = inputRef.addressRef.current.value;
    const titleEntered = inputRef.titleRef.current.value;
    const priceEntered = inputRef.priceRef.current.value;
    const featuredEnterd = inputRef.featuredRef.current.value;

    console.log(inputRef.roomRef);
    try {
      const res = await axios.post(
        `${url_http}/admin/newHotel`,
        {
          nameEntered,
          cityEntered,
          distanceEntered,
          descriptionEntered,
          imageEntered,
          typeEntered,
          addressEntered,
          titleEntered,
          priceEntered,
          featuredEnterd,
          roomEntered: selectRooms,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.data.message) {
        alert(res.data.message);
      }
      navigate("/hotels");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <InputHotel
        handle={newHotelHandle}
        ref={inputRef}
        selectRooms={selectRooms}
        handleRoomChange={handleRoomChange}
      />
    </>
  );
};

export default NewHotel;
