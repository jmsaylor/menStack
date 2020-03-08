const express = require("express");
const router = express.Router();
const Hotel = require("../../models/Hotel");

//Extra get route for testing, in case we change the functionality of the base route. Returns entire database.
router.get("/test", async (req, res) => {
  console.log("Hotels list request received.");
  const hotels = await Hotel.find();
  console.log(hotels);
  try {
    res.send(hotels);
  } catch (err) {
    res.status(300).json({ msg: err.message });
  }
});

//Base get route, returns entire database
router.get("/", async (req, res) => {
  console.log("Hotels list request received.");
  const hotels = await Hotel.find();
  console.log(hotels);
  try {
    res.send(hotels);
  } catch (err) {
    res.status(300).json({ msg: err.message });
  }
});

//Rooms get route, returns all rooms for specified hotel.
router.get("/rooms/:id", async (req, res) => {
  console.log("Room list request received.");
  try {
    const hotel = await Hotel.findById(req.params.id);
    console.log("Hotel: " + hotel.name);
    res.send(hotel.rooms);
  } catch (err) {
    res.status(300).json({ msg: err.message });
  }
});

//Basic post route. Expects an entire hotel in JSON.
router.post("/", async (req, res) => {
  console.log("POST request received:");
  console.log(req.body);
  try {
    const hotel = new Hotel({
      name: req.body.name,
      location: req.body.location,
      rooms: req.body.rooms
    });
    await hotel.save();
    res.status(201).json(hotel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Room POST route, adds a room to the hotel id specified
router.post("/rooms/add/:id", async (req, res) => {
  console.log("Adding room to hotel id " + req.params.id);
  try {
    const hotel = await Hotel.findById(req.params.id);
    console.log("Hotel: " + hotel.name);
    hotel.rooms.push({
      room: req.body.room,
      roomType: req.body.roomType,
      roomPrice: req.body.roomPrice,
      available: req.body.available
    });
    await hotel.save();
    res.status(200).json({ msg: "Room added." });
  } catch (err) {
    res.status(300).json({ msg: err.message });
  }
});

//Basic PUT route. Expects updated hotel as JSON.
router.put("/:id", async (req, res) => {
  Hotel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    omitUndefined: true
  })
    .then(hotel => res.json(hotel))
    .catch(err => res.status(400).json("Error: " + err));
});

//Room PUT route. URL id is hotel id to change room in, req.body.index is room document to edit.
router.post("/rooms/update/:id", async (req, res) => {
  console.log(
    "Updating room " + req.body.index + " in hotel id " + req.params.id
  );
  try {
    const hotel = await Hotel.findById(req.params.id);
    // console.log("Hotel: "+hotel.name);
    hotel.rooms[index].room = req.body.room;
    hotel.rooms[index].roomType = req.body.roomType;
    hotel.rooms[index].roomPrice = req.body.roomPrice;
    hotel.rooms[index].available = req.body.available;
    await hotel.save();
    res.status(200).json({ msg: "Room updated." });
  } catch (err) {
    res.status(300).json({ msg: err.message });
  }
});

//Basic DELETE route. Needs no request data, just deletes the visited ID. Be careful!
router.delete("/:id", async (req, res) => {
  console.log("Delete request received for ID " + req.params.id);
  Hotel.findById(req.params.id)
    .then(hotel => hotel.remove().then(res.json({ success: "true" })))
    .catch(err => res.status(404).json("Not found."));
});

module.exports = router;
