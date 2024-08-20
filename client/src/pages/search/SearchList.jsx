import React from "react";

const SearchPage = (props) => {
  return (
    <div className="card mb-3 ">
      <div className="row p-2 ">
        <div className="col-4">
          <img className="card-img w-100 h-100 " src={props.image_url} />
        </div>
        <div className="col-5">
          <div className="card-body">
            <h5 className="card-title">{props.name}</h5>

            <p className="card-text">{`${props.distance} from center`}</p>
            <button className="btn btn-success mb-3">
              {props.roomOfNumber} room
            </button>
            <p className="card-text fw-bold">{props.description}</p>
            <p className="card-text">{props.type}</p>
            {props.featured ? (
              <>
                <p className="text-success fw-bold ">Free cancellation</p>

                <p className="text-success">
                  you can cancel later, solock in this great price today!
                </p>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-3  d-flex flex-column justify-content-between">
          <div className="d-flex justify-content-between">
            <span className="fw-bold fs-5 "></span>
            <span
              className="p-1 text-white fw-medium "
              style={{ background: "#1864ab" }}
            >
              {props.rate}
            </span>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="fs-4 fw-medium ">{`$ ${props.price}`}</p>
            <p style={{ color: "#adb5bd" }}>includess taxes and fees</p>

            <button
              className="btn btn-primary fw-semibold"
              onClick={props.onSetRoom}
            >
              See availability
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
