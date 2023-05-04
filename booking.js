"use strict";

const endpoint =
  "https://hairdresser-crud-project-default-rtdb.europe-west1.firebasedatabase.app/";
// Hører til filter appen. Ikke sikker på hvad meningen er med den
let orders;

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

  //Styre input for "filter-baren"
  document
    .querySelector("#filters-bar")
    .addEventListener("keyup", filteredSearchInput);
  document
    .querySelector("#filters-bar")
    .addEventListener("search", filteredSearchInput);
  //submit event for "form-delete-order"
  document
    .querySelector("#form-delete-order")
    .addEventListener("submit", deleteOrderClicked);
  //submit event for "formupdate-order"
  document
    .querySelector("#form-update-order")
    .addEventListener("submit", updateOrderClicked);
  // Change event for valgt af data-sortering
  document
    .querySelector("#sort-selected")
    .addEventListener("change", sortingFunction);
  setCustomer();

  document
    .querySelector("#filterOrders")
    .addEventListener("change", filterSelector);
}

function deleteOrderClicked(event) {
  const id = event.target.getAttribute("data-id");
  deleteOrder(id);

  console.log(deleteOrder);
}

let hairdresserSelector = 0;
let statusIsAdimin = false;

//create -elements
//update and delete baseon on id...
// sort and filter funtions....

async function updateData() {
  const fetchObjects = await fetchOrders();
  orders = restructureData(fetchObjects);
  orderDOM(orders);
}

// Changes the admin status (when you click the button)
function changeAdminStatus() {
  //Skifter til kunde-mode
  if (statusIsAdimin == true) {
    statusIsAdimin = false;
    setCustomer();
  } else if (statusIsAdimin == false) {
    // Skifter til admin-mode;
    statusIsAdimin = true;
    setAdmin();
  }
  //// updateData();
}

function setAdmin() {
  document.querySelector("#admin-selector").textContent = "Change to customer";
  //Skifter til admin-farve-mode.
  document.querySelector("main").classList.add("admin");
  document.querySelector("main").classList.remove("user");
  //Skjuler forms for admin
  document.querySelector("#forms-tab").classList.add("hidden");
  // Viser admin orders og filter-baren
  document.querySelector("#admin-view").classList.remove("hidden");
}

function setCustomer() {
  document.querySelector("#admin-selector").textContent = "Change to admin";
  //Skifter bagrundsfarve til kunde-mode.
  document.querySelector("main").classList.add("user");
  document.querySelector("main").classList.remove("admin");
  //Viser bestilling forms til kunden
  document.querySelector("#forms-tab").classList.remove("hidden");
  // Skjuler order-list og filter-baren for kunden
  document.querySelector("#admin-view").classList.add("hidden");
  4;
}

//Swaps between the selected hairdressers (Activated by a change)
function modeSelected() {
  const selectedMode = this.value;
  changeOfMode(selectedMode);
  setDOM();
}

//Changes the global variable hairdresser selector
function changeOfMode(selected) {
  document
    .querySelector("#hairdresser-selected option")
    .classList.add("remove");
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

//Fetches the json on loadS
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

//Looper på listen af orders.
function orderDOM(list) {
  document.querySelector("#orders-overview").innerHTML = "";
  //document.querySelector("#forms-div").innerHTML = "";
  for (const orderElement of list) {
    visualizeOrderElement(orderElement);
  }
}

//Skaber DOM mapiuplation for hvert oder-element i listen.
function visualizeOrderElement(order) {
  console.log("showOrder");
  //Const med lokationen for orders-overview
  const orderView = document.querySelector("#orders-overview");

  //Giver HTML-tags til hvert orderElement.
  const orderHTML = /*html*/ `
      <article class="order-item">
        <p>Den valgte frisør: ${order.frisør}</p>
        <p>Den valgte behandling: ${order.behandling}</p>
        <p>Dato: ${order.dato} Kl: ${order.tid}</p>
        <p>Navnet på kunden: ${order.navn}</p>
        <p>Kundes nummer: ${order.telefonNummer}</p>
        <p>Kundes email: ${order.email}</p>
      <div class ="btns">
        <button class="btn-delete">Slet booking</button>
        <button class="btn-update">Updater booking</button>
      </div>
      </article>
`;
  //Insætter elementet...
  orderView.insertAdjacentHTML("beforeend", orderHTML);

  //document.querySelector("#orders").insertAdjacentHTML("beforeend", orderHTML);
  // Event listerner til Slet booking knap /DELETE/
  document
    .querySelector("#orders-overview article:last-child .btn-delete")
    .addEventListener("click", deleteClicked);

  document
    .querySelector("#orders-overview article:last-child .btn-update")
    .addEventListener("click", updateClicked);

  // I CRUD opgaven blev deleteClicked sat in i denne function, sådan den kunne håndtere hvad der skete når man ville
  // en post. Med samme metode kan vi lave en "deleteOrder" give muligheden for at slette sin booking.

  function deleteClicked(event) {
    document.querySelector("#dialog-delete-order-form").textContent =
      order.navn;
    document.querySelector("#dialog-delete-order-form").textContent = order.tid;
    document.querySelector("#dialog-delete-order-form").textContent =
      order.frisør;
    document
      .querySelector("#form-delete-order")
      .setAttribute("data-id", order.id);
    document.querySelector("#dialog-delete-order").showModal();
    document
      .querySelector("#btn-cancel")
      .addEventListener("click", closeWindow);
  }
  // Ligesom deleteClicked er en nested funktion i visualizeOrderElement, skal
  // Så skal updateClicked også ligge herinde

  // Funktionen kaldes når man trykker på update booking knappen

  function updateClicked() {
    console.log("Update button clicked");
    const formUpdateDialog = document.querySelector("#form-update-order");
    formUpdateDialog.frisør.value = order.frisør;
    formUpdateDialog.behandling.value = order.behandling;
    formUpdateDialog.dato.value = order.dato;
    formUpdateDialog.tid.value = order.tid;
    formUpdateDialog.navn.value = order.navn;
    formUpdateDialog.telefonNummer.value = order.telefonNummer;
    formUpdateDialog.email.value = order.email;
    formUpdateDialog.setAttribute("data-id", order.id);
    document.querySelector("#dialog-update-order").showModal();
    document
      .querySelector("#form-update-order")
      .addEventListener("submit", updateOrderClicked);
  }
}

// Setter DOM manipulation for bestillings-forms.
// // Variere efter hvilken frisør der er valgt (haridresserSelector)
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
   <lable for="orderDate">Dato</lable>
   <input type="date" id="orderDate" name="orderDate">
   <lable for="orderTime">Tid</lable>
   <input type="time" id="orderTime" name="orderTime">
   <legend>Bruger Information</legend>
   <lable for="fullName">Navn</lable>
   <input type="text" id="fullName" name="fullName">
   <lable for="userPhone">Tlf. Nummer</lable>
   <input type="text" id="userPhone" name="userPhone">
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
  // event.preventDefault();
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

  event.preventDefault();
  // Vi mangler en CLOSE FORMS

  const url = `${endpoint}/orders.json`;
  const orderAsJson = await JSON.stringify(orderElement);
  const response = await fetch(url, {
    method: "POST",
    body: orderAsJson,
  });

  const data = await response.json();
  if (response.ok) {
    console.log("En ny booking er blevet oprettet!");
    updateData();
  }

  // Husk at opdatere så vi kan se der sker noget!
}

//-----------DELETE RELATERET-----------------

async function deleteOrder(id) {
  const response = await fetch(`${endpoint}/orders/${id}.json`, {
    method: "DELETE",
  });
  if (response.ok) {
    console.log("En booking er blevet slettet fra Firebase");
    updateData();
  }
}
function handleDeletePostButtons() {
  const cancelButton = document.querySelector(
    "#dialog-delete-post .btn-cancel"
  );
  const yesButton = document.querySelector(
    '#dialog-delete-post button[type="submit"]'
  );

  cancelButton.addEventListener("click", closeWindow);
  //yesButton.addEventListener("click", yesWindow);
}

function closeWindow() {
  document.querySelector("#dialog-delete-order").close();
}
//-----------UPDATE RELATERET-----------------

async function updateOrder(
  id,
  frisør,
  behandling,
  dato,
  tid,
  navn,
  telefonNummer,
  email
) {
  console.log("yippie alt det der....");

  const orderToUpdate = {
    frisør,
    behandling,
    dato,
    tid,
    navn,
    telefonNummer,
    email,
  };

  console.log("Kig her");
  console.log(orderToUpdate);

  const json = JSON.stringify(orderToUpdate);
  const response = await fetch(`${endpoint}/orders/${id}.json`, {
    method: "PUT",
    body: json,
  });
  console.log(response.id);
  if (response.ok) {
    console.log("En ordre er blevet opdateret");
    updateData();
  }
}

function updateOrderClicked(event) {
  event.preventDefault();
  // console.log(event);
  console.log("update er klikket");
  const form = event.target;

  const frisør = form.frisør.value;
  const behandling = form.behandling.value;
  const dato = form.dato.value;
  const tid = form.tid.value;
  const navn = form.navn.value;
  const telefonNummer = form.telefonNummer;
  const email = form.email.value;

  const id = form.getAttribute("data-id");

  // console.log(frisør);
  // console.log(behandling);
  // console.log(dato);
  // console.log(tid);
  // console.log(navn);
  // console.log(telefonNummer);
  // console.log(email);

  updateOrder(id, frisør, behandling, dato, tid, navn, telefonNummer, email);

  document.querySelector("#dialog-update-order").close();
}

// -------- FILTERS FUNKTIONEN -------------

// function filterSelector(event) {
// const filterValue = event.target.value;
// if (filterValue == ""){

// }

// }

// function searchAmongAll(searchValue) {
//   for (const order in orders) {
//     x[y].includes(searchValue);
//   }
// }
function filteredSearchInput(event) {
  console.log("input");
  const value = event.target.value;
  console.log(value);
  const foundOrders = filterOrders(value);
  orderDOM(foundOrders);
}

function filterOrders(searchValue) {
  console.log("search");
  const searchVal = searchValue.toLowerCase();
  const results = orders.filter(checkProperty);

  function checkProperty(orders) {
    console.log("Check");
    const title = orders.behandling.toLowerCase();
    return title.includes(searchVal);
  }
  return results;
}

// if (filterCriteria == "service") {
//   console.log("service running");
//   const behandling = orders.behandling.toLowerCase();
//   console.log(behandling);
//   return behandling.includes(searchValue);
// } else if (filterCriteria == "fullName") {
//   const navn = orders.navn.toLowerCase();
//   return navn.includes(searchValue);
// }

//------ SORT FUNKTIONER-------------------
function sortingFunction(event) {
  const sortCriteria = event.target.value;
  console.log(sortCriteria);
  if (sortCriteria === "hairdresser") {
    orders.sort(sortByHairdresser);
  } else if (sortCriteria === "customerName") {
    orders.sort(sortByCustomer);
  } else if (sortCriteria === "time") {
    orders.sort(sortByDate);
  }
  orderDOM(orders);
}

function sortByHairdresser(a, b) {
  console.log("Sorter frisøren");
  return a.frisør - b.frisør;
}

function sortByDate(a, b) {
  //https://stackoverflow.com/questions/41673669/how-to-sort-object-array-by-time-in-javascript
  const timeA = a.dato + " " + a.tid;
  const timeB = b.dato + " " + b.tid;
  return timeA.localeCompare(timeB);
}

function sortByCustomer(a, b) {
  console.log("Sorter navnet");
  return a.navn.localeCompare(b.navn);
}
