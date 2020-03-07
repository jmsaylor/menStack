const express = require("express");
const router = express.Router();
const Hotel = require("../../models/Hotel");

router.get("/", (req, res) => {
  res.send("Hello World");
  console.log("Hello");
});

router.post("/", async (req, res) => {
  console.log(req.body);

  const hotel = new Hotel({
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
});

module.exports = router;
