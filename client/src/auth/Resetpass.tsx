import { toast } from "react-toastify";
import { postRequest } from "../services/api";
import Joi from "joi";
import { useState } from "react";

interface ResetData {
  email: string;
}
function Resetpass() {
  const [email, setEmail] = useState<string>("");

  function submit() {
    const schema = Joi.object().keys({
      email: Joi.string()
        .required()
        .min(6)
        .max(256)
        .email({ tlds: { allow: false } }),
    });

    const { error, value } = schema.validate({
      email,
    });

    if (error) {
      //   setError(error.message);
      console.log(error.message);
      return;
    }
    reset(value);
  }

  function reset(data: ResetData) {
    const res = postRequest("password-reset", data, false);
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
        toast.success(`An email was sent to ${email}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      });
  }

  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 col-xl-11">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
              <p className="text-light text-center h2 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                Reset your password
              </p>
              <div className="mx-1 mx-md-4">
                <div className="d-flex flex-row align-items-center mb-4">
                  <div className="text-secondary form-outline flex-fill mb-0">
                    <label>Type in your email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button
                        type="button"
                        onClick={submit}
                        className="btn btn-warning btn-lg m-2"
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
