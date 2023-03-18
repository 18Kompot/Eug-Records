var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const headers = require("./middleware/headers");
const auth = require("./middleware/auth");

var indexRouter = require("./routes/index");
var recordsRouter = require("./routes/records");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(headers);
app.use("/", indexRouter);
app.use("/records", auth, recordsRouter);
app.use("/users", usersRouter);

module.exports = app;
