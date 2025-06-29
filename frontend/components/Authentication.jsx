import React from "react";
import Inputfield from "./Inputfield";
import Button from "./Button";
import { Mail, Eye, EyeOff, CircleUserRound } from "lucide-react";

const Authentication = ({  isLogin = true }) => {
  return (
    <div className="flex flex-col w-[400px]  bg-[var(--surface-2)] ">
      {/* Header Bar */}
      <div className="pl-3 py-5  bg-gradient-to-r  text-[var(--text)] shine-hover ">
        <h1 className="text-2xl font-bold font-serif">
          {isLogin ? "Welcome Back!" : "Create Your Hive Account"}
        </h1>
        <p className="text-sm mt-1 opacity-90 pl-6">
          {isLogin
            ? "Please enter your credentials to continue"
            : "Join the swarm and explore"}
        </p>
      </div>

      {/* Input Section */}
      <div className="flex flex-col gap-5 px-6 py-6 shadow-2xl/10 bg-[var(--surface-3)] border-2 border-[var(--border)] rounded-2xl w-[97%]">
        <Inputfield
          label="Name"
          placeholder="full name"
          switchicon={{
            switch: false,
            icon: CircleUserRound,
          }}
          types="text"
        />
        <Inputfield
          label="password"
          placeholder="password"
          switchicon={{
            switch: true,
            icon: {
              open: Eye,
              close: EyeOff,
            },
          }}
          types={["password", "text"]}
        />
        <Inputfield
          label="Email"
          placeholder="example@gmail.com"
          switchicon={{
            switch: false,
            icon: Mail,
          }}
          types="text"
        />
      </div>

      {/* Action Section */}
      <div className="flex flex-col items-center px-6 pb-6 pt-4 gap-3">
        <Button label={isLogin ? "Sign In" : "Register"} />

        <div className="flex items-center gap-1 text-sm text-[var(--text-muted)] mt-2">
          <span>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>
          <button className="text-sm text-[var(--primary)] hover:underline transition-all duration-200">
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
