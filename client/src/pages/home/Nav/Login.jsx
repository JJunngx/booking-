import React, { useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { saveToStorage } from "./Storage";
const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const emailEnterd = emailRef.current.value;
    const passwordEntered = passwordRef.current.value;
    const emailRegex = /@gmail\.com$/;
    const isvalidEmail = emailRegex.test(emailEnterd);
    if (!isvalidEmail) {
      alert("eamil khong hop le");
      return;
    }
    if (!emailEnterd || !passwordEntered) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        {
          email: emailEnterd,
          password: passwordEntered,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      const user = {
        token: res.data.token,
        username: emailEnterd,
        userId: res.data.userId,
      };
      saveToStorage("token", user);
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response.data.message) {
        alert(error.response.data.message);
        return;
      }
    }
  };
  return (
    <div className="d-flex align-self-center ">
      <div className="w-50 m-auto shadow-lg p-5 mt-5 rounded">
        <h2 className="text-center mb-5">Đăng Nhập</h2>
        <form className="row gap-2 mb-4">
          <div className="d-flex align-items-center">
            <label className="col-3">email</label>
            <input
              type="email"
              className="form-control"
              placeholder="username"
              ref={emailRef}
              required
            />
          </div>
          <div className=" d-flex align-items-center ">
            <label htmlFor="password" className="col-3">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              ref={passwordRef}
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary mt-4  w-100"
              onClick={login}
            >
              Login
            </button>
          </div>
        </form>

        <Link to="/register" className="d-flex justify-content-center">
          Creat account.Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
