import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Login.css"

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (username === 'admin' && password === 'password') {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);

      onLogin(username);

      navigate("/Home");
    } else {
      alert("Введите логин и пароль");
    }
  };

  return (
    <div className="app">
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <h2>Вход в систему</h2>
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Войти</button>
      </form>
    </div>
    </div>
  );
}

export default Login;
