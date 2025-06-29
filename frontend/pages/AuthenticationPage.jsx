import React from "react";
import Navbar from "../components/Navbar";
import Authentication from "../components/Authentication";

const AuthenticationPage = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Authentication isLogin={false} gotUrl="/auth/signup" />
        <Authentication isLogin={true} gotUrl="/auth/login" />
      </div>
    </div>
  );
};

export default AuthenticationPage;
