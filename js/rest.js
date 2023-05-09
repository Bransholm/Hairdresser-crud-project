
const endpoint =
  "https://hairdresser-crud-project-default-rtdb.europe-west1.firebasedatabase.app/";

import { updateData } from "./booking.js";

async function fetchOrders() {
  const promise = await fetch(`${endpoint}/orders.json`);
  const response = await promise.json();

  console.log(response);
  return response;
}

//Creates a new order when submit is pressed;
async function createOrder(event) {
  // event.preventDefault();
  console.log("Order submitted");
  const form = event.target;

  const orderElement = {
    frisør: document.querySelector("#hairdresser-selected").value,
    behandling: form.hairdresser.value,
    dato: form.orderDate.value,
    tid: form.orderTime.value,
    navn: form.fullName.value,
    telefonNummer: form.userPhone.value,
    email: form.userEmail.value,
  };

  event.preventDefault();

  const url = `${endpoint}/orders.json`;
  const orderAsJson = await JSON.stringify(orderElement);
  const response = await fetch(url, {
    method: "POST",
    body: orderAsJson,
  });

  const data = await response.json();
  if (response.ok) {
    console.log("En ny booking er blevet oprettet!");
    document.querySelector("#successfull-booking-dialog").showModal();
    updateData();
  } else {
    document.querySelector("#response-error").showModal();
  }
}

async function deleteOrder(id) {
  const response = await fetch(`${endpoint}/orders/${id}.json`, {
    method: "DELETE",
  });
  if (response.ok) {
    console.log("En booking er blevet slettet fra Firebase");
    document.querySelector("#successfull-booking-dialog-delete").showModal();
    updateData();
  }
}

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
    document.querySelector("#successfull-booking-dialog-update").showModal();

    updateData();
  }
}

export { fetchOrders, createOrder, deleteOrder, updateOrder };
