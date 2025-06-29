import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import AuthenticationPage from "../pages/AuthenticationPage";
import Authentication from "../components/Authentication";


function App() {
  return (
    <>
      {/* <AuthenticationPage/> */}
      <Authentication/>
     
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
