"use strict";

const endpoint =
  "https://hairdresser-crud-project-default-rtdb.europe-west1.firebasedatabase.app/";

// I vores CRUD APP er der en global function som hedder "let posts;". Jeg er usikker på om vi også skal have en lignende global variabel
// let posts;

window.addEventListener("load", start);

function start() {
  console.log("Booking");
  updateData();

  // Select der ændre form baseret på frisøren
  document
    .querySelector("#hairdresser-selected")
    .addEventListener("change", modeSelected);

  //Knap som skifter mellem administrator og bruger status
  document
    .querySelector("#admin-selector")
    .addEventListener("click", changeAdminStatus);

  document
    .querySelector("#filters-bar")
    .addEventListener("keyup", filteredSearchInput);
  document
    .querySelector("#filters-bar")
    .addEventListener("search", filteredSearchInput);
}

let hairdresserSelector = 0;
let statusIsAdimin = true;

//create -elements
//update and delete baseon on id...
// sort and filter funtions....

async function updateData() {
  const jsonFiles = await fetchOrders();
  const listOfOrders = restructureData(jsonFiles);
  orderDOM(listOfOrders);
}

// Changes the admin status (when you click the button)
function changeAdminStatus() {
  if (statusIsAdimin == true) {
    statusIsAdimin = false;
    document.querySelector("#admin-selector").textContent = "Change to admin";
    document.querySelector("main").classList.add("user");
    document.querySelector("main").classList.remove("admin");
    document.querySelector("#orders-overview").classList.add("hidden");
    document.querySelector("#forms-tab").classList.remove("hidden");
  } else {
    statusIsAdimin = true;
    document.querySelector("#admin-selector").textContent =
      "Change to customer";
    document.querySelector("main").classList.add("admin");
    document.querySelector("main").classList.remove("user");
    document.querySelector("#orders-overview").classList.remove("hidden");
    document.querySelector("#forms-tab").classList.add("hidden");
  }
  updateData();
}

//Swaps between the selected hairdressers (Activated by a change)
function modeSelected() {
  const selectedMode = this.value;
  changeOfMode(selectedMode);
  setDOM();
}

//Changes the global variable hairdresser selector
function changeOfMode(selected) {
  if (selected == "1") {
    hairdresserSelector = 1;
  } else if (selected == "2") {
    hairdresserSelector = 2;
  } else if (selected == "3") {
    hairdresserSelector = 3;
  } else if (selected == "4") {
    hairdresserSelector = 4;
  }
  console.log(hairdresserSelector);
}

//Fetches the json on load
async function fetchOrders() {
  const promise = await fetch(`${endpoint}/orders.json`);
  const response = await promise.json();

  console.log(response);
  return response;
}

//Her loopes der på json-filen. Hvert object tages ud af hovedobjektet og puttes ind i en liste istedet.

function restructureData(ordersObject) {
  const ordersList = [];
  //For-In looper på indexspladser eller hvad?
  for (const order in ordersObject) {
    const key = ordersObject[order];
    key.id = order;
    ordersList.push(key);
  }
  return ordersList;
}

function orderDOM(ordersList) {
  for (const orderElement of ordersList) {
    visualizeOrderElement(orderElement);
  }
}

function visualizeOrderElement(order) {
  console.log("showOrder");
  //Const med lokationen for orders-overview
  const orderView = document.querySelector("#orders-overview");

  //Giver HTML-tags til hvert orderElement.
  const orderHTML =
    /*html*/
    `
<div class="oder-item">
<p>Den valgte frisør: ${order.frisør}</p>
<p>Den valgte behandling: ${order.behandling}</p>
<p>Dato: ${order.dato} Kl: ${order.tid}</p>
<p>Navnet på kunden: ${order.navn}</p>
<p>Kundes nummer: ${order.telefonNummer}</p>
<p>Kundes email: ${order.email}</p>
</div>
`;
  //Insætter elementet...
  orderView.insertAdjacentHTML("beforeend", orderHTML);
}

function setDOM() {
  let htmlDOM;
  document.querySelector("#forms-div").innerHTML = "";
  if (hairdresserSelector == 1) {
    htmlDOM =
      /*html*/
      `<select id="hairdresser">
     <option value="dreads"> Dreadlocks</option>
     <option value="cornrow"> Cornrows</option>
     <option value="hippie">Hippie hår</option>
     </select>`;
  } else if (hairdresserSelector == 2) {
    htmlDOM =
      /*html*/
      `<select id="hairdresser">
     <option value="page">Page hår</option>
     <option value="krøller">Krøller</option>
     <option value="gammel">Gammeldags</option>
     </select>`;
  } else if (hairdresserSelector == 3) {
    htmlDOM =
      /*html*/
      `<select id="hairdresser">
     <option value="smørhår">Smørhår</option>
     <option value="trump">Trump hår</option>
     <option value="slikhår">Spytslikkeren</option>
     </select>`;
  } else if (hairdresserSelector == 4) {
    htmlDOM =
      /*html*/
      `<select id="hairdresser">
     <option value="karse">Karseklip</option>
     <option value="army">Military cut</option>
     <option value="skallet">Nup det hele</option>
     </select>`;
  }

  const formHTML =
    /*html*/

    `<form id="order-form">
    <legend>Bestilling</legend>
   <div>${htmlDOM}</div>
   <lable for="oderDate">Dato</lable>
   <input type="date" id="orderDate" name="orderDate">
   <lable for="orderTime">Tid</lable>
   <input type="time" id="orderTime" name="orderTime">
   <legend>Bruger Information</legend>
   <lable for="fullName">Navn</lable>
   <input type="text" id="fullName" name="full-name">
   <lable for="userPhone">Tlf. Nummer</lable>
   <input type="text" id="userPhone" name="user-phone">
   <lable>Email</lable>
   <input type="email" id="userEmail" name="userEmail">
   

   <button type="submit">Accept</button>
   </form>`;

  //Insætter en frisør specifik form i HTML'en
  document
    .querySelector("#forms-div")
    .insertAdjacentHTML("beforeend", formHTML);

  document.querySelector("#order-form").addEventListener("submit", createOrder);
}

//Creates a new order when submit is pressed;
async function createOrder(event) {
  console.log("Order submitted");
  const form = event.target;

  const orderElement = {
    frisør: hairdresserSelector,
    behandling: form.hairdresser.value,
    dato: form.orderDate.value,
    tid: form.orderTime.value,
    navn: form.fullName.value,
    telefonNummer: form.userPhone.value,
    email: form.userEmail.value,
  };
  const url = `${endpoint}/orders.json`;
  const orderAsJson = await JSON.stringify(orderElement);
  const response = await fetch(url, {
    method: "POST",
    body: orderAsJson,
  });
  const data = await response.json();
  // Husk at opdatere så vi kan se der sker noget!
  updateData();
}

// -------- FILTERS FUNKTIONEN -------------

function filteredSearchInput(event) {
  const value = event.target.value;
  console.log(value);
  const filteredOrders = filteredSearch(value);
  //Kald funktionen som viser elementer...
  console.log(filteredOrders);
}

function filteredSearch(searchValue) {
  searchValue = searchValue.toLowerCase();
  //hvorkommer order/posts fra?
  const results = order.filter(checkTitle);

  function checkTitle(order) {
    const behandling = order.behandling.toLowerCase();
    return behandling.ncludes(searchValue);
  }
  return results;
}
