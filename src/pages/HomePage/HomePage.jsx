import { useEffect, useState } from "react";
import s from "./HomePage.module.css"
import MovieList from "../../components/MovieList/MovieList";
import { fetchMovies } from "../../service/moviedb-api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";


const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [messageError, setMessageError] = useState(false);
  useEffect(() => {
    fetchMovies("/trending/movie/day")
      .then((response) => {
        setMessageError(false)
        setMovies(response.results);
      })
      .catch((error) => {
        setMessageError(true)
        console.log(error);
      })
  }, [messageError]);
  
  return (
    <div className={s.container}>
     <h2 className={s.title}> Trending today</h2>
      <MovieList movies={movies} />
       <ErrorMessage messageError={messageError} />
    </div>
  );
};
export default HomePage;
