import React, { useState } from "react";
import { Mail, Eye, EyeOff } from "lucide-react";

const Inputfield = ({ isEmail = true, label = "E-mail" }) => {
  const [brColor, setbrColor] = useState("#D1D1D1");
  const [eyeOpen, setEyeOpen] = useState(true);

  return (
    <div className="pt-2 ">
      <div
        className={`border-2  flex relative w-[275px] gap-2 p-2 text-center transition-color duration-300 ease-in-out`}
        style={{borderColor : brColor}}
      >
        <input
          id="thisinput"
          type={eyeOpen ? "email" : "password"}
          placeholder={isEmail ? "example@gmail.com" : "password"}
          onFocus={()=>setbrColor("#22D3EE")}
          onBlur={()=>setbrColor("#D1D1D1")}
          className={`focus:outline-none focus:ring-0 placeholder:text-sm border-r-2  w-[230px] transition-color duration-300 ease-in-out`}
          style={{borderColor:brColor}}
        />
        {isEmail ? (
          <Mail color={brColor} className="transition-color duration-300 ease-in-out" />
        ) : eyeOpen ? (
          <EyeOff onClick={() => setEyeOpen(false)} className="transition-color duration-300 ease-in-out" color={brColor} />
        ) : (
          <Eye onClick={() => setEyeOpen(true)} className="transition-color duration-300 ease-in-out" color={brColor} />
        )}

        <label
          htmlFor="thisinput"
          className={`absolute text-xs top-[-11px] left-4 bg-white w-[50px] transition-color duration-300 ease-in-out `}
          style={{color: brColor}}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default Inputfield;
