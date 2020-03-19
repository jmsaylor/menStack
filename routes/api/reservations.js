const express = require("express");
const router = express.Router();
const Hotel = require("../../models/Hotel");
// const Room = require('../../models/Room') //testing

//POST route for adding reservations - finds hotel, then specific room, and pushes reservation details
// to array
router.post("/", async (req, res) => {
  console.log("KP Booking - Attempting to make reservation...");
  try {
    let hotel = await Hotel.findById(req.body.hotelId);
    for (let x = 0; x < hotel.rooms.length; x++) {
      if (hotel.rooms[x]._id == req.body.roomId) {
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

// GET routes that takes hotelId and roomId in body to give all reservations for a given room
router.get("/", async (req, res) => {
  let hotel = await Hotel.findById(req.body.hotelId);
  for (let x = 0; x < hotel.rooms.length; x++) {
    if (hotel.rooms[x]._id == req.body.roomId) {
      var selected = hotel.rooms[x];
    }
  }
  res.json(selected);
});

//This DELETE route needs 3 things to come through body: hotelId, roomId, & resId
router.delete("/", async (req, res) => {
  try {
    let hotel = await Hotel.findById(req.body.hotelId);
    for (let x = 0; x < hotel.rooms.length; x++) {
      if (hotel.rooms[x]._id == req.body.roomId) {
        for (let i = 0; i < hotel.rooms[x].reservations.length; i++) {
          if (hotel.rooms[x].reservations[i]._id == req.body.resId) {
            console.log(hotel.rooms[x].reservations[i]);
            hotel.rooms[x].reservations.splice(i, 1);
            // var test = hotel.rooms[x].reservations[i];
          }
        }
      }
    }
    await hotel.save();
    res.json({ msg: "KP Booking - Deleted Reservation" });
  } catch (err) {
    res.status(300).json({ msg: err.message });
  }
});

//Basic PUT route
router.put("/", async (req, res) => {});

module.exports = router;
