"use strict";

// I vores CRUD APP er der en global function som hedder "let posts;". Jeg er usikker på om vi også skal have en lignende global variabel
// let posts;

window.addEventListener("load", start);

function start() {
  console.log("Hi hairdresser");
  showFrontPage();

  document
    .querySelector("#frontpageBtn")
    .addEventListener("click", showFrontPage);
  document
    .querySelector("#bookingBtn")
    .addEventListener("click", showBookingPage);
  document.querySelector("#infoBtn").addEventListener("click", showInfoPage);

  document.querySelector("#photoBtn").addEventListener("click", showPhotoPage);

  document
    .querySelector("#contactBtn")
    .addEventListener("click", showContactPage);
}

function showFrontPage() {
  document.querySelector("#frontpage").classList.remove("hidden");
  document.querySelector("#booking").classList.add("hidden");
  document.querySelector("#shop-info").classList.add("hidden");
  document.querySelector("#photos").classList.add("hidden");
  document.querySelector("#contacts").classList.add("hidden");
}

function showBookingPage() {
  document.querySelector("#frontpage").classList.add("hidden");
  document.querySelector("#booking").classList.remove("hidden");
  document.querySelector("#shop-info").classList.add("hidden");
  document.querySelector("#photos").classList.add("hidden");
  document.querySelector("#contacts").classList.add("hidden");
}

function showInfoPage() {
  document.querySelector("#frontpage").classList.add("hidden");
  document.querySelector("#booking").classList.add("hidden");
  document.querySelector("#shop-info").classList.remove("hidden");
  document.querySelector("#photos").classList.add("hidden");
  document.querySelector("#contacts").classList.add("hidden");
}

function showPhotoPage() {
  document.querySelector("#frontpage").classList.add("hidden");
  document.querySelector("#booking").classList.add("hidden");
  document.querySelector("#shop-info").classList.add("hidden");
  document.querySelector("#photos").classList.remove("hidden");
  document.querySelector("#contacts").classList.add("hidden");
}

function showContactPage() {
  document.querySelector("#frontpage").classList.add("hidden");
  document.querySelector("#booking").classList.add("hidden");
  document.querySelector("#shop-info").classList.add("hidden");
  document.querySelector("#photos").classList.add("hidden");
  document.querySelector("#contacts").classList.remove("hidden");
}

