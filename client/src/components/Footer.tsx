import { useContext } from "react";
import { Link } from "react-router-dom"; // import Link from react-router-dom
import { NavLink } from "react-router-dom"; // import NavLink from react-router

import { AppContext } from "../App";

function Footer() {
  const context = useContext(AppContext);
  const isLoggedIn = context && context.userName.length > 0;
  const year = new Date().getFullYear();

  return (
    <>
      <div className="container-fluid justify-content-between text-light bg-dark opacity-40 py-4">
        <div className="row">
          <div className="col text-center">
            <NavLink className="p-2 navbar-brand text-warning" to="/">
              <img
                className=""
                src="/images/eugrec.png"
                alt="record"
                height="150px"
              />
            </NavLink>
          </div>
          <div className="col text-center">
            <p>CONTACT INFORMATION</p>
            <div className="col justify-content-end">
              <Link to="/contact">
                <i className="mx-2 bi bi-envelope-at-fill fs-4 text-warning"></i>
              </Link>
              <Link target="_blank" to={"https://www.youtube.com/18Compton"}>
                <i className="mx-2 bi bi-youtube fs-4 text-warning"></i>
              </Link>
              <Link target="_blank" to={"https://www.discogs.com/user/Primo18"}>
                <i className="mx-2 bi bi-vinyl fs-4 text-warning"></i>
              </Link>
              <Link target="_blank" to={"https://www.linkedin.com/in/eugkro/"}>
                <i className="mx-2 bi bi-linkedin fs-4 text-warning"></i>
              </Link>
            </div>
          </div>
          <div className="col text-center">
            <p>SITE MAP</p>
            <NavLink className="nav-link" to={`/`}>
              Home
            </NavLink>
            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
            {isLoggedIn && (
              <NavLink className="nav-link" to="/collection">
                Collection
              </NavLink>
            )}
            <NavLink className="nav-link" to={`/equipment`}>
              Equipment
            </NavLink>
            <NavLink className="nav-link" to={`/contact`}>
              Contact
            </NavLink>
          </div>
        </div>
        <div className="container pt-2">
          <hr className="mt-3"></hr>
        </div>
        <div className="text-center">
          <span className="align-self-center">
            Created By Evgeny Kroitoru {year} &#169;
          </span>
        </div>
      </div>
    </>
  );
}

export default Footer;
