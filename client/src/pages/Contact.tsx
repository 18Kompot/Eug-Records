import Joi from "joi";
import { useState } from "react";
import { toast } from "react-toastify";
import { postRequest } from "../services/api";
import Title from "../components/Title";

function Contact() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const clearForm = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  const submit = () => {
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
      toast.error(error.message, {
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

    const res = postRequest("contact-me/contact", value, false);
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
      });

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
    clearForm();
  };

  return (
    <>
      <Title main={<>Contact form</>} sub={<></>} />
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-6 col-xl-5">
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-white">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="subject" className="form-label text-white">
              Subject:
            </label>
            <input
              type="text"
              className="form-control"
              id="subject"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="message"
              className="form-label text-white"
              id="message-label"
            >
              Message:
            </label>
            <textarea
              className="form-control"
              id="message"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            onClick={submit}
            className="btn btn-primary mb-5"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default Contact;
