import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <div className="text-dark d-flex justify-content-center bg-dark opacity-40 mt-auto">
        <div className="text-light col-md-3">
          <h6>Contact Information</h6>
          <span>My email</span>
          <span>My phone</span>
        </div>
        <div className="row col-md-3 text-light">
          <h6>Site Map</h6>
          <div className="col-md-3">
            <span className="col">
              <Link className="nav-link" to={`/about`}>
                About
              </Link>
              <Link className="nav-link" to={`/equipment`}>
                Equipment
              </Link>
              <Link className="nav-link" to={`/contact`}>
                Contact me
              </Link>
            </span>
          </div>
        </div>
        <div className="col-md-3 text-light">
          <h6>Social Media</h6>
          <span className="row m-3">
            <a
              href="https://www.linkedin.com/in/eugkro"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://www.discogs.com/user/Primo18"
              target="_blank"
              rel="noreferrer"
            >
              Discogs
            </a>
            <a
              href="https://www.youtube.com/18compton"
              target="_blank"
              rel="noreferrer"
            >
              Youtube
            </a>
          </span>
        </div>
        <p className="text-center text-light">
          Created By Evgeny Kroitoru {year} &#169;
        </p>
      </div>
    </>
  );
}

export default Footer;
