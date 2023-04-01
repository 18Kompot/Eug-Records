import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <div className="text-dark row justify-content-center bg-secondary opacity-40 mt-auto">
        <div className="col-md-3">
          {/* <img
            src="https://static.vecteezy.com/system/resources/previews/009/313/617/original/vinyl-record-vector-illustration-isolated-on-white-background-free-png.png"
            alt="record"
            height="30px"
          /> */}

          <h6>Contact Information</h6>
          <div className="col-md-3">
            <p>My email my phone</p>
          </div>
        </div>
        <div className="col-md-3">
          <h6>Site Map</h6>
          <div className="col-md-3">
            <span className="row">
              <Link to={`/about`}>About</Link>
              <Link to={`/equipment`}>Equipment</Link>
              <Link to={`/contact`}>Contact me</Link>
            </span>
          </div>
        </div>
        <div className="col-md-3">
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
        <p className="text-center">Created By Evgeny Kroitoru {year} &#169;</p>
      </div>
    </>
  );
}

export default Footer;
