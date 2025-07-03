import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

export const FullScreenLoader = ({ loading = false }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[var(--surface-0)] to-[var(--surface-2)] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-6 loader-fade">
        <div className="p-6 bg-[var(--surface-1)] rounded-full shadow-2xl border-4 border-[var(--primary)] pulse-glow">
          <ClipLoader size={55} color="var(--primary)" />
        </div>

        <h1 className="text-[var(--primary)] text-2xl font-bold tracking-wider font-mono hive-glow">
          Hive is buzzing...
        </h1>
      </div>
    </div>
  );
};
