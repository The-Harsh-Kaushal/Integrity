import React, { useState } from "react";
import Inputfield from "./utility/Inputfield";
import api from "../axiosreq";
import { Mail, Eye, EyeOff, CircleUserRound } from "lucide-react";
import AuthButton from "./utility/AuthButton";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Authentication = ({
  isLogin = false,
  gotUrl = "/auth/signup",
  switchls,
  loaderstate
}) => {
  const [form, setForm] = useState({});
  const [disableBtn, setdisableBtn] = useState(true);
  const navigate = useNavigate();

  const FillFormData = (e, fieldtype, disablebtn) => {
    setForm({ ...form, [fieldtype]: e.target.value });
    setdisableBtn(disablebtn);
  };
  const sendData = async () => {
    try {
      loaderstate(true);
      const response = await api.post(gotUrl, form);
      loaderstate(false);
      console.log(response);
      sessionStorage.setItem("accessToken", response.data.session);
      navigate("/");
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: err.response?.status || "401 Unauthorized",
        text: err.response?.data?.error || "Request Failed",
        confirmButtonColor: "#25BC7C",
      });
    }
  };
  return (
   <div className="flex flex-col w-[340px] h-[520px] bg-[var(--surface-2)] rounded-2xl border border-[var(--surface-1)] shadow-lg shadow-[rgba(0,0,0,0.3)] overflow-hidden animate-fade-in">

  {/* Header Bar */}
  <div className="py-5 px-4 bg-gradient-to-r from-[var(--surface-0)] to-[var(--surface-1)] text-[var(--text)] h-[90px] flex flex-col items-center border-b border-[var(--surface-1)]">
    <h1 className="text-2xl font-bold font-serif tracking-tight">
      {isLogin ? "Welcome Back to Hive!" : "Join the Hive"}
    </h1>
    <p className="text-xs mt-1 text-[var(--text-muted)] text-center max-w-[260px]">
      {isLogin
        ? "Enter your credentials to reconnect with the swarm."
        : "Secure your data, verify your files, and own your chain."}
    </p>
  </div>

  {/* Input Section */}
  <div className="flex flex-col my-4 gap-5 py-6 mx-3 h-[270px] bg-[var(--surface-3)] border border-[var(--surface-1)] shadow-inner rounded-xl items-center justify-center px-4">
    {!isLogin && (
      <Inputfield
        label="Name"
        placeholder="Full Name"
        onchangefn={FillFormData}
        switchicon={{ switch: false, icon: CircleUserRound }}
        types="name"
      />
    )}
    <Inputfield
      label="Email"
      placeholder="you@example.com"
      onchangefn={FillFormData}
      switchicon={{ switch: false, icon: Mail }}
      types="email"
    />
    <Inputfield
      label="Password"
      placeholder="••••••••"
      onchangefn={FillFormData}
      switchicon={{ switch: true, icon: { open: Eye, close: EyeOff } }}
      types={["password", "text"]}
    />
  </div>

  {/* Action Section */}
  <div className="flex flex-col h-[122px] items-center px-6 pb-6 pt-4 gap-3 border-t border-[var(--surface-1)] bg-[var(--surface-2)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
    <AuthButton
      content={isLogin ? "Sign In" : "Register"}
      disablebtn={disableBtn}
      oncliclbtn={sendData}
    />
    <div className="flex items-center gap-1 text-sm text-[var(--text-muted)] mt-2">
      <span>
        {isLogin ? "Not part of Hive yet?" : "Already have an account?"}
      </span>
      <button
        onClick={switchls}
        className="text-sm text-[var(--primary)] hover:underline transition-all duration-200 shadow-sm"
      >
        {isLogin ? "Create one" : "Sign In"}
      </button>
    </div>
  </div>
</div>

  );
};

export default Authentication;
