import { Link } from "react-router-dom";
import "./home.css";

const Home = ({ cookieToken }) => {
  return (
    <main className="main-home">
      <div className="container">
        <Link to="/comics" className="categories-link">
          <div className="categories">
            <h1>Comics</h1>
            <div>
              <img src="/img/home-comics.jpg" alt="" />
            </div>
          </div>
        </Link>
        <Link to="/characters" className="categories-link">
          <div className="categories">
            <h1>Characters</h1>
            <div>
              <img src="/img/home-characters.jpg" alt="" />
            </div>
          </div>
        </Link>
        {cookieToken && (
          <Link to="/favorites" className="categories-link">
            <div className="categories">
              <h1>Favorites</h1>
              <div>
                <img src="/img/home-favorites-1.jpg" alt="" />
              </div>
            </div>
          </Link>
        )}
      </div>
    </main>
  );
};

export default Home;
