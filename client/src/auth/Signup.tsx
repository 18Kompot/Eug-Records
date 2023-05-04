import Joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Title from "../components/Title";
import { ISignupData } from "../pages/types";
import { postRequest } from "../services/api";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState(false);

  //todo: create an error componenet for this:
  //const [error, setError] = useState<string>("")

  function submit() {
    const schema = Joi.object().keys({
      name: Joi.string().required().min(2).max(256),
      email: Joi.string()
        .required()
        .min(6)
        .max(256)
        .email({ tlds: { allow: false } }),
      password: Joi.string().required().min(6).max(30),
      isAdmin: Joi.boolean(),
    });

    const { error, value } = schema.validate({
      name,
      email,
      password,
      isAdmin,
    });

    if (error) {
      //   setError(error.message);
      console.log(error.message);
      return;
    }
    register(value);
  }

  function register(data: ISignupData) {
    const res = postRequest("users/signup", data, false);
    if (!res) return;
    res
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          toast.error(json.error, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "dark",
          });
          return;
        }
        navigate("/login");
      });
  }
  return (
    <>
      <Title
        main={<>Create an account</>}
        sub={<>and dive into the world of vinyl..</>}
      />

      <div className="vh-20">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" />
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center text-light h2 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>

                    <div className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline text-secondary flex-fill mb-0">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          <label>Your Name</label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline text-secondary flex-fill mb-0">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <label>Your Email</label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline text-secondary flex-fill mb-0">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label>Password</label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline text-secondary flex-fill mb-0">
                          <input
                            type="checkbox"
                            className="form-control form-check-input"
                            value={password}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                          />
                          <label>Password</label>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="button"
                          onClick={submit}
                          className="btn btn-info btn-lg"
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://seeklogo.com/images/V/vinyl-record-breaking-into-music-notes-logo-312D77C960-seeklogo.com.png"
                      className="img-fluid m-5"
                      alt="Sample"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
