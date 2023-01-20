const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const bodyParser = require("body-parser");
var cors = require("cors");

const PORT = process.env.PORT || 3005;

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ limit: "50mb", extended: false }));

//import routes
const authRoute = require("./routes/auth");
const ct = require("./routes/ct");
const hr = require("./routes/hr");
const ip = require("./routes/ip");
const lt = require("./routes/lt");
const cl = require("./routes/cl");
const getCl = require("./routes/getCl");
const getCt = require("./routes/getCt");
const getHr = require("./routes/getHr");
const getIp = require("./routes/getIp");
const getLt = require("./routes/getLt");

const uri = process.env.DB_CONNECTION;

mongoose.connect(uri, { useNewUrlParser: true }, () =>
  console.log("connected to db")
);

//route middlewares
app.use("/api/user", authRoute);
app.use("/api/postCt", ct);
app.use("/api/postCl", cl);
app.use("/api/postHr", hr);
app.use("/api/postIp", ip);
app.use("/api/postLt", lt);
app.use("/api/getIp", getIp);
app.use("/api/getLt", getLt);
app.use("/api/getHr", getHr);
app.use("/api/getCt", getCt);
app.use("/api/getCl", getCl);

app.get("/", (req, res) => {
  res.send("My student attendance API");
});

app.listen(PORT, () => {
  console.log("Server is up and running");
});
