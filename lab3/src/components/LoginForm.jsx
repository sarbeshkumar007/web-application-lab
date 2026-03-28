import { useState } from "react";
import CustomInput from "./CustomInput";

function LoginForm({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please fill in all fields!");
      return;
    }
    alert(`Logged in as: ${email}`);
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <CustomInput label="Email" type="email" value={email}
        onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
      <CustomInput label="Password" type="password" value={password}
        onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
      <button onClick={handleLogin} style={btnStyle}>Login</button>
      <p style={{ textAlign: "center" }}>
        No account? <span onClick={onSwitch} style={linkStyle}>Register</span>
      </p>
    </div>
  );
}

const btnStyle = {
  width: "100%", padding: "10px", backgroundColor: "#4f46e5",
  color: "white", border: "none", borderRadius: "6px",
  fontSize: "16px", cursor: "pointer", marginBottom: "10px"
};

const linkStyle = { color: "#4f46e5", cursor: "pointer", textDecoration: "underline" };

export default LoginForm;