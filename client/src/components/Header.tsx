import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AppContext } from "../App";
import Logout from "../auth/Logout";
import User from "./User";

function Header() {
  const context = useContext(AppContext);
  const isLoggedIn = context && context.userName.length > 0;

  return (
    <header>
      <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary">
        <NavLink className="p-2 navbar-brand text-warning" to="/#">
          <img
            className=""
            src="https://images.squarespace-cdn.com/content/v1/518f36c0e4b062dc22411eae/1498528865052-FNAYYP1O31KOKZ7W8UYW/TRS-logo-recordplatter-one+colour+%281%29.png"
            alt="record"
            height="76px"
          />
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
              <div className="dropdown position-relative me-3">
                <Link
                  to={"/cart"}
                  className="btn btn-light bi bi-cart3 me-2 position-relative"
                >
                  {context?.cartRecords.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {context.cartRecords.length}
                      <span className="visually-hidden">Records in cart</span>
                    </span>
                  )}
                </Link>
                <button
                  className="btn btn-info dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <User />
                </button>

                <ul
                  className="dropdown-menu position-absolute top-100 start-0 w-100"
                  style={{ margin: 0 }}
                >
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
