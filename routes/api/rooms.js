const express = require('express');
const router = express.Router();
const Room = require("../../models/Room");

router.get("/", (req, res) => {
    res.send("Hello World");
    console.log("Hello")
});

router.post("/", async(req, res) => {
    console.log(req.body);

    const room = new Room({
        roomNumber: req.body.roomNumber,
        roomType: req.body.roomType,
        roomPrice: req.body.roomPrice,
        available: req.body.available
    })

    room = await room.save();
    res.send(room);
})


module.exports = router;