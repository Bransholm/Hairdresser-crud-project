"use strict";

const endpoint =
  "https://hairdresser-crud-project-default-rtdb.europe-west1.firebasedatabase.app/";

//import{updateData} from `./booking.js`;

async function fetchOrders() {
  const promise = await fetch(`${endpoint}/orders.json`);
  const response = await promise.json();

  console.log(response);
  return response;
}

export { fetchOrders };
