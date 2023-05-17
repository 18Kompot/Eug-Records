const nodemailer = require("nodemailer");
const email_address = process.env.EMAIL;
const email_password = process.env.EMAIL_PASS;

module.exports = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 587,
      secure: true,
      auth: {
        user: email_address,
        pass: email_password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: "Eug Records",
      to: email,
      subject: subject,
      html: text,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log(error, "email is not sent");
  }
};
