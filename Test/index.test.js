const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comment");
const dotenv = require("dotenv");
dotenv.config();

//connect database
mongoose
  .connect(
    "mongodb+srv://happy:1234@cluster0.Testing.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log(`DB connected successfully`);
  })
  .catch((e) => {
    console.log(`not connected`);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/user", authRoute);
app.use("/post", postRoute);
app.use("/comment", commentRoute);
app.listen(process.env.PORT || 3003, () =>
  console.log("server up and running on port: " + process.env.PORT)
);

