import React from "react";
import Admindash from "./Admindash";
import "./stylesheet.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Edit from "./Edit";
import Table from "./Table";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Admindash />}></Route>
          <Route path="/edit/:id" element={<Edit />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
