import React, { useState, useSyncExternalStore } from "react";
import { Mail, Eye, EyeOff, Icon, ToggleLeft } from "lucide-react";

const Inputfield = ({
  label = "E-mail",
  placeholder = "example@gmail.com",
  switchicon,
  types,
  onchangefn,
}) => {
  const toggleable = switchicon?.switch;
  const OpneIcon = toggleable ? switchicon.icon.open : switchicon.icon;
  const CloseIcon = toggleable ? switchicon.icon.close : null;
  const isArraytypes = Array.isArray(types);

  const [brColor, setbrColor] = useState("#94A3B8");
  const [nowtype, setnowtype] = useState(() =>
    isArraytypes ? types[0] : types
  );
  const [IconToApply, setIconToApply] = useState(OpneIcon);
  const [errorMsg, seterrorMsg] = useState("");

  const ValidateFields = (e) => {
    const type = isArraytypes ? types[0] : types;
    const fieldvalue = e.target.value;
    let disablebtn = true;
    if (type == "password") {
      if (fieldvalue.length < 8) {
        seterrorMsg("Must be atleast 8 charectors long");
        disablebtn = true;
      } else {
        seterrorMsg("");
        disablebtn = false;
      }
    } else if (type == "email") {
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(fieldvalue)) {
        seterrorMsg("Enter a valid Email");
        disablebtn = true;
      } else {
        seterrorMsg("");
        disablebtn = false;
      }
    } else if (type == "name") {
      if (fieldvalue.length < 1) {
        seterrorMsg("Field Shoudn't be empty");
        disablebtn = true;
      } else {
        seterrorMsg("");
        disablebtn = false;
      }
    }
    onchangefn(e, type,disablebtn);
  };

  const switchiconfn = () => {
    setIconToApply((ps) => {
      if (ps == OpneIcon) return CloseIcon;
      else return OpneIcon;
    });
  };
  const swtichtypefn = () => {
    setnowtype((ps) => {
      if (ps == types[0]) return types[1];
      return types[0];
    });
  };
  const switchingfn = () => {
    toggleable && switchiconfn();
    isArraytypes && swtichtypefn();
  };
  return (
    <div className="pt-2 ">
      <div
        className={`border-2 rounded-sm flex relative w-[275px] gap-2 p-2 text-center transition-color duration-300 ease-in-out shadow-xl`}
        onFocus={() => setbrColor("#F1F5F9")}
        onBlur={() => setbrColor("#94A3B8")}
        style={{ borderColor: brColor }}
      >
        <input
          type={nowtype}
          placeholder={placeholder}
          onChange={ValidateFields}
          className={`focus:outline-none focus:ring-0 placeholder:text-sm placeholder:text-[var(--text-muted)] border-r-2  w-[230px] transition-color duration-300 ease-in-out text-[var(--text)]`}
          style={{ borderColor: brColor }}
        />
        {
          <IconToApply
            className="transition-color duration-300 ease-in-out"
            style={{ color: brColor }}
            onClick={switchingfn}
          />
        }
        <label
          className={`absolute text-xs top-[-11px] left-4 bg-[var(--surface-3)]  transition-color duration-300 ease-in-out `}
          style={{ color: brColor }}
        >
          {label}
        </label>
        <p className="absolute text-[var(--text-muted2)] text-xs top-[42px] left-[13px]">
          {errorMsg}
        </p>
      </div>
    </div>
  );
};

export default Inputfield;
