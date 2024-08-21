import React, { useEffect, useState, useRef } from "react";
import { DateRange } from "react-date-range";
import { useNavigate } from "react-router-dom";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { getFromStorage } from "../home/Nav/Storage";
import DetailItem from "./DetailItem";
import Footer from "../home/footer/Footer";
import Form from "../home/form/Form";
import { url_http } from "../../hook/useHttp";

const Detail = () => {
  const [datePicker, setDatePicker] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [detailData, setDetailData] = useState({});
  const [room, setRoom] = useState(false);
  const [roomData, setRoomData] = useState([]);
  const params = useParams();
  const nameRef = useRef(null);
  const methodPayRef = useRef(null);
  const user = getFromStorage("token");
  const { id } = params;
  const [checkedItems, setCheckedItems] = useState({});
  const [roomEmpty, setRoomEmpty] = useState([]);
  const navigative = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post(
          `${url_http}/hotel/search/${id}`,
          { id },
          { headers: { "content-Type": "application/json" } }
        );
        setDetailData(res.data.room);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id]);
  const allRoomNumbers = roomData
    .map((item) => item.roomNumbers.map((number) => number + item._id))
    .flat();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post(
          `${url_http}/showroom`,
          { datePicker, allRoomNumbers },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        setRoomEmpty(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [datePicker]);

  const setRoomHandle = async () => {
    setRoom(true);
    const idRoom = detailData.rooms;
    try {
      const res = await axios.post(
        `${url_http}/room`,
        { idRoom },
        { headers: { "Content-Type": "application/json" } }
      );
      setRoomData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCheckboxChange = async (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prev) => {
      if (!checked) {
        const { [name]: omittedItem, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [name]: checked,
      };
    });
  };

  // const roomNumber = Object.keys(checkedItems).map((number) =>
  //   number.slice(0, 3)
  // );

  const roomNumbers = Object.keys(checkedItems);
  const numberRest =
    (datePicker[0].endDate.getTime() - datePicker[0].startDate.getTime()) /
    (1000 * 3600 * 24);

  const totalBill = roomData
    .map((item) => ({
      room: item.roomNumbers
        .map((room) => room + item._id)
        .flat()
        .filter((element) => roomNumbers.includes(element)),
      price: item.price,
    }))
    .reduce((accumulator, currentValue) => {
      return (
        accumulator + currentValue.price * currentValue.room.length * numberRest
      );
    }, 0);

  const transactionHandle = async (e) => {
    e.preventDefault();
    const nameEntered = nameRef.current.value;
    const methodPayEntered = methodPayRef.current.value;

    try {
      const res = await axios.post(
        `${url_http}/transaction`,
        {
          nameEntered,
          hotelId: id,
          userId: user.userId,
          methodPayEntered,
          roomNumbers,
          datePicker,
          totalBill,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(res);
      navigative("/Transaction");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container mb-5">
        <DetailItem
          name={detailData.name}
          address={detailData.address}
          distance={detailData.distance}
          price={detailData.cheapestPrice}
          photos={detailData.photos || []}
          title={detailData.title}
          description={detailData.desc}
          nine_night_price={detailData?.cheapestPrice}
          onSetHotel={setRoomHandle}
        />
        {room && (
          <>
            <div className="row justify-content-between">
              <div className="col-3">
                <h4>Dates</h4>
                <DateRange
                  editableDateInputs={true}
                  moveRangeOnFirstSelection={false}
                  minDate={new Date()}
                  onChange={(item) => setDatePicker([item.selection])}
                  ranges={datePicker}
                />
              </div>
              <div className="col-8">
                <h4>Reserve Info</h4>
                <form>
                  <label htmlFor="name" className="mt-3">
                    Your Full Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Full name"
                    className=" form-control mt-2"
                    ref={nameRef}
                    required
                  />
                  <label htmlFor="Email" className="mt-3">
                    Your Email:
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    id="Email"
                    className=" form-control mt-2"
                    required
                  />
                  <label htmlFor="phone" className="mt-3">
                    Your Phone Number:
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Phone Number"
                    className="form-control mt-2"
                    required
                  />
                  <label htmlFor="card" className="mt-3">
                    Your Identify Card Number:
                  </label>
                  <input
                    type="tel"
                    id="card"
                    className="form-control mt-2"
                    placeholder="Card Number"
                    required
                  />
                </form>
              </div>
            </div>

            <div>
              <h4>Select Rooms</h4>
              <div className="row gap-5">
                {roomData.map((room) => (
                  <div className="col-5" key={room._id}>
                    <div>
                      <h5>{room.title}</h5>
                      <div className="d-flex justify-content-between gap-5">
                        <p>{room.desc}</p>
                        <div className="d-flex gap-2 justify-content-end">
                          {roomEmpty.map((data) => (
                            <span
                              className="d-flex flex-column d-inline align-items-end"
                              key={data}
                            >
                              {data.slice(3, data.length) === room._id && (
                                <>
                                  <label>{data.slice(0, 3)}</label>
                                  <input
                                    type="checkbox"
                                    name={data}
                                    checked={checkedItems[data.slice(0, 3)]}
                                    onChange={handleCheckboxChange}
                                  />
                                </>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p>Max people:{room.maxPeople}</p>
                      <p>${room.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h4>Total Bill:${totalBill}</h4>
              <div className="d-flex gap-5">
                <select
                  defaultValue="Select Payment Method"
                  className="form-select w-25"
                  ref={methodPayRef}
                >
                  <option disabled>Select Payment Method</option>
                  <option value="credit card">credit card</option>
                  <option value="cash">cash</option>
                </select>
                <button
                  className="btn btn-primary px-5 py-2"
                  onClick={transactionHandle}
                >
                  Reserve Now
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <Form />
      <Footer />
    </>
  );
};

export default Detail;
