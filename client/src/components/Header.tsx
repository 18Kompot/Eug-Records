import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AppContext } from "../App";
import Logout from "../auth/Logout";
import User from "./User";
import { verifyToken } from "../services/storage";
import { Dropdown } from "react-bootstrap";

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
        <div className="container d-flex justify-content-between align-items-center">
          <div className="col">
            <NavLink className="p-2 navbar-brand text-warning" to="/">
              <img
                className=""
                src="/images/eugrec.png"
                alt="logo"
                height="100px"
              />
            </NavLink>
          </div>
          <div className="col d-flex align-items-center">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/about">
                  About
                </NavLink>
              </li>
              {isLoggedIn && (
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/collection">
                    Collection
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/equipment">
                  Equipment
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/contact">
                  Contact me
                </NavLink>
              </li>
            </ul>
            <div className="ms-auto d-flex align-items-center">
              {!isLoggedIn && (
                <>
                  <span className="nav-item text-warning me-1">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </span>
                  <span className="nav-item text-white me-1">or</span>
                  <span className="nav-item text-warning">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/signup"
                    >
                      Create an account
                    </NavLink>
                  </span>
                </>
              )}
            </div>
            {isLoggedIn && (
              <div className="d-flex align-items-center">
                <Link
                  to="/cart"
                  className="btn btn-light bi bi-cart3 me-3 position-relative"
                >
                  {numCartItems > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {numCartItems}
                      <span className="visually-hidden">Records in cart</span>
                    </span>
                  )}
                </Link>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="info"
                    id="dropdown-basic"
                    className="btn-warning"
                  >
                    <User />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as="button" className="btn">
                      <Logout />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
