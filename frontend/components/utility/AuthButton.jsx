import React from "react";

const AuthButton = ({ content = "login", disablebtn = true, oncliclbtn }) => {
  return (
    <div className="inline-block rounded-[23px] border-2 border-[var(--primary)] shadow-md">
      <button
        disabled={disablebtn}
        onClick={oncliclbtn}
        className={`w-[150px] px-6 py-2 rounded-[20px] transition-all duration-200 text-[var(--text)]
          ${disablebtn
            ? "bg-gray-300 cursor-not-allowed opacity-60"
            : "bg-[var(--primary)] cursor-pointer button-hover active:scale-95 active:bg-[var(--primary-hover)]"}
        `}
      >
        {content}
      </button>
    </div>
  );
};

export default AuthButton;
