import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Authentication from "../components/Authentication";
import bg1 from "../components/utility/images/bg/bg1.png";
import "./style/AuthPage.css";


const AuthenticationPage = () => {
  const [flip, setflip] = useState(false);
  const [loginOsignup, setloginOsignup] = useState(false);

  const SwitchLS = () => {
    setflip((pr) => {
      return !pr;
    });
    setTimeout(() => {
      setloginOsignup((pr) => {
        return !pr;
      });
      setflip((pr) => {
        return !pr;
      });
    }, 1000);
  };
  return (
    <div className="flex flex-col h-[100vh] w-[100vw] overflow-hidden">
     <div><Navbar dsbLogout={true} /></div>
      <div className="flex items-center justify-center flex-1  ">
        <div
          style={{ perspective: 1000 }}
          className=" inline-block h-[512px] w-[340px]  "
        >
          <div
            className={`relative  h-full w-full transition-transform ease-in duration-700  ${
              flip ? "rotate-y-[180deg]" : ""
            } preserve-3d`}
          >
            <div className="absolute backface-hidden  ">
              <Authentication
                switchls={SwitchLS}
                isLogin={loginOsignup}
                gotUrl={loginOsignup ? "/auth/login" : "/auth/signup"}
              />
            </div>
            <div className="absolute backface-hidden h-full w-full rotate-y-[180deg] ">
              <img src={bg1} alt="img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
