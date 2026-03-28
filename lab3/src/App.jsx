import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div style={{
      minHeight: "100vh", backgroundColor: "#f3f4f6",
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        backgroundColor: "white", padding: "40px",
        borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        width: "100%", maxWidth: "400px"
      }}>
        {isLogin
          ? <LoginForm onSwitch={() => setIsLogin(false)} />
          : <RegisterForm onSwitch={() => setIsLogin(true)} />
        }
      </div>
    </div>
  );
}

export default App;