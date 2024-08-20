import React from "react";

const Form = () => {
  return (
    <div
      style={{ background: "#1864ab" }}
      className="text-center mt-5 text-white"
    >
      <h1 className="fw-bold pt-5 mb-4"> Save time, save money!</h1>
      <p className="fs-5">Sign up and we'll send the best deals to you</p>
      <form action="" className="d-flex justify-content-center pb-5">
        <input
          type="email"
          placeholder="Your Email"
          className="form-control  me-2"
          style={{ height: "60px", width: "350px" }}
        />
        <button type="submit" className="btn btn-primary">
          subscribe
        </button>
      </form>
    </div>
  );
};
export default Form;
