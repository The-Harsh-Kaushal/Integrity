import React from "react";
import "./CSS/auth.css";

const Authentication = ({
  title = "Login",
  buton = "Login",
  switchText = "",
  onSwitch = null,
  enableName = false,
  URL = null,
}) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [alert, setAlert] = React.useState({ type: "", message: "" });

  const handlesubmit = async (e) => {
    e.preventDefault();
    setAlert({ type: "", message: "" });
    try {
      const payload = enableName
        ? { name, email, password }
        : { email, password };
      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        setAlert({
          type: "error",
          message: data.message || "An error occurred.",
        });
      } else {
        setAlert({ type: "success", message: data.message || "Success!" });
      }
    } catch (error) {
      setAlert({ type: "error", message: "Network error. Please try again." });
    }
  };

  return (
    <div className="center">
      <h2 className="title">{title}</h2>
      {alert.message && (
        <div className={`auth-alert ${alert.type}`}>
          {alert.type === "success" ? "✅" : "❌"} {alert.message}
        </div>
      )}
      <form className="farm" onSubmit={handlesubmit}>
        <div className="mainform">
          {enableName && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
          )}
          <input
            type="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">{buton}</button>
      </form>
      {onSwitch && (
        <button className="switch-btn" type="button" onClick={onSwitch}>
          {switchText}
        </button>
      )}
    </div>
  );
};

export default Authentication;
