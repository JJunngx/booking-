import React, { useState, useEffect } from "react";
import axios from "axios";
import { CityList, TypeHotel, HotelList } from "./CityList";
import hanoi from "./Image/Ha Noi.jpg";
import hcm from "./Image/HCM.jpg";
import danang from "./Image/Da Nang.jpg";
import { url_http } from "../../../hook/useHttp";

const City = () => {
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${url_http}/hotel`);

        setHotels(res.data.hotels);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  const filterHotel = (property, city) =>
    hotels.filter((hotel) => hotel[property] === city).length;

  const city = [
    //số lượng khách sạn theo khu vực
    {
      name: "Ha Noi",
      subText: ` ${filterHotel("city", "Ha Noi")} properties `,
      image: hanoi,
    },
    {
      name: "Ho Chi Minh",
      subText: ` ${filterHotel("city", "Ho Chi Minh")} properties`,
      image: hcm,
    },
    {
      name: "Da Nang",
      subText: `${filterHotel("city", "Da Nang")} properties`,
      image: danang,
    },
  ];

  const holtetype = [
    // số lượng khách sạn theo từng loại
    {
      name: "Hotels",
      count: `${filterHotel("type", "hotel")} hotel`,
      image: "./images/type_1.webp",
    },
    {
      name: "Apartments",
      count: ` ${filterHotel("type", "apartments")} apartments`,
      image: "./images/type_2.jpg",
    },
    {
      name: "Resorts",
      count: ` ${filterHotel("type", "resorts")} resorts`,
      image: "./images/type_3.jpg",
    },
    {
      name: "Villas",
      count: ` ${filterHotel("type", "villas")} villas`,
      image: "./images/type_4.jpg",
    },
    {
      name: "Cabins",
      count: ` ${filterHotel("type", "cabins")} cabins`,
      image: "./images/type_5.jpg",
    },
  ];
  //Top 3 khách sạn có rating cao nhất.
  const hotelsRate = hotels.sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <div className="container mt-5 ">
      <ul className="list-unstyled row">
        {city.map((city, index) => (
          <div className="col-4" key={index}>
            <CityList
              name={city.name}
              subText={city.subText}
              image={city.image}
            />
          </div>
        ))}
      </ul>

      <h3 className="mt-5 mb-5 fw-bold">Browse by property type</h3>
      <ul className="list-unstyled  row">
        {holtetype.map((type, index) => (
          <div className="col" key={index}>
            <TypeHotel name={type.name} count={type.count} image={type.image} />
          </div>
        ))}
      </ul>

      <h3 className="mt-5 mb-5 fw-bold">Homes guests love</h3>
      <ul className="list-unstyled row">
        {hotelsRate.map((list) => (
          <div key={list._id} className="col-4">
            <HotelList
              image_url={list.photos[0]}
              name={list.title}
              city={list.city}
              price={list.cheapestPrice}
              rate={list.rating}
              type={list.type}
            />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default City;
