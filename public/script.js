const url = "api/hotels";

let hotels = [];

let xhrGetAll = new XMLHttpRequest();
xhrGetAll.open("GET", url, true);
xhrGetAll.send();

xhrGetAll.onload = () => {
  //console.log(xhrGetAll);
  hotels = xhrGetAll.response;

  if (xhrGetAll.readyState == 4 && xhrGetAll.status == 200) {
    console.log(hotels);
  } else {
    console.error("Error!");
  }
};

const renderHotels = () => {
  console.log("click");
  const hotelList = hotels.map(element => {
    console.log(element._id);
    return (
      "<li>" +
      "Name: " +
      element.name +
      ", " +
      "Location: " +
      element.location +
      ", " +
      "Room Number: " +
      element.roomNumber +
      ", " +
      "Room Type: " +
      element.roomType +
      ", " +
      "Room Price: " +
      element.roomPrice +
      ", " +
      "Available: " +
      element.available +
      ", "`  <button class="btn waves-effect waves-light" onclick="editGraduate('${element._id}')">Edit Hotel</button>` +
      `  <button class="btn waves-effect waves-light" onclick="deleteGraduate('${element._id}')">Delete Hotel</button>` +
      "</li>"
    );
  });
  document.getElementById("room").innerHTML =
    "<ul>" + hotelList.join() + "</ul>";
};

function addHotel(e) {
  e.preventDefault();

  let hotel = {
    name: document.getElementById("name").value,
    location: document.getElementById("location").value,
    rooms: [
      {
        room: document.getElementById("roomnumber").value,
        roomType: document.getElementById("roomtype").value,
        roomPrice: document.getElementById("roomprice").value,
        available: document.getElementById("available").value
      }
    ]
  };
  console.log(hotel);

  let xhrPost = new window.XMLHttpRequest();
  xhrPost.open("POST", url);
  xhrPost.setRequestHeader("Content-Type", "application/json");
  xhrPost.send(JSON.stringify(hotel));
}
