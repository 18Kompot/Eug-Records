const express = require("express");
const router = express.Router();
const sendEmail = require("../utils/sendEmail");

router.post("/contact", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const subject = `(Contact Form) ${req.body.subject}`;
  const message = `<p>Name: ${name}</p>
                   <p>Email: ${email}</p>
                   <p>Message: ${req.body.message}</p>`;

  await sendEmail("userovich260@gmail.com", subject, message);
});

module.exports = router;
