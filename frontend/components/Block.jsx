import React from "react";

const Block = ({
  index = 0,
  filename = "Unknown file",
  timestamp = "-",
  lastVerified = "-",
  chained = true,
}) => {
  // Utility: shorten long text for display
  const truncate = (str, max = 28) =>
    str.length > max ? `${str.slice(0, max)}…` : str;

  return (
    <div className="relative my-8">
      {/* connector line to previous block */}
      <div className="absolute left-1/2 -top-8 w-0.5 h-8 bg-slate-300 transform -translate-x-1/2" />

      <div className="bg-slate-800 border-2 border-indigo-500 rounded-xl p-6 min-w-[320px] max-w-[360px] mx-auto flex flex-col items-center text-slate-100 font-mono shadow-lg transition-transform duration-200 hover:scale-[1.02]">
        {/* header */}
        <div className="w-full mb-4 flex flex-col items-start gap-1">
          <span className="text-indigo-300 font-bold text-base">
            🧱 Block #{index}
          </span>
          <span className="text-slate-400 text-sm break-all">
            {truncate(filename)}
          </span>
        </div>

        {/* info */}
        <div className="w-full text-sm text-slate-300 flex flex-col gap-1">
          <div>
            <strong>Timestamp:</strong>{" "}
            <code className="text-yellow-400 text-xs">
              {new Date(timestamp).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </code>
          </div>
          <div>
            <strong>Last&nbsp;Verified:</strong>{" "}
            <code className="text-yellow-400 text-xs">
              {new Date(lastVerified).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </code>
          </div>
          <div>
            <strong>Integrity:</strong>{" "}
            {chained ? (
              <span className="text-emerald-400">✅&nbsp;Chained</span>
            ) : (
              <span className="text-rose-400">❌&nbsp;Broken</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Block;
