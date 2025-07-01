import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import AuthenticationPage from "../pages/AuthenticationPage";
import Home from "../pages/Home";
import "./index.css";

function App() {
  return (
    <>
     <Routes>
      <Route path="/authentication" element={<AuthenticationPage/>} />
      <Route path="/"  element={<Home/>}/>
     </Routes>
    </>
  );
}

export default App;
