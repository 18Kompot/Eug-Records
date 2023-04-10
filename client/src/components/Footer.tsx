import { Link } from "react-router-dom";

function Footer() {
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
            <div>My email</div>
            <div>My phone</div>
          </div>
          <div className="col text-center">
            <p>SITE MAP</p>
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
          <hr className="mt-2"></hr>
          <div className="d-flex text-center">
            <span className="col justify-content-start align-self-center">
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
