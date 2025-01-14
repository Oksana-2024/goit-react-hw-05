import { useEffect, useState } from "react";
import s from "./HomePage.module.css"
import MovieList from "../../components/MovieList/MovieList";
import { fetchMovies } from "../../service/moviedb-api";

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
  }, []);
  
  return (
    <div className={s.container}>
     <h2 className={s.title}> Trending today</h2>
      <MovieList movies={movies} />
    </div>
  );
};
export default HomePage;
