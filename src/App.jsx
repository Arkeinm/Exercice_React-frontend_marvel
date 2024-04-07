import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
// import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Character from "./pages/Character";
import Comic from "./pages/Comic";
import NotFound from "./pages/NotFound";
import Cookies from "js-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHeart,
  faMagnifyingGlass,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
library.add(faHeart, faMagnifyingGlass, faAngleLeft, faAngleRight);

const App = () => {
  const cookieAccount = Cookies.get("token-marvel");
  const [cookieToken, setCookieToken] = useState(cookieAccount || null);
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const [favoriteComics, setFavoriteComics] = useState([]);

  return (
    <Router>
      <Header cookieToken={cookieToken} setCookieToken={setCookieToken} />
      <Routes>
        <Route path="/" element={<Home cookieToken={cookieToken} />} />
        <Route
          path="/signup"
          element={<SignUp setCookieToken={setCookieToken} />}
        />
        <Route
          path="/login"
          element={<Login setCookieToken={setCookieToken} />}
        />
        <Route
          path="/characters"
          element={
            <Characters
              cookieToken={cookieToken}
              favoriteCharacters={favoriteCharacters}
              setFavoriteCharacters={setFavoriteCharacters}
            />
          }
        />
        <Route
          path="/comics"
          element={
            <Comics
              cookieToken={cookieToken}
              favoriteComics={favoriteComics}
              setFavoriteComics={setFavoriteComics}
            />
          }
        />
        {cookieToken && (
          <Route
            path="/favorites"
            element={<Favorites cookieToken={cookieToken} />}
          />
        )}
        <Route path="/characters/:id" element={<Character />} />
        <Route path="/comics/:id" element={<Comic />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
