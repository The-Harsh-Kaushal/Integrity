import React, { useState } from "react";
import Inputfield from "./utility/Inputfield";
import api from "../axiosreq";
import { Mail, Eye, EyeOff, CircleUserRound } from "lucide-react";
import AuthButton from "./utility/AuthButton";

const Authentication = ({ isLogin = false, gotUrl = "/auth/signup" }) => {
  const [form, setForm] = useState({});
  const [disableBtn, setdisableBtn] = useState(true);

  const FillFormData = (e, fieldtype, disablebtn) => {
    setForm({ ...form, [fieldtype]: e.target.value });
    setdisableBtn(disablebtn);
  };
  const sendData = async () => {
    const response = await api.post(gotUrl, form);
    sessionStorage.setItem("accessToken", response.data.session);
  };
  return (
    <div className="flex flex-col w-[340px]  bg-[var(--surface-2)] ">
      {/* Header Bar */}
      <div className=" py-5  bg-gradient-to-r  text-[var(--text)]   flex flex-col items-center">
        <h1 className="text-2xl font-bold font-serif  ">
          {isLogin ? "Welcome Back!" : "Create Your Hive Account"}
        </h1>
        <p className="text-xs mt-1 opacity-90 ">
          {isLogin
            ? "Please enter your credentials to continue"
            : "Join the swarm and explore"}
        </p>
      </div>

      {/* Input Section */}
      <div className="flex flex-col my-4 gap-5 py-6  h-[270px] shadow-2xl/30 bg-[var(--surface-3)]   rounded-xl items-center justify-center">
        {!isLogin && (
          <Inputfield
            label="Name"
            placeholder="full name"
            onchangefn={FillFormData}
            switchicon={{
              switch: false,
              icon: CircleUserRound,
            }}
            types="name"
          />
        )}
        <Inputfield
          label="Email"
          placeholder="example@gmail.com"
          onchangefn={FillFormData}
          switchicon={{
            switch: false,
            icon: Mail,
          }}
          types="email"
        />
        <Inputfield
          label="Password"
          placeholder="password"
          onchangefn={FillFormData}
          switchicon={{
            switch: true,
            icon: {
              open: Eye,
              close: EyeOff,
            },
          }}
          types={["password", "text"]}
        />
      </div>

      {/* Action Section */}
      <div
        onClick={sendData}
        className="flex flex-col items-center px-6 pb-6 pt-4 gap-3"
      >
        <AuthButton
          content={isLogin ? "Sign In" : "Register"}
          disablebtn={disableBtn}
        />
        <div className="flex items-center gap-1 text-sm text-[var(--text-muted)] mt-2">
          <span>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>
          <button className="text-sm text-[var(--primary)] hover:underline transition-all duration-200 shadow-xl/10">
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
