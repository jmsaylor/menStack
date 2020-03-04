const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Hotel = require("../../models/Hotel");

router.get("/", async (req, res) => {
  try {
    let hotelRooms = await Hotel.find();
    res.send(hotelRooms);
  } catch (error) {
    console.error(error);
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);

  try {
    let hotelRoom = new Hotel({
      name: req.body.name
    });
    await hotelRoom.save();
    res.send(hotelRoom);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
