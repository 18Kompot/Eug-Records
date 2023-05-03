import Joi from "joi";
import { useState } from "react";
import { toast } from "react-toastify";
import { postRequest } from "../services/api";
import { IContactData } from "./types";

function Contact() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  function submit() {
    const schema = Joi.object().keys({
      name: Joi.string().required().min(2).max(256),
      email: Joi.string()
        .required()
        .min(6)
        .max(256)
        .email({ tlds: { allow: false } }),
      subject: Joi.string().required().min(2).max(256),
      message: Joi.string().required().min(2).max(256),
    });

    const { error, value } = schema.validate({
      name,
      email,
      subject,
      message,
    });

    if (error) {
      //   setError(error.message);
      console.log(error.message);
      return;
    }
    sendForm(value);
  }

  function sendForm(data: IContactData) {
    const res = postRequest("contact-me/contact", data, false);
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
        toast.success("Form sent successfully", {
          position: "top-center",
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
    <>
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-lg-12 col-xl-11">
          <div className="p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Subject:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Message:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  onClick={submit}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
