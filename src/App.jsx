import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";

// Pages imports
import { Register } from "./Pages/Register";
import LogIn from "./Pages/LogIn";
import NavBar from "./Components/Navbar";
import Listing from "./Pages/Listing";
import { Home } from "./Pages/Home";

function App() {
  return (
    <>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/book/list" element={<Listing />} />
          <Route />
        </Routes>
      </div>
    </>
  );
}

export default App;
