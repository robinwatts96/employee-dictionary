// Global Variables 
const listContainer = document.querySelector(".card-container");
const rightArrow = document.querySelector(".right");
const leftArrow = document.querySelector(".left");
const showCard = document.getElementsByClassName("show");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const url = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const searchBar = document.getElementById("search");
let employees;
let data = [];
let employeeHTML = "";

// function to get data from server
const getData = async () => {
  const response = await fetch(url);
  data = await response.json();
  employees = await data.results;
  display(data);
}

// Runs function to get data
getData();

// Filter names on keyup
searchBar.addEventListener("keyup", () => {

  let personName = document.querySelectorAll(".name");
  let card = document.querySelectorAll(".card");
  let userInput = searchBar.value.toLowerCase();

  for(let i = 0; i < data.results.length; i++){
    if(searchBar !== ""){
      if(personName[i].textContent.toLowerCase().indexOf(userInput) !== -1){
        card[i].style.display = "";
        card[i].classList.add("show");
        card[i].setAttribute("data-index", i);
      }else{
        card[i].style.display = "none";
        card[i].classList.remove("show");
        card[i].removeAttribute("data-index");
      }
    }
  }
});

// function to display profile cards
function display(data){ 

  for(let i = 0; i < showCard.length; i ++){
    let name = employees[i].name;
    let email = employees[i].email;
    let city = employees[i].location.city;
    let picture = employees[i].picture;

    if(showCard.display !== "none"){
      employeeHTML += `
      <div class="card show" data-index="${i}">
      `;
    }else{
      employeeHTML += `
      <div class="card" data-index="#">
      `;
    }
    // setup HTML code and store it in variable
    employeeHTML += `
    <img class="avatar" src="${picture.large}" alt="profile pic">
    <div class="text-container">
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="address">${city}</p>
    </div>
  </div>
    `;
  }
  // add HTML code to card container in HTML
  listContainer.innerHTML = employeeHTML;
}

// Moal display function
function displayModal(index){
  // create object to hold info
  let {name, dob, phone, email, location:
     { city, street, state, postcode}, picture}
      = employees[index];
  // Data object for dob
  let date = new Date(dob.date);

  const modalHTML = `
  <img class="avatar" src="${picture.large}" alt="profile pic">
  <div class="modal-text">
    <h2 class="name">${name.first} ${name.last}</h2>
    <p class="email">${email}</p>
    <p class="address">${city}</p>
    <hr />
    <p>${phone}</p>
    <p class="address">${street.number} ${street.name} ${city}, ${state} ${postcode}</p>
    <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
  </div>
  `;

  // remove hidden class to display overlay of modal, and add modal HTML data
  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;
}

// CLick function to display modal for profile that is clicked
listContainer.addEventListener("click", e =>{
  // find closest card, and get index of that card
  if(e.target !== listContainer){
    const card = e.target.closest(".card");
    let index = card.getAttribute("data-index");

    let nextIndex = parseInt(index);
  // run function to display data from that specific index of card
    displayModal(index);

  // move to next or previous card with all cards showing
    rightArrow.addEventListener("click", () =>{
      if(nextIndex < 11){
        nextIndex += 1;
        displayModal(nextIndex);
      }  
    });
    leftArrow.addEventListener("click", () =>{
      if(nextIndex > 0){
        nextIndex -= 1;
        displayModal(nextIndex);
      }
    });
  }
});

// Close modal
modalClose.addEventListener("click", () =>{
  overlay.classList.add("hidden");
});