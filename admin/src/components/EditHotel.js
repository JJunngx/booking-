import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import InputHotel from "./InputHotel";
import url_http from "../usehttp";
const EditHotel = () => {
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
  const [hotel, setHotel] = useState({});
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${url_http}/admin/getEditHotel/${id}`, {
          headers: { "content-Type": "application/json" },
        });

        setHotel(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);
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
  const editHotelHandle = async (e) => {
    e.preventDefault();

    const nameEntered = inputRef.nameRef.current.value;
    console.log(nameEntered);
    const cityEntered = inputRef.cityRef.current.value;
    const distanceEntered = inputRef.distanceRef.current.value;
    const descriptionEntered = inputRef.descriptionRef.current.value;
    const imageEntered = inputRef.imageRef.current.value;
    const typeEntered = inputRef.typeRef.current.value;
    const addressEntered = inputRef.addressRef.current.value;
    const titleEntered = inputRef.titleRef.current.value;
    const priceEntered = inputRef.priceRef.current.value;
    const featuredEntered = inputRef.featuredRef.current.value;
    console.log({
      _id: id,
      nameEntered,
      cityEntered,
      distanceEntered,
      descriptionEntered,
      imageEntered,
      typeEntered,
      addressEntered,
      titleEntered,
      priceEntered,
      featuredEntered,
      roomEntered: selectRooms,
    });
    try {
      await axios.put(
        `${url_http}/admin/editHotel`,
        {
          _id: id,
          nameEntered,
          cityEntered,
          distanceEntered,
          descriptionEntered,
          imageEntered,
          typeEntered,
          addressEntered,
          titleEntered,
          priceEntered,
          featuredEntered,
          roomEntered: selectRooms,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      navigate("/hotels");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <InputHotel
        handle={editHotelHandle}
        ref={inputRef}
        hotel={hotel}
        selectRooms={selectRooms}
        handleRoomChange={handleRoomChange}
      />
    </>
  );
};

export default EditHotel;
