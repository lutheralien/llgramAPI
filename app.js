const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: ".env" });

app.use(
  cors({
    origin: ["http://localhost:3000","http://10.0.2.2:8081"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/test", (req, res) => {
  res.json({ msg: "Hello world!" });
});

app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));
// import routes
const user = require("./controller/user");
const chat = require("./controller/chat");
const message = require("./controller/message");

app.use("/api/v1/user", user);
app.use("/api/v1/chat", chat);
app.use("/api/v1/message", message);

// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;
