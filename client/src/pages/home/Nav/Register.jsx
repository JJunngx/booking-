import React, { useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useHttp from "../../../hook/useHttp";
const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const comfirmPasswordRef = useRef();
  const usernameRef = useRef();
  const fullnameRef = useRef();
  const phoneNumberRef = useRef();
  const navigate = useNavigate();
  const { searchResults } = useHttp();
  const createAccountUser = async (e) => {
    e.preventDefault();
    const emailEntered = emailRef.current.value;
    const passwordEntered = passwordRef.current.value;
    const comfirmPasswordEntered = comfirmPasswordRef.current.value;
    const usernameEntered = usernameRef.current.value;
    const fullnameEntered = fullnameRef.current.value;
    const phoneEntered = +phoneNumberRef.current.value;

    const emailRegex = /@gmail\.com$/;
    const isvalidEmail = emailRegex.test(emailEntered);
    if (!isvalidEmail) {
      alert("email khong hop le");
      return;
    }
    if (
      !emailEntered ||
      !passwordEntered ||
      !comfirmPasswordEntered ||
      !usernameEntered ||
      !fullnameEntered
    ) {
      alert("nhap day du du lieu");
      return;
    } else if (!phoneEntered) {
      alert("phai la chu so");
      return;
    } else if (passwordEntered.length < 6) {
      alert("mat khau it nhat phai co 6 ki tu");
      return;
    } else if (passwordEntered !== comfirmPasswordEntered) {
      alert("mat khau vaf xac nhan mat khau khong khop");
      return;
    }
    await searchResults(
      {
        email: emailEntered,
        password: passwordEntered,
        username: usernameEntered,
        fullname: fullnameEntered,
        phone: phoneEntered,
      },
      "/register",
      null
    );
    navigate("/login");
  };
  return (
    <div>
      <div className="w-50 m-auto shadow-lg p-5 mt-5">
        <h2 className="text-center mb-5">Register</h2>
        <form className="row gap-2">
          <div className="d-flex align-items-center">
            <label className="col-3">username</label>
            <input
              type="text"
              className="form-control"
              placeholder="ten dang nhap"
              ref={usernameRef}
              required
            />
          </div>
          <div className="d-flex align-items-center">
            <label className="col-3">fullname</label>
            <input
              type="text"
              className="form-control"
              placeholder="ho va ten"
              ref={fullnameRef}
              required
            />
          </div>
          <div className="d-flex align-items-center">
            <label className="col-3">phoneNumber</label>
            <input
              type="tel"
              className="form-control"
              placeholder="phone"
              ref={phoneNumberRef}
              required
            />
          </div>
          <div className="d-flex align-items-center">
            <label className="col-3">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="email"
              ref={emailRef}
              required
            />
          </div>

          <div className="d-flex align-items-center">
            <label className="col-3">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              ref={passwordRef}
              required
            />
          </div>
          <div className="d-flex align-items-center">
            <label className="col-3">Comfirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Comfirm Password"
              ref={comfirmPasswordRef}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary mt-4 "
            onClick={createAccountUser}
          >
            Register
          </button>
          <Link to="/login" className="d-flex justify-content-center">
            Creat account.Register
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
