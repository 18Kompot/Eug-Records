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
        <NavLink className="p-2 navbar-brand text-warning" to="/#">
          <img
            className="m-2"
            src="https://static.vecteezy.com/system/resources/previews/009/313/617/original/vinyl-record-vector-illustration-isolated-on-white-background-free-png.png"
            alt="record"
            height="30px"
          />
          Eug Records
        </NavLink>
        <div className="container">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <NavLink className="nav-link text-white" to="/about">
              About
            </NavLink>
            {isLoggedIn && (
              <NavLink className="nav-link text-white" to="/collection">
                Collection
              </NavLink>
            )}
            <NavLink className="nav-link text-white" to="/about">
              My equipment
            </NavLink>
            <NavLink className="nav-link text-white" to="/about">
              Contact me
            </NavLink>
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
                    <NavLink className="dropdown-item" to="/favorites">
                      <span className="btn">Favorites</span>
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
