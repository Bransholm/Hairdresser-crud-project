"use strict";

// I vores CRUD APP er der en global function som hedder "let posts;". Jeg er usikker på om vi også skal have en lignende global variabel
// let posts;

window.addEventListener("load", start);

function start() {
  console.log("Hi hairdresser");
  showFrontPage();

  document
    .querySelector("#frontpageLink")
    .addEventListener("click", showFrontPage);
  document
    .querySelector("#bookingLink")
    .addEventListener("click", showBookingPage);
}

function showFrontPage() {
  // document.querySelector("#frontpage").classList.remove("hidden");
  document.querySelector("#booking").classList.add("hidden");
  document.querySelector("#shopInfo").classList.add("hidden");
}

// function showBookingPage() {
//   document.querySelector("#booking").classList.remove("hidden");
//   document.querySelector("#frontpage").classList.add("hidden");
//   document.querySelector("#shop-info").classList.add("hidden");
//   document.querySelector("#photos").classList.add("hidden");
//   document.querySelector("#conacts").classList.add("hidden");
// }

// function showShopPage() {
//   document.querySelector("#shop-info").classList.remove("hidden");
//   document.querySelector("#booking").classList.add("hidden");
//   document.querySelector("#frontpage").classList.add("hidden");
//   document.querySelector("#photos").classList.add("hidden");
//   document.querySelector("#conacts").classList.add("hidden");
// }

// function showPhotosPage() {
//   document.querySelector("#photos").classList.remove("hidden");
//   document.querySelector("#booking").classList.add("hidden");
//   document.querySelector("#frontpage").classList.add("hidden");
//   document.querySelector("#shop-info").classList.add("hidden");
//   document.querySelector("#conacts").classList.add("hidden");
// }

// function showContactsPage() {
//   document.querySelector("#conacts").classList.remove("hidden");
//   document.querySelector("#booking").classList.add("hidden");
//   document.querySelector("#frontpage").classList.add("hidden");
//   document.querySelector("#shop-info").classList.add("hidden");
//   document.querySelector("#photos").classList.add("hidden");
// }
