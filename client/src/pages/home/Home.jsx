import React from "react";
import NavBar from "./Nav/NavBar";
import HomePage from "./Nav/HomePage";
import City from "./city/City";
import Form from "./form/Form";
import Footer from "./footer/Footer";

const Home = () => {
  return (
    <div className="position-relative">
      <NavBar />
      <HomePage />
      <City />

      <Form />
      <Footer />
    </div>
  );
};

export default Home;
