import React, { forwardRef, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";

const FormSearch = forwardRef((props, ref) => {
  const [showDate, setShowDate] = useState(false);

  const { cityEntered, options } = props.location.state;
  const { adult, children, room } = options;

  return (
    <div className="bg-warning rounded p-2">
      <h1 className="text-secondary">Search</h1>
      <form>
        <div className="">
          <label className="mb-3 mt-4">Destination</label>
          <input
            type="search"
            className="form-control "
            style={{ height: "50px" }}
            defaultValue={cityEntered}
            ref={ref.cityRef}
          />
        </div>
        <div>
          <label className="mb-3 mt-4 ">Check-in Date</label>
          <span
            type="text"
            className="bg-light p-2 d-block"
            style={{
              height: "50px",
            }}
            onClick={() => {
              setShowDate(!showDate);
            }}
          >{`${format(props.datePicker[0].startDate, "MM/dd/yyyy")} to ${format(
            props.datePicker[0].endDate,
            "MM/dd/yyy"
          )}`}</span>
          {showDate && (
            <DateRange
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              minDate={new Date()}
              onChange={(item) => props.setDatePicker([item.selection])}
              ranges={props.datePicker}
            />
          )}
        </div>
        <p className="mt-4">Options</p>
        <div className="p-4 pt-0 text-secondary d-flex flex-column gap-4 ">
          <div className="row align-items-center">
            <label className="col"> Min price per night</label>
            <input
              type="number"
              min="10"
              className=" border-0 rounded col-3 "
              style={{ height: "35px", outline: "none" }}
            />
          </div>
          <div className="row align-items-center">
            <label className="col">Max price per night</label>
            <input
              type="number"
              className=" border-0 rounded col-3 "
              style={{ height: "35px", outline: "none" }}
              max=""
            />
          </div>
          <div className="row align-items-center">
            <label className="col">Adult</label>
            <input
              type="number"
              className=" border-0 rounded col-3 "
              style={{ height: "35px", outline: "none" }}
              min={1}
              defaultValue={adult}
            />
          </div>
          <div className="row align-items-center">
            <label className="col">Children</label>
            <input
              type="number"
              className=" border-0 rounded col-3 "
              style={{ height: "35px", outline: "none" }}
              min={0}
              defaultValue={children}
            />
          </div>
          <div className="row align-items-center">
            <label className="col">Room</label>
            <input
              type="number"
              className=" border-0 rounded col-3 "
              style={{ height: "35px", outline: "none" }}
              ref={ref.room}
              defaultValue={room}
              min={1}
            />
          </div>
        </div>

        <button
          className="btn btn-primary w-100 fs-5"
          onClick={props.searchOnClick}
        >
          Search
        </button>
      </form>
    </div>
  );
});
export default FormSearch;
