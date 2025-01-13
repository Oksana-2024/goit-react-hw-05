import axios from "axios";

export const API_KEY = "8770b58debb691d0e718d7b9db131187";
// JWT - Javascript Web Token
export const API_JWT =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzcwYjU4ZGViYjY5MWQwZTcxOGQ3YjlkYjEzMTE4NyIsIm5iZiI6MTczNjQ0MTc5NS4yNjMsInN1YiI6IjY3N2ZmZmMzNjAxYWNmZTdiZDRlOWYyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0psSbOjbE3w7G1qN-NwmiMvIe9JcTnLUR9949RBFgl8";
export const BASE_URL = "https://api.themoviedb.org/3";
export const search = "/search/movie";
export const headers = {
  Authorization: `Bearer ${API_JWT}`, //Bearer - type authorization
};

export const fetchMovies = async (url = search, { query } = {}) => {
  const { data } = await axios.get(url, {
    params: { query },
    baseURL: BASE_URL,
    headers: headers,
    
  });

  return data;
};

