import { useEffect, useState } from "react";
import { getRequest, patchRequest } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import Joi from "joi";
import { ISignupData } from "../pages/types";

function Newpass() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useParams();
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const res = getRequest(`newpassword/${id}/${token}`);
    if (!res) return;

    res
      .then((res) => res.json())
      .then((json) => {
        if (json.ok === false) {
          setError("error get the data");
          return;
        }

        setPassword(json.password);
      });
  }, [id, token]);

  function handleClick() {
    const schema = Joi.object().keys({
      password: Joi.string().required(),
    });

    const { error, value } = schema.validate({
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    setError("");
    editPass(value);
  }

  function editPass(user: ISignupData) {
    const res = patchRequest(`users/${id}`, user);
    if (!res) return;

    res
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          setError(json.error);
          return;
        }

        navigate("/login");
      });
  }

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
                    <label>Type in a new password</label>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <div className="form-outline flex-fill mb-0">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button
                        onClick={handleClick}
                        type="button"
                        className="btn btn-primary btn-lg"
                      >
                        Confirm change
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
}

export default Newpass;
