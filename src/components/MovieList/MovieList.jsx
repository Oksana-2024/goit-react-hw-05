import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";

const MovieList = ({movies}) => {
  const location = useLocation()
  
  
    return (
        <ul className={s.listTrend}>
        {movies.map(({ id, title }) => {
          return (
            <li key={id}>
              <Link to={`/movies/${id}`} state={location} className={s.item}>{title}</Link>
            </li>
          );
        })}
      </ul>
    )
}
export default MovieList