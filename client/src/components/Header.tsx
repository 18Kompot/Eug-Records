import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AppContext } from "../App";
import Logout from "../auth/Logout";
import User from "./User";
import { verifyToken } from "../services/storage";

function Header() {
  const context = useContext(AppContext);
  const isLoggedIn = verifyToken(); //context && context.userName.length > 0;

  const [numCartItems, setNumCartItems] = useState<number>(0);

  useEffect(() => {
    setNumCartItems(context?.cartRecords?.length ?? 0);
  }, [context?.cartRecords]);

  return (
    <header>
      <nav className="container-fluid navbar bg-dark navbar-expand-lg bg-body-tertiary">
        <div className="col text-center">
          <NavLink className="p-2 navbar-brand text-warning" to="/home">
            <img
              className=""
              src="/images/eugrec.png"
              alt="logo"
              height="96px"
            />
          </NavLink>
        </div>
        <div className="container">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <NavLink className="nav-link text-white" to="/home">
              Home
            </NavLink>
            <NavLink className="nav-link text-white" to="/about">
              About
            </NavLink>
            {isLoggedIn && (
              <NavLink className="nav-link text-white" to="/collection">
                Collection
              </NavLink>
            )}
            <NavLink className="nav-link text-white" to="/equipment">
              Equipment
            </NavLink>
            <NavLink className="nav-link text-white" to="/contact">
              Contact me
            </NavLink>
          </ul>
        </div>
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
                {numCartItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {numCartItems}
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
                  <NavLink className="nav-item" to="/favorites">
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
      </nav>
    </header>
  );
}

export default Header;
