import { useState, useEffect } from "react";
import axios from "axios";
import "./comics.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Search from "../../components/Search";

const Comics = ({ cookieToken, favoriteComics, setFavoriteComics }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchComics, setSearchComics] = useState("");

  useEffect(() => {
    const requestAxios = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_COMICS_LINK}`
        );
        setData(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    requestAxios();
  }, [searchComics]);
  return (
    <main className="main-comics">
      <div className="container">
        <Search
          search={searchComics}
          setSearch={setSearchComics}
          text="Research comics"
        />
        <div className="main-comics__all-comics">
          {isLoading ? (
            <h1>Chargement...</h1>
          ) : (
            <>
              {data.map((comic) => {
                const imgsrc = `${comic.thumbnail.path}/standard_xlarge.${comic.thumbnail.extension}`;
                const isFavorite = favoriteComics.find((element) => {
                  return element.id === comic._id;
                });
                const isFavoriteIndex = favoriteComics.findIndex((element) => {
                  return element.id === comic._id;
                });
                return (
                  <article key={comic._id} className="main-comics__comic">
                    {isFavorite ? (
                      <FontAwesomeIcon
                        onClick={() => {
                          const copy = [...favoriteComics];
                          copy.splice(isFavoriteIndex, 1);
                          setFavoriteComics(copy);
                        }}
                        className="heart-icon main-comics__heart-icon--done"
                        icon="heart"
                        size="sm"
                      />
                    ) : cookieToken ? (
                      <FontAwesomeIcon
                        onClick={() => {
                          const copy = [...favoriteComics];
                          copy.push({
                            id: comic._id,
                            name: comic.name,
                            img: `${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`,
                          });
                          setFavoriteComics(copy);
                        }}
                        className="heart-icon main-comics__heart-icon--none"
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
                        className="heart-icon main-comics__heart-icon--no-account"
                        icon="heart"
                        size="sm"
                      />
                    )}
                    <Link
                      className="main-comics__comic-link"
                      to={`/comics/${comic._id}`}
                    >
                      <h3>{comic.title}</h3>
                      <div className="main-comics__comics__img">
                        <img src={`${imgsrc}`} alt={comic.title} />
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

export default Comics;
