import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../App";
import Logout from "../auth/Logout";
import User from "./User";

function Header() {
  const context = useContext(AppContext);
  const isLoggedIn = context && context.userName.length > 0;

  return (
    <header>
      <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary ">
        <div className="container-fluid">
          <NavLink className="navbar-brand text-warning" to="/#">
            {/* <img
              className="m-1"
              src="https://pixabay.com/get/g726c14b7c90c0fd7dc8b0021c09fdaf113268ea535d56abc68bff712e430694380423c34ef69356b7e5fdbb9680b5b1ce5b0a9c41b3296af5007896763538128_1280.png"
              alt="record"
              height="30px"
            /> */}
            Eug Records
          </NavLink>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <NavLink
              className="nav-link text-white"
              aria-current="page"
              to="/about"
            >
              About
            </NavLink>
            {isLoggedIn && (
              <NavLink className="nav-link text-white col-3" to="/collection">
                Collection
              </NavLink>
            )}
          </ul>
          {!isLoggedIn && (
            <>
              <span className="d-flex nav-item text-warning me-1">
                <NavLink className="nav-link" aria-current="page" to="/login">
                  Login
                </NavLink>
              </span>
              <span className="d-flex nav-item text-white me-1">or</span>
              <span className="d-flex nav-item text-warning">
                <NavLink className="nav-link" aria-current="page" to="/signup">
                  Create an account
                </NavLink>
              </span>
            </>
          )}
          {isLoggedIn && (
            <>
              <div className="dropdown d-flex me-3">
                <button className="btn btn-light bi bi-cart3 me-2"></button>
                <button
                  className="btn btn-info dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <User />
                </button>

                <ul className="dropdown-menu" style={{ margin: 0 }}>
                  <li>
                    <NavLink className="dropdown-item" to="/about">
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/about">
                      Favorites
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <Logout />
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
