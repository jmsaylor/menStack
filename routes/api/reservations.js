const express = require("express");
const router = express.Router();
const Hotel = require("../../models/Hotel");

//POST route for adding reservations - finds hotel, then specific room, and pushes reservation details
// to array
router.post("/", async (req, res) => {
  try {
    let hotel = await Hotel.findById(req.body.hotelId);

    for (let x = 0; x < hotel.rooms.length; x++) {
      if (hotel.rooms[x]._id == req.body.roomId) {
        var selected = hotel.rooms[x];
        hotel.rooms[x].reservation.push({
          checkIn: req.body.checkIn,
          checkOut: req.body.checkOut
        });
      }
    }

    await hotel.save();
    res.status(201).json(selected);
  } catch (err) {
    console.error(err);
  }
});

// Base GET route - Gives all rooms in a hotel without any filters (i.e. - availability, roomType, ...)
router.get("/:id", async (req, res) => {
  try {
    let hotel = await Hotel.findById(req.params.id);
    rooms = hotel.rooms;
    res.send(rooms);
  } catch (err) {
    res.status(300).json({ msg: err.message });
  }
});

module.exports = router;
