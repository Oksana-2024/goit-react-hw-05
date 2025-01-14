import { useEffect, useState } from "react";
import { fetchMovies } from "../../service/moviedb-api";
import { useParams } from "react-router-dom";
import s from "./MovieCast.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";


const MovieCast = () => {
  const { movieId } = useParams();
  const [messageError, setMessageError] = useState(false);
  const [cast, setCast] = useState(null);
  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  useEffect(() => {
    fetchMovies(`/movie/${movieId}/credits`)
      .then((response) => {
        setMessageError(false);
        setCast(response.cast);
      })
      .catch((error) => {
        setMessageError(true);
        console.log(error);
      });
  }, [movieId, messageError]);

  return (
    <>
      <ul className={s.listCast}>
        {cast?.length > 0 &&
          cast.map(({ name, character, id, profile_path }) => {
            return (
              <li className={s.cardCast} key={id}>
                <img
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                      : defaultImg
                  }
                  alt={name}
                  width={120}
                />
                <div className={s.wrap}>
                  <h4>{name}</h4>
                  <div className={s.character}>
                    <h4>Character:</h4>
                    <p>{character || "N/A"}</p>
                  </div>
                </div>
              </li>
            );
          })}
        {cast && !cast.length && (
          <li>
            <p> We don&apos;t have any cast for this movie</p>
          </li>
        )}
      </ul>
       <ErrorMessage messageError={messageError} />
    </>
  );
};
export default MovieCast;
