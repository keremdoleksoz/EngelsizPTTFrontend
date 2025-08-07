import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import pttlogo from "../components/pttlogo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      toast.success("Giriş başarılı!");
      navigate("/form");
    } catch (error) {
      toast.error("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <div className="login-page">
      {/* 🔔 Toast bildirimi */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover
        closeOnClick
        draggable
        theme="light"
      />

      <div className="login-card">
        <div className="login-header">
          <img src={pttlogo} alt="PTT Logo" />
          <h2>PTT Erişilebilirlik Formu Giriş Paneli</h2>
        </div>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Kullanıcı Adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Giriş</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
