const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema and Model

const RoomSchema = new Schema({
    roomNumber: {
    type: Number
},
    roomType: {
    type: String
},
    roomPrice: {
    type: Number
},
    available: {
    type: Boolean
}
});

const HotelSchema = new Schema({
    name: {
        type: String
    },
    location: {
        type: String
    },
    rooms: [RoomSchema]
});

const Hotel = mongoose.model("hotel", HotelSchema);

module.exports = Hotel;
