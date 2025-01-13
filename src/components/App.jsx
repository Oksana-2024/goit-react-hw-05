import { Route, Routes } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import MovieCast from "./MovieCast/MovieCast";
import MovieReviews from "./MovieReviews/MovieReviews";
import { lazy, Suspense } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";

const pages = {
  Home: lazy(() => import("./pages/HomePage/HomePage")),
  Movies: lazy(() => import("./pages/MoviesPage/MoviesPage")),
  MovieDetails: lazy(() => import("./pages/MovieDetailsPage/MovieDetailsPage")),
  NotFound: lazy(() => import("./pages/NotFoundPage/NotFoundPage")),
};

function App() {
  return (
    <>
      <Navigation />
      <Suspense>
        <Routes>
          <Route path="/" element={<pages.Home />} />
          <Route path="/Movies" element={<pages.Movies />} />
          <Route path="/movies/:movieId" element={<pages.MovieDetails />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<pages.NotFound />} />
        </Routes>
      </Suspense>
      <ToastContainer />
    </>
  );
}

export default App;
