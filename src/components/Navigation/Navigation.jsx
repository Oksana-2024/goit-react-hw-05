import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

const Navigation = () => {
  const linkActive = ({ isActive }) => (isActive ? s.active : s.link);
  return (
    <nav className={s.nav} >
      <ul className={s.list}>
        <li>
          <NavLink to="/" className={linkActive}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/movies" className={linkActive}>Movies</NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navigation;
