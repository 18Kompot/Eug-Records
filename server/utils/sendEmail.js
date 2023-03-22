module.exports = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 587,
      secure: true,
      auth: {
        user: "187samp@gmail.com",
        pass: "12345",
      },
    });

    await transporter.sendMail({
      from: "187samp@gmail.com",
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log(error, "email is not sent");
  }
};
