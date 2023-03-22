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
            <p>About Collection Equipment</p>
          </div>
        </div>
        <div className="col-md-3">
          <h6>Social Media</h6>
          <div className="col-md-3">
            <p>Facebook Youtube Instagram</p>
          </div>
        </div>
        <p className="text-center">Created By Evgeny Kroitoru {year} &#169;</p>
      </div>
    </>
  );
}

export default Footer;
