import { useState, useEffect } from "react";
import axios from "axios";
import "./characters.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import Search from "../../components/Search";

const Characters = ({
  cookieToken,
  favoriteCharacters,
  setFavoriteCharacters,
}) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchCharacters, setSearchCharacters] = useState("");

  useEffect(() => {
    const requestAxios = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_CHARACTERS_LINK}?name=${searchCharacters}`
        );
        setData(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    requestAxios();
  }, [searchCharacters]);
  return (
    <main className="main-characters">
      <div className="container">
        <Search
          search={searchCharacters}
          setSearch={setSearchCharacters}
          text="Research characters"
        />
        <div className="main-characters__all-characters">
          {isLoading ? (
            <h1>Chargement...</h1>
          ) : (
            <>
              {data.map((character) => {
                const imgsrc = `${character.thumbnail.path}/standard_xlarge.${character.thumbnail.extension}`;
                const isFavorite = favoriteCharacters.find((element) => {
                  return element.id === character._id;
                });
                const isFavoriteIndex = favoriteCharacters.findIndex((element) => {
                  return element.id === character._id;
                });
                return (
                  <article
                    key={character._id}
                    className="main-characters__character"
                  >
                    {isFavorite ? (
                      <FontAwesomeIcon
                        onClick={() => {
                          const copy = [...favoriteCharacters];
                          copy.splice(isFavoriteIndex, 1);
                          Cookies.remove("token-favoriteCharacters");
                          Cookies.set("token-favoriteCharacters", copy, {
                            expires: 15,
                          });
                          setFavoriteCharacters(copy);
                        }}
                        className="heart-icon main-characters__heart-icon--done"
                        icon="heart"
                        size="sm"
                      />
                    ) : cookieToken ? (
                      <FontAwesomeIcon
                        onClick={() => {
                          const copy = [...favoriteCharacters];
                          copy.push({
                            id: character._id,
                            name: character.name,
                            img: `${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`,
                          });
                          Cookies.remove("token-favoriteCharacters");
                          Cookies.set("token-favoriteCharacters", copy, {
                            expires: 15,
                          });
                          setFavoriteCharacters(copy);
                        }}
                        className="heart-icon main-characters__heart-icon--none"
                        icon="heart"
                        size="sm"
                      />
                    ) : (
                      <FontAwesomeIcon
                        onClick={() => {
                          return alert(
                            "Connectez-vous pour utiliser cette fonctionnalité"
                          );
                        }}
                        className="heart-icon main-characters__heart-icon--no-account"
                        icon="heart"
                        size="sm"
                      />
                    )}
                    <Link
                      className="main-characters__character-link"
                      to={`/characters/${character._id}`}
                    >
                      <h3>{character.name}</h3>
                      <div className="main-characters__characters__img">
                        <img src={`${imgsrc}`} alt={character.name} />
                      </div>
                    </Link>
                  </article>
                );
              })}
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Characters;
