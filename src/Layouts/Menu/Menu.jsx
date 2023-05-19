import "./Menu.css";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <div>
      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/user">User</Link>
      </nav>
    </div>
  );
}

export default Menu;
