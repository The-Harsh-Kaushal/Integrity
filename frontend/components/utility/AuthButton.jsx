import React from "react";

const AuthButton = ({ content = "login", disablebtn = true, oncliclbtn }) => {
  return (
    <div className="flex border-2 border-[var(--primary)] rounded-[23px] shadow-2xl/20">
      <button
        disabled={disablebtn}
        // onClick={oncliclbtn}
        className="w-[150px] bg-[var(--primary)] px-6 py-2 rounded-[20px] button-hover active:scale-95 active:bg-[var(--primary-hover)] text-[var(--text)]"
      >
        {content}
      </button>
    </div>
  );
};

export default AuthButton;
