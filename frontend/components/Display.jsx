import React from "react";
import PropTypes from "prop-types";

const Display = ({ message }) => {
  return (
    <div className="w-[500px] h-[280px] bg-[#142823] rounded-2xl shadow-[0_4px_20px_rgba(37,188,124,0.2)] p-5 flex flex-col gap-4 text-[#25BC7C] font-sans">
      <div className="text-lg font-semibold border-b border-[#25bc7c33] pb-1">
        HIVE: File Hash
      </div>
      <div className="text-sm text-[#A0D8C2]">
        {message ? "The hash for the file is:" : "Upload a file to verify its hash integrity"}
      </div>
      <div className="flex-1 bg-[#1a372e] border border-dashed border-[#25bc7c44] rounded-xl p-3 font-mono text-sm text-[#defbe6] overflow-y-auto custom-scroll text-center">
        {message || "🔒 Your integrity matters. Let HIVE verify it."}
      </div>
    </div>
  );
};

Display.propTypes = {
  message: PropTypes.string,
};

export default Display;
