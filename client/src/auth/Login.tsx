import Title from "../components/Title";
import Joi from "joi";
import { useState } from "react";
import { NavLink } from "react-router-dom";

interface Props {
  handler: Function;
}

function Login({ handler }: Props) {
  // const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  //todo: create an error componenet for this:
  //const [error, setError] = useState<string>("")

  function submit() {
    const schema = Joi.object().keys({
      email: Joi.string()
        .required()
        .min(6)
        .max(256)
        .email({ tlds: { allow: false } }),
      password: Joi.string().required().min(6).max(30),
    });

    const { error, value } = schema.validate({
      email,
      password,
    });

    if (error) {
      //   setError(error.message);
      console.log(error.message);
      return;
    }
    handler(value);
  }
  return (
    <>
      <Title
        main={<>Welcome back!</>}
        sub={
          <>
            sign in to your account or {""}
            <NavLink to={"/signup"}>create one</NavLink> if you're new :)
          </>
        }
      />

      <div className="vh-20">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" />
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h2 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign in
                    </p>
                    <div className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
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
                        <div className="form-outline flex-fill mb-0">
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
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="button"
                          onClick={submit}
                          className="btn btn-primary btn-lg"
                        >
                          Login
                        </button>
                      </div>
                      <NavLink to={"/password-reset"}>Forgot password</NavLink>
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

export default Login;
