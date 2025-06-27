import React from "react";
import Inputfield from "./Inputfield";
import Button from "./Button";

const Authentication = ({ title = "Login", isLogin = true }) => {
  return (
    // main div
    <div className=" flex flex-col p-7 gap-8 border-2 w-[400px] border-amber-400 ">
      {/* upper section  */}
      <div className="flex flex-col pl-8">
        <h1 className=" font-serif text-primary ">{isLogin ? "Welcome Back!" : "Start your journey"}</h1>
        <p>{isLogin ? "please enter your deatils" : "Sign Up to HIVE"}</p>
      </div>
      {/* input area  */}
      <div className="realtive">
        <Inputfield label="E-mail" isEmail={true} />
        <Inputfield label="password" isEmail={false} />
      </div>
      {/* action area  */}
      <div>
        <Button label="Login" />
        <p>don't have an account</p>
        <span>Sign In</span>
      </div>
    </div>
  );
};

export default Authentication;
