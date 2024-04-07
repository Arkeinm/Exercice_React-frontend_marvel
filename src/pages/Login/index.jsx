import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = ({ setCookieToken }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setErrorMessage("");
      if (!email || !password) {
        setErrorMessage("Email and password are needed !");
        return;
      }
      const response = await axios.post(`${import.meta.env.VITE_LOGIN_LINK}`, {
        email,
        password,
      });
      Cookies.set("token-marvel", response.data.token, { expires: 15 });
      setCookieToken(response.data.token);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <main className="main-login">
      <div className="container">
        <h2>Se connecter</h2>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={email}
            name="email"
            type="email"
            placeholder="Adresse email"
          />
          <input
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
            name="password"
            type="password"
            placeholder="Mot de passe"
          />
          <input className="submit" type="submit" value={"Se connecter"} />
        </form>
        {errorMessage !== "" && <p>{errorMessage} </p>}
        <a href="/signup">Tu as déjà un compte ? Connecte toi !</a>
      </div>
    </main>
  );
};

export default Login;
