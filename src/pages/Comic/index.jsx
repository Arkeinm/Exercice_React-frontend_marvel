import { useState, useEffect } from "react";
import axios from "axios";
import "./comic.css";
import { useParams } from "react-router-dom";

const Comic = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const requestAxios = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_COMIC_LINK}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    requestAxios();
  }, [id]);
  return (
    <main className="main-comic">
      <div className="container">
        {isLoading ? (
          <h1>Chargement...</h1>
        ) : (
            <div>
              {console.log(data)}
            <div className="main__comic">
              <h2>{data.title}</h2>
              <div className="main-comic__img">
                <img
                  src={`${data.thumbnail.path}/portrait_uncanny.${data.thumbnail.extension}`}
                  alt=""
                />
                </div>
                <p>{data.description} </p>
            </div>
            <div> </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Comic;
