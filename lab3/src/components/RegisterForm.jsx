import { useState } from "react";
import CustomInput from "./CustomInput";

function RegisterForm({ onSwitch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields!");
      return;
    }
    alert(`Registered successfully: ${name}`);
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Register</h2>
      <CustomInput label="Full Name" type="text" value={name}
        onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
      <CustomInput label="Email" type="email" value={email}
        onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
      <CustomInput label="Password" type="password" value={password}
        onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" />
      <button onClick={handleRegister} style={btnStyle}>Register</button>
      <p style={{ textAlign: "center" }}>
        Have an account? <span onClick={onSwitch} style={linkStyle}>Login</span>
      </p>
    </div>
  );
}

const btnStyle = {
  width: "100%", padding: "10px", backgroundColor: "#10b981",
  color: "white", border: "none", borderRadius: "6px",
  fontSize: "16px", cursor: "pointer", marginBottom: "10px"
};

const linkStyle = { color: "#10b981", cursor: "pointer", textDecoration: "underline" };

export default RegisterForm;