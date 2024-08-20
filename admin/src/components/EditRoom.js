import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import InputRoom from "./InputRoom";
const EditRoom = () => {
  const inputRef = {
    titleRef: useRef(null),
    priceRef: useRef(null),
    descriptionRef: useRef(null),
    maxPeopleRef: useRef(null),
    numberRoomRef: useRef(null),
  };

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [room, setRoom] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/admin/getEditRoom/${id}`,

          { headers: { "content-Type": "application/json" } }
        );

        setRoom(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);
  const newRoomHandle = async (e) => {
    e.preventDefault();
    const titleEntered = inputRef.titleRef.current.value;
    const priceEntered = inputRef.priceRef.current.value;
    const descriptionEntered = inputRef.descriptionRef.current.value;
    const maxPeopleEntered = inputRef.maxPeopleRef.current.value;
    const numberRoomEntered = inputRef.numberRoomRef.current.value;
    try {
      await axios.put(
        "http://localhost:5000/admin/editRoom",
        {
          _id: id,
          titleEntered,
          priceEntered,
          descriptionEntered,
          maxPeopleEntered,
          numberRoomEntered,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      navigate("/rooms");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <InputRoom ref={inputRef} handle={newRoomHandle} room={room} id={id} />
    </div>
  );
};

export default EditRoom;
