import { Field, Formik, Form } from "formik";
import { useEffect, useState } from "react";
import {
  fetchMovies,
  search as searchPath,
} from "../../service/moviedb-api";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import { toast } from "react-toastify";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("query") || "");

  const handleSubmit = (values) => {
    const inputSearch = values.input.trim();
    if (!inputSearch) {
      toast.error("Please enter data to search!");
      return;
    }
    setSearchParams({ query: inputSearch });
    setSearch(inputSearch);
  };

  useEffect(() => {
    if (!search.trim()) return;
    fetchMovies(searchPath, { query: search })
      .then((response) => {
        setMovies(response.results);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally();
  }, [search]);
  return (
    <div className={s.form}>
      <Formik initialValues={{ input: search }} onSubmit={handleSubmit}>
        <Form>
          <Field className={s.field} type="text" name="input" />
          <button className={s.button} type="submit">
            Search
          </button>
        </Form>
      </Formik>
      <MovieList movies={movies} />
    </div>
  );
};
export default MoviesPage;
