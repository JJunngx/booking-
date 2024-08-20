import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext, saveToStorage } from "../context/AuthContext";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await axios.post(
        "http://localhost:5000/admin/login",
        { data },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(res.data);
      saveToStorage("login", res.data);
      login();
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error) {
        alert(error.response.data.message);
      }
    }
  };
  return (
    <div className="d-flex  justify-content-center mt-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="shadow  w-50 rounded p-5  "
      >
        <h1>Login</h1>
        <label>email</label>
        <input
          type="email"
          className="form-control"
          name="email"
          placeholder="Email"
          {...register("email", {
            required: true,
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@gmail\.com$/,
              message: "Email must be a valid Gmail address",
            },
          })}
        />
        {errors.email && <p className="text-danger">{errors.email.message}</p>}
        <label className="mt-3">Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="password"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password && (
          <p className="text-danger">mat khau co it nhat 6 ki tu</p>
        )}
        <div className="text-center mt-3">
          <button type="submit" className="btn btn-primary w-25">
            login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
