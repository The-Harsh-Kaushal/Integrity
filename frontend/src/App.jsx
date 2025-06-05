import { useState } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import './index.css'
import Home from "../pages/Home";

function App() {
  return (
    <>
   
     <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/SignUp"  element={<Signup/>}/>
      <Route path="/"  element={<Home/>}/>
     </Routes>
     
    </>
  );
}

export default App;
