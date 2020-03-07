const express = require("express");
const router = express.Router();
const Hotel = require("../../models/Hotel");

router.get("/", async (req, res) => {
  let hotels = await Hotel.find();
  res.send(hotels);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    let hotel = new Hotel({
      name: req.body.name,
      location: req.body.location,
      rooms: [
        {
          roomNumber: req.body.roomNumber,
          roomType: req.body.roomType,
          roomPrice: req.body.roomPrice,
          available: req.body.available
        }
      ]
    });

    hotel = await hotel.save();
    res.send(hotel);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
