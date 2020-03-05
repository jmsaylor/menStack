const mongoose = require("mongoose");
const express = require("express");
const keys = require("./config/keys");

const app = express();

app.use(express.json());
const hotels = require("./routes/api/hotels");
// const rooms = require("./routes/api/rooms");

mongoose
  .connect(keys.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("connected to db - Welcome to KimPossible"))
  .catch(error => console.log("DB Connection error", error));

app.use(express.static("public"));
app.use("/api/hotels", hotels);
// app.use("/api/rooms", rooms)

app.listen(3100, () =>
  console.log("listening on port 3100 - KimPossible Operational")
);
