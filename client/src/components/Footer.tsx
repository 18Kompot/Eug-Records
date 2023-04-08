import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <div className="text-light bg-dark opacity-40 py-2">
        <div className="row">
          <div className="col text-center">
            <h4>Social Media</h4>
          </div>
          <div className="col text-center">
            <h4>Contact Information</h4>
            <div>My email</div>
            <div>My phone</div>
          </div>
          <div className="col text-center">
            <h4>Site Map</h4>
            <Link className="nav-link" to={`/about`}>
              About
            </Link>
            <Link className="nav-link" to={`/equipment`}>
              Equipment
            </Link>
            <Link className="nav-link" to={`/contact`}>
              Contact me
            </Link>
          </div>
        </div>
        <div className="row pt-2">
          <hr></hr>
          <div className="d-flex text-center">
            <span className=" col justify-content-start align-self-center">
              Created By Evgeny Kroitoru {year} &#169;
            </span>
            <div className="col justify-content-end">
              <i className="mx-2 bi bi-vinyl fs-4"></i>
              <i className="mx-2 bi bi-youtube fs-4"></i>
              <i className="mx-2 bi bi-linkedin fs-4"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
