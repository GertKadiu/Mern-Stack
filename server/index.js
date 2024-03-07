const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(cors());
app.use(express.static("uploads"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

const UserRoute = require("./Routes/Users");
const PostRoute = require("./Routes/Post");
const AuthRoute = require("./Routes/Auth")

app.use("/", UserRoute);
app.use("/", PostRoute);
app.use("/", AuthRoute);

app.use(express.static(path.join(__dirname + "public")));

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT;

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
