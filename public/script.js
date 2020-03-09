async function apiCall() {
  let res = await fetch("http://localhost:3000/api/hotels");
  return res.json();
}

async function renderHotels() {
  let hotels = await apiCall();
  console.log(hotels);
  hotels.forEach(hotel => {
    makeHTML(hotel);
  });
}

async function makeHTML(hotel) {
  let entry = document.createElement("li");
  entry.innerHTML = `Name: ${hotel.name}`;
  entry.innerHTML += `Location ${hotel.location}`;
  entry.innerHTML += "<br>";
  hotel.rooms.forEach(element => {
    let room = document.createElement("li");
    room.innerHTML = element.room + element.roomType + element.roomPrice;
    let editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.onclick = `editGraduate(${element._id}`;
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = `deleteGraduate(${element._id})`;
    room.appendChild(editButton);
    room.appendChild(deleteButton);
    entry.appendChild(room);
  });
  let div = document.getElementById("room");
  div.appendChild(entry);
}

// async function renderHotels() {
//   console.log("click");
//   const hotels = await apiCall();
//   //   console.log(hotels);
//   const hotelList = hotels.map(element => {
//     // console.log(element._id);
//     return (
//       "<li>" +
//       "Name: " +
//       element.name +
//       ", " +
//       "Location: " +
//       element.location +
//       ", " +
//       "Room Number: " +
//       element.roomNumber +
//       ", " +
//       "Room Type: " +
//       element.roomType +
//       ", " +
//       "Room Price: " +
//       element.roomPrice +
//       ", " +
//       "Available: " +
//       element.available +
//       ", "`  <button class="btn waves-effect waves-light" onclick="editGraduate('${element._id}')">Edit Hotel</button>` +
//       `  <button class="btn waves-effect waves-light" onclick="deleteGraduate('${element._id}')">Delete Hotel</button>` +
//       "</li>"
//     );
//   });
//   console.log(hotelList);
//   document.getElementById("room").innerHTML =
//     "<ul>" + hotelList.join() + "</ul>";
// }

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
