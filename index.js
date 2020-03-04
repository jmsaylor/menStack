const mongoose = require("mongoose");
const express = require("express");
const keys = require("./config/keys");
const hotels = require("./routes/api/hotels");
const app = express();

app.use(express.json());

mongoose
  .connect(keys.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("connected to db - Welcome to KimPossible"))
  .catch(error => console.log("DB Connection error", error));

app.use(express.static("public"));
app.use("/api/hotels", hotels);

app.listen(3000, () =>
  console.log("listening on port 3000 - KimPossible Operational")
);
