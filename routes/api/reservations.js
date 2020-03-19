const express = require("express");
const router = express.Router();
const Hotel = require("../../models/Hotel");

//POST route for adding reservations
router.post("/:hotelId/:roomId", async (req, res) => {
  console.log("KP Booking - Attempting to make reservation...");
  try {
    let hotel = await Hotel.findById(req.params.hotelId);
    for (let x = 0; x < hotel.rooms.length; x++) {
      if (hotel.rooms[x]._id == req.params.roomId) {
        var selected = hotel.rooms[x];
        hotel.rooms[x].reservations.push({
          checkIn: req.body.checkIn,
          checkOut: req.body.checkOut
        });
      }
    }
    await hotel.save();
    res.status(201).json({ msg: "congratulations! Reservation made." });
  } catch (err) {
    console.error(err);
  }
});

//GET route for all rooms & reservations in a single hotel
router.get("/:hotelId", async (req, res) => {
  try {
    let hotel = await Hotel.findById(req.params.hotelId);
    res.json(hotel);
  } catch (err) {
    res.status(300).json({ msg: err.message });
  }
});

//GET route for reservations for a specific room
router.get("/:hotelId/:roomId", async (req, res) => {
  let hotel = await Hotel.findById(req.params.hotelId);
  for (let x = 0; x < hotel.rooms.length; x++) {
    if (hotel.rooms[x]._id == req.params.roomId) {
      var selected = hotel.rooms[x];
    }
  }
  res.json(selected);
});

//DELETE route
router.delete("/:hotelId/:roomId/:resId", async (req, res) => {
  try {
    let hotel = await Hotel.findById(req.params.hotelId);
    for (let x = 0; x < hotel.rooms.length; x++) {
      if (hotel.rooms[x]._id == req.params.roomId) {
        for (let i = 0; i < hotel.rooms[x].reservations.length; i++) {
          if (hotel.rooms[x].reservations[i]._id == req.params.resId) {
            console.log("Deleting reservation...");
            console.log(hotel.rooms[x].reservations[i]);
            var roomSelected = hotel.rooms[x];
            hotel.rooms[x].reservations.splice(i, 1);
          }
        }
      }
    }
    await hotel.save();
    // res.json({ msg: "KP Booking - Deleted Reservation" });
    res.json(roomSelected);
  } catch (err) {
    res.status(300).json({ msg: err.message });
  }
});

//Basic PUT route
router.put("/", async (req, res) => {});

module.exports = router;
