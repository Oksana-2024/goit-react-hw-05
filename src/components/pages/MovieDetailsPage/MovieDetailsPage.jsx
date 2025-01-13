import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { fetchMovies } from "../../../service/moviedb-api";
import { useEffect, useRef, useState } from "react";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const linkActive = ({ isActive }) => (isActive ? s.active : s.linkItem);
  const { movieId } = useParams();
  const [details, setDetails] = useState();
  const location = useLocation();
  const pathBackRef = useRef(location.state);
  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";
  useEffect(() => {
    fetchMovies(`/movie/${movieId}`)
      .then((response) => {
        setDetails(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally();
  }, []);

  return (
    <div className={s.box}>
      <Link to={pathBackRef.current} className={s.back}>
        Go back
      </Link>
      {details && (
        <div className={s.detailsBox}>
          <img
            src={
              details.poster_path
                ? `https://image.tmdb.org/t/p/w500/${details.poster_path}`
                : defaultImg
            }
            alt="Poster for the movie"
            width={300}
            height={440}
          />

          <div className={s.descr}>
            <h2 className={s.title}>
              {details.title}{" "}({new Date(details.release_date).getFullYear()})
            </h2>
            <h3 className={s.subtitle}>Overview</h3>
            <p className={s.text}>{details.overview}</p>
            <h4 className={s.genres}>Genres</h4>
            <p className={s.genresText}>
              {details.genres.map(({ name }) => name).join(", ")}
            </p>
          </div>
        </div>
      )}
      
      <ul className={s.list}>
        <li className={s.linkText}>
          <NavLink className={linkActive} to="cast">Cast</NavLink>
        </li>
        <li className={s.linkText}>
          <NavLink className={linkActive} to="reviews">Reviews</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};
export default MovieDetailsPage;
