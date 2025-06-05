import React from "react";
import Authentication from "../components/Authentication";
import { useNavigate } from "react-router-dom";
import "./style/login.css";
import Navbar from "../components/Navbar";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="fullscr">
      <Navbar />
      <div className="main">
        <Authentication
          title="Login"
          buton="Login"
          switchText="Don't have an account? Sign Up"
          onSwitch={() => navigate("/signup")}
          URL="http://localhost:5000/api/auth/login"
        />
      </div>
    </div>
  );
};

export default Login;
