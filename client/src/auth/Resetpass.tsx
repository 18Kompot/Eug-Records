function Resetpass() {
  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 col-xl-11">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
              <p className="text-center h2 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                Reset your password
              </p>
              <div className="mx-1 mx-md-4">
                <div className="d-flex flex-row align-items-center mb-4">
                  <div className="form-outline flex-fill mb-0">
                    <label>Type in your email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                    />
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button
                        type="button"
                        className="btn btn-primary btn-lg m-2"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resetpass;
