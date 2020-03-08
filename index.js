const mongoose = require("mongoose");
const express = require("express");
const keys = require("./config/keys");

const app = express();

const hotels = require("./routes/api/hotels");
const rooms = require("./routes/api/rooms");

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
app.use("/api/addroom", rooms);

const port = 3000;

app.listen(port, () =>
  console.log(`listening on port ${port} - KimPossible Operational`)
);
