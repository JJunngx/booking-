import React, { useState, useRef, useEffect } from "react";

import { DateRange } from "react-date-range";

import { useNavigate } from "react-router-dom";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import axios from "axios";
import useHttp from "../../../hook/useHttp";
import classes from "./HomePage.module.css";
const HomePage = () => {
  const [DatePicker, setDatePicker] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [showDate, setShowInput] = useState(false);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const cityRef = useRef(null);

  const navigate = useNavigate();

  const { searchResults } = useHttp();
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (results.length > 0) {
      const cityEntered = cityRef.current.value;
      navigate("/search", {
        state: { cityEntered, DatePicker, options, results },
      });
    }
  }, [results]);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const clickDateInput = () => {
    setShowInput(!showDate);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const cityEntered = cityRef.current.value;
    searchResults(
      { city: cityEntered, datePicker: DatePicker, room: options.room },
      "/hotel/search",
      setResults
    );
  };

  return (
    <div className="container position-relative">
      <div className="position-relative top-100 start-50 translate-middle bg-white border border-warning p-2 border-4 rounded w-100 ">
        <form className="d-flex align-items-center gap-3 px-4 justify-content-between">
          <div className="d-flex align-items-center">
            <i className="fa fa-bed me-3 opacity-50"></i>
            <input
              type="text"
              className="form-control border-0 "
              placeholder="where are you doing"
              ref={cityRef}
            />
          </div>

          <div className="d-flex align-items-center">
            <i className="fa fa-calendar opacity-50  me-3"></i>

            <span
              className=" text-body-tertiary border-0 "
              onClick={clickDateInput}
            >
              {`${format(DatePicker[0].startDate, "MM/dd/yyyy")} to ${format(
                DatePicker[0].endDate,
                "MM/dd/yyyy"
              )}`}
            </span>
          </div>

          <div className="">
            <i className="fa fa-female opacity-50  me-3"></i>
            <span
              className="text-body-tertiary"
              onClick={() => {
                setOpenOptions(!openOptions);
              }}
            >{`${options.adult} adult · ${options.children} children · ${options.room}`}</span>
          </div>

          <button
            type="submit"
            className="btn btn-primary "
            onClick={handleSearch}
          >
            search
          </button>
        </form>
      </div>
      {showDate && (
        <DateRange
          editableDateInputs={true}
          moveRangeOnFirstSelection={false}
          className="date position-absolute top-0 end-50 z-1  mt-4"
          minDate={new Date()}
          onChange={(item) => setDatePicker([item.selection])}
          ranges={DatePicker}
        />
      )}
      {openOptions && (
        <div className={classes.option}>
          <div className="d-flex justify-content-between mb-2">
            <span>Adult</span>
            <div>
              <button
                className={classes.disabledButton}
                disabled={options.adult <= 1}
                onClick={() => handleOption("adult", "d")}
              >
                -
              </button>
              <span> {options.adult} </span>
              <button
                className={classes.disabledButton}
                onClick={() => {
                  handleOption("adult", "i");
                }}
              >
                +
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>children</span>
            <div>
              <button
                className={classes.disabledButton}
                disabled={options.children <= 0}
                onClick={() => handleOption("children", "d")}
              >
                -
              </button>
              <span> {options.children} </span>
              <button
                className={classes.disabledButton}
                onClick={() => {
                  handleOption("children", "i");
                }}
              >
                +
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Room</span>
            <div>
              <button
                className={classes.disabledButton}
                disabled={options.room <= 1}
                onClick={() => {
                  handleOption("room", "d");
                }}
              >
                -
              </button>
              <span> {options.room} </span>
              <button
                className={classes.disabledButton}
                onClick={() => {
                  handleOption("room", "i");
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default HomePage;
