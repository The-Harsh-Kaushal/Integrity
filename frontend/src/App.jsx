import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import "./index.css";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Authentication from "../components/Authentication";
import Inputfield from "../components/Inputfield";

function App() {
  return (
    <>
      <Navbar />
      <Authentication />
      {/* <Inputfield/> */}
      {/*    
     <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/SignUp"  element={<Signup/>}/>
      <Route path="/"  element={<Home/>}/>
     </Routes> */}
    </>
  );
}

export default App;
