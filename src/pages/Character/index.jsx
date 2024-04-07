import { useState, useEffect } from "react";
import axios from "axios";
import "./character.css";
import { Link, useParams } from "react-router-dom";

const Character = ({ favoriteCharacters, setFavoriteCharacters }) => {
  const { id } = useParams();
  const [dataCharacter, setDataCharacter] = useState({});
  const [dataComicsCharacter, setDataComicsCharacter] = useState({});
  const [isLoadingCharacter, setIsLoadingCharacter] = useState(true);
  const [isLoadingComicsCharacter, setIsLoadingComicsCharacter] =
    useState(true);

  useEffect(() => {
    const requestAxiosCharacter = async () => {
      try {
        const responseCharacter = await axios.get(
          `http://localhost:3000/characters/${id}`
        );
        setDataCharacter(responseCharacter.data);
        setIsLoadingCharacter(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    const requestAxiosComicsCharacter = async () => {
      try {
        const responseComics = await axios.get(
          `${import.meta.env.VITE_CHARACTER_LINK}`
        );
        setDataComicsCharacter(responseComics.data.comics);
        setIsLoadingComicsCharacter(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    requestAxiosCharacter();
    requestAxiosComicsCharacter();
  }, [id]);
  return (
    <main className="main-character">
      <div className="container">
        {isLoadingCharacter ? (
          <h1>Chargement...</h1>
        ) : (
          <div className="main-character__informations-character">
            <h2>{dataCharacter.name}</h2>
            <div className="main-character__character__img">
              <img
                src={`${dataCharacter.thumbnail.path}/portrait_fantastic.${dataCharacter.thumbnail.extension}`}
                alt={dataCharacter.name}
              />
            </div>
            <p>{dataCharacter.description} </p>
          </div>
        )}
        {isLoadingComicsCharacter ? (
          <h1>Chargement...</h1>
        ) : (
          <div className="main-character__informations-comics">
            {dataComicsCharacter.map((comic) => {
              return (
                <Link to={`/comics/${comic._id}`} key={comic._id}>
                  <div className="main-character__comics__comic">
                    <h3>{comic.title} </h3>
                    <div className="main-character__comic__img">
                      <img
                        src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
                        alt={comic.title}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default Character;
