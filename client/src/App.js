import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import Search from "./pages/search/Search";
import Login from "./pages/home/Nav/Login";
import Register from "./pages/home/Nav/Register";
import Transaction from "./components/Transaction";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:id" element={<Detail />} />
        <Route path="/Transaction" element={<Transaction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
