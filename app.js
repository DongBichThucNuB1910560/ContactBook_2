const cors = require("cors");
const contactRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");

var express = require("express");
// var bodyParser = require("body-parser");
var app = express();

// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.use(bodyParser.json());

app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactRouter);
// handle 404 response
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

app.use((error, req, res, next) => {
  return res
    .status(error.statusCode || 500)
    .json({ message: error.message || "Internal Server Error" });
});


app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book application." });
});
module.exports = app;
