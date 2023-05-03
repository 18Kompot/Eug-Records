import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AppContext } from "../App";

function Footer() {
  const context = useContext(AppContext);
  const isLoggedIn = context && context.userName.length > 0;
  const year = new Date().getFullYear();

  return (
    <>
      <div className="container-fluid text-light bg-dark opacity-40 py-4">
        <div className="row">
          <div className="col text-center">
            <img
              className=""
              src="https://images.squarespace-cdn.com/content/v1/518f36c0e4b062dc22411eae/1498528865052-FNAYYP1O31KOKZ7W8UYW/TRS-logo-recordplatter-one+colour+%281%29.png"
              alt="record"
              height="100px"
            />
          </div>
          <div className="col text-center">
            <p>CONTACT INFORMATION</p>
            <div className="col justify-content-end">
              <Link to="/contact">
                <i className="mx-2 bi bi-envelope-at-fill fs-4"></i>
              </Link>
              <Link target="_blank" to={"https://www.youtube.com/18Compton"}>
                <i className="mx-2 bi bi-youtube fs-4"></i>
              </Link>
              <Link target="_blank" to={"https://www.discogs.com/user/Primo18"}>
                <i className="mx-2 bi bi-vinyl fs-4"></i>
              </Link>
              <Link target="_blank" to={"https://www.linkedin.com/in/eugkro/"}>
                <i className="mx-2 bi bi-linkedin fs-4"></i>
              </Link>
            </div>
          </div>
          <div className="col text-center">
            <p>SITE MAP</p>
            <Link className="nav-link" to={`/about`}>
              About
            </Link>
            {isLoggedIn && (
              <NavLink className="nav-link text-white" to="/collection">
                Collection
              </NavLink>
            )}
            <Link className="nav-link" to={`/equipment`}>
              Equipment
            </Link>
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
