import { useEffect, useState } from "react";
import MovieList from "../../MovieList/MovieList";
import { fetchMovies } from "../../../service/moviedb-api";
import s from "./HomePage.module.css"

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetchMovies("/trending/movie/day")
      .then((response) => {
        setMovies(response.results);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally();
  }, []);
  return (
    <div className={s.container}>
     <h2 className={s.title}> Trending today</h2>
      <MovieList movies={movies} />
    </div>
  );
};
export default HomePage;
