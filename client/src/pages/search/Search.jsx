import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SearchPopup from "./SearchPopup";
import SearchList from "./SearchList";
import useHttp from "../../hook/useHttp";

const Search = () => {
  const location = useLocation();
  const inputRef = {
    cityRef: useRef(null),
    room: useRef(null),
  };
  const { searchResults } = useHttp();
  const [dataHotels, setDataHotels] = useState(location.state.results);
  const [datePicker, setDatePicker] = useState(location.state.DatePicker);
  const navigate = useNavigate();
  const searchHotelHandle = async (e) => {
    e.preventDefault();
    const cityEntered = inputRef.cityRef.current.value;
    const roomEntered = inputRef.room.current.value;

    await searchResults(
      { city: cityEntered, room: roomEntered, datePicker },
      "/hotel/search",
      setDataHotels
    );
  };

  // Tạo một bản sao của mảng gốc để tránh ảnh hưởng trực tiếp

  return (
    <div style={{ maxWidth: "1600px", margin: "auto" }}>
      <div className="row mt-5">
        <div className="col-3">
          <SearchPopup
            location={location}
            ref={inputRef}
            searchOnClick={searchHotelHandle}
            datePicker={datePicker}
            setDatePicker={setDatePicker}
          />
        </div>
        <div className="col-9 ">
          {dataHotels.map((data) => (
            <SearchList
              key={data._doc._id}
              name={data._doc.name}
              distance={data._doc.distance}
              type={data._doc.type}
              description={data._doc.desc}
              price={data._doc.cheapestPrice}
              rate={data._doc.rating}
              image_url={data._doc.photos[0]}
              featured={data._doc.featured}
              roomOfNumber={data.roomOfNumber}
              onSetRoom={() => navigate(`/search/${data._doc._id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
