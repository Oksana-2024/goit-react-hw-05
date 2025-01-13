import { useEffect, useState } from "react";
import { fetchMovies } from "../../service/moviedb-api";
import { useParams } from "react-router-dom";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    fetchMovies(`/movie/${movieId}/reviews`)
      .then((response) => {
        setReviews(response.results);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally();
  }, []);

  return (
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
  );
};
export default MovieReviews;
