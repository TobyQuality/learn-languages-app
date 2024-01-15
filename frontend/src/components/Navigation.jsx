import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles.css";

const Navigation = () => {
  const [active, setActive] = useState(false);
  return (
    <div>
      <nav className="navbar">
        <div
          className="hamburger-menu"
          onClick={() => {
            setActive(!active);
            const menu = document.querySelector(".menu");
            if (active) {
              menu.className = "menu active";
            } else {
              menu.className = "menu";
            }
          }}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <ul className="menu">
          <li>
            <Link to="showwords">Home</Link>
          </li>
          <li>
            <Link to="word">Add vocabulary</Link>
          </li>
          <li>
            <Link to="play">Play</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
