import "./header.css";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Header = ({ cookieToken, setCookieToken }) => {
  return (
    <header>
      <div className="container">
        <div className="header__img-and-navigation">
          <Link to="/">
            <div className="img-container">
              <img
                className="header-logo"
                src="/img/marvel-logo.png"
                alt="logo vinted"
              />
            </div>
          </Link>
          <nav>
            <a href="/characters">Characters</a>
            <a href="/comics">Comics</a>
            {cookieToken && <a href="/favorites">Favorites</a>}
          </nav>
        </div>
        {cookieToken ? (
          <Link to="/">
            <button
              onClick={() => {
                Cookies.remove("token-marvel");
                setCookieToken(null);
              }}
              className="header-button connexion-button"
            >
              Déconnexion
            </button>
          </Link>
        ) : (
          <div className="header__connexion">
            <Link to="/signup">
              <button className="header-button connexion-button">
                SignUp
              </button>
            </Link>
            <Link to="/login">
              <button className="header-button connexion-button">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
