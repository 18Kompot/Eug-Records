require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const headers = require("./middleware/headers");
const auth = require("./middleware/auth");

const indexRouter = require("./routes/index");
const recordsRouter = require("./routes/records");
const usersRouter = require("./routes/users");
const passwordReset = require("./routes/passwordReset");
const contactForm = require("./routes/contactForm");
const pages = require("./routes/pages");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(headers);
app.use("/", indexRouter);
app.use("/records", auth, recordsRouter);
app.use("/users", usersRouter);
app.use("/password-reset", passwordReset);
app.use("/contact-me", contactForm);
app.use("/pages", pages);

module.exports = app;
