import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./signup.css";

const SignUp = ({ setCookieToken }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      if (!username || !password || !email) {
        setErrorMessage("Username, email and password are needed !");
        return;
      }
      const response = await axios.post(`${import.meta.env.VITE_SIGNUP_LINK}`, {
        email,
        username,
        password,
      });
      Cookies.set("token-marvel", response.data.token, { expires: 15 });
      setCookieToken(response.data.token);
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <main className="main-signup">
      <div className="container">
        <h2>S'inscrire</h2>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            name="username"
            value={username}
            type="text"
            placeholder="Nom d'utilisateur"
          />
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
          <input className="submit" type="submit" value={"S'inscrire"} />
        </form>
        {errorMessage !== "" && <p>{errorMessage} </p>}
        <a href="/login">Already an account ? Login here !</a>
      </div>
    </main>
  );
};

export default SignUp;
