import { useEffect, useState } from "react";
import { fetchMovies } from "../../service/moviedb-api";
import { useParams } from "react-router-dom";
import s from "./MovieReviews.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";


const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [messageError, setMessageError] = useState(false);

  useEffect(() => {
    fetchMovies(`/movie/${movieId}/reviews`)
      .then((response) => {
        setMessageError(false)
        setReviews(response.results);
      })
      .catch((error) => {
        setMessageError(true)
        console.log(error);
      })
  }, [movieId, messageError]);

  return (
   <>
      <ul className={s.list}>
        {reviews?.length > 0 && (
          reviews.map(({ author, id, content }) => {
            return (
              <li className={s.itemList} key={id}>
                <div className={s.authorBox}>
                  <h4 className={s.itemTitle}>Author:</h4>
                  <p className={s.authorName}>{author}</p>
                </div>
                <p className={s.text}>{content}</p>
              </li>
            );
          })
        )} { reviews && !reviews.length && (
          <li>
            <p>We don&apos;t have any reviews for this movie</p>
          </li>
        )}
      </ul>
       <ErrorMessage messageError={messageError} />
   </>
  );
};
export default MovieReviews;
