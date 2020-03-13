async function apiCall() {
  let res = await fetch("http://localhost:4400/api/hotels");
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
//   let entryContainer = document.createElement("ul");
//   entryContainer.className = "card blue-grey white-text";
  let entry = document.createElement("li");
  entry.className = "card blue-grey white-text";
  entry.innerHTML = `Hotel Name: ${hotel.name}<br>`;
  entry.innerHTML += `<li>Hotel Location: ${hotel.location}`;
  hotel.rooms.forEach(element => {
    let room = document.createElement("li");
    room.className = "card-content";
    room.innerHTML =  `Room Type: ${element.roomType} <br> <li> Price: ${element.roomPrice}<br>`;
    let bookRoomButton = document.createElement("button");
    bookRoomButton.className = "btn waves-effect waves-light";
    bookRoomButton.innerHTML = "Book Room";
    bookRoomButton.onclick = `<a href="rooms.html">`;
    // let deleteButton = document.createElement("button");
    // deleteButton.className = "btn waves-effect waves-light";
    // deleteButton.innerHTML = "Delete";
    // deleteButton.onclick = `deleteHotel(${element._id})`;
    room.appendChild(bookRoomButton);
    // room.appendChild(deleteButton);
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
        // available: document.getElementById("available").value
      }
    ]
  };

  console.log(hotel);

  let xhrPost = new window.XMLHttpRequest();
  xhrPost.open("POST", "http://localhost:4400/api/hotels");
  xhrPost.setRequestHeader("Content-Type", "application/json");
  xhrPost.send(JSON.stringify(hotel));
}


// function editHotel(id) {
//     console.log('editing open')

//     let hotel = {
//     name: document.getElementById("name").value,
//     location: document.getElementById("location").value,
//     rooms: [
//       {
//         room: document.getElementById("roomnumber").value,
//         roomType: document.getElementById("roomtype").value,
//         roomPrice: document.getElementById("roomprice").value,
//         available: document.getElementById("available").value
//       }
//     ]
//   }; 

//     let xhrEdit = new XMLHttpRequest (); 
//     xhrEdit.open("POST", "http://localhost:4400/api/hotels" +`/${id}`); 
//     xhrEdit.setRequestHeader('Content-type', 'application/json'); 
//     xhrEdit.onload = () => { 
//         let hotels = JSON.parse(xhrEdit.response); 
//         if (xhrEdit.readyState == 4 && xhrEdit.status == "200") { 
//             console.table(hotels);
//         } else { 
//             console.table(hotels);
//         }
//     }
//     xhrEdit.send(JSON.stringify(hotel));
// }

//Works with postman
function deleteHotel(id) {
    console.log("TEST");

    let xhrDelete = new XMLHttpRequest();
    xhrDelete.open("DELETE", "http://localhost:4400/api/hotels" + `/${id}`, true);
    xhrDelete.onload = function() {
        let hotels = JSON.parse(xhrDelete.response);
        if (xhrDelete.readyState == 4 && xhrDelete.status == "200"){
    } else {
        console.error(hotels);
    }
}
xhrDelete.send(null);
}