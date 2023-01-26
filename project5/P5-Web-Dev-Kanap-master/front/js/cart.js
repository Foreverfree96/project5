let cartArray = JSON.parse(localStorage.getItem("cartArray")) || [];

// console.log(cartArray);
// you can use your old variable baseUrl instead of creating a new variable called urlProducts
const baseUrl = `http://localhost:3000/api/products/`;
const orderUrl = `http://localhost:3000/api/products/order`;
console.log(orderUrl);
// console.log(baseUrl);

// creates an empty object to insert details in later to add id and price
const priceObject = {};

// ---------------------------------
// creates a promise based api request that returns the response into data
fetch(baseUrl)
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    // priceObject is initialized by currentPriceObj
    // the id's and prices of each object in the database
    currentPriceObj(data);
    totalCartPrice();
    totalCartArticles();
  })
  .then(() => {
    makeCartProducts(cartArray);
  })
  .then(() => {
    // another function to add event listeners
    addTheEventListener();
  })
  .then(() => {
    // a function to add event listeners on form
    eventListenersForForm();
  })
  .catch((error) => console.log(error));

function currentPriceObj(dataArray) {
  for (let i = 0; i < dataArray.length; i++) {
    priceObject[dataArray[i]._id] = dataArray[i].price;
  }
  // console.log(priceObject);
}
// ---------------------------------

// ---------------------------------
// interpulates HTML inside javscript and creates products cards

function makeCartProducts(cartArray) {
  cartItem.innerHTML = "";
  for (let i = 0; i < cartArray.length; i++) {
    // console.log(cartArray[i]);

    let html = `
      <article class="cart__item" data-id=${cartArray[i].id} data-color="${
      cartArray[i].color
    }">
      <div class="cart__item__img">
      <img src=${cartArray[i].imgUrl} alt=${cartArray[i].altTxt}>
      </div>
      <div class="cart__item__content">
      <div class="cart__item__content__description">
          <h2>${cartArray[i].name}</h2>
          <p>${cartArray[i].color}</p>
          <p>${priceObject[cartArray[i].id] * cartArray[i].quantity}</p>
      </div>
      <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
          <p>Qté :</p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
            cartArray[i].quantity
          }">
          </div>
          <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Delete</p>
          </div>
      </div>
      </div>
      </article>
  `;
    cartItem.innerHTML += html;
  }
}
// ---------------------------------

// ---------------------------------
// Handle events to update price & quantitys values
function updateQuantity(event) {
  const parentElement =
    event.target.parentNode.parentNode.parentNode.parentNode;
  let id = parentElement.getAttribute("data-id");
  let color = parentElement.getAttribute("data-color");
  // console.log(color);
  // console.log(id);
  // console.log(parentElement);

  // For loop with conditional to find specific object in cartArray
  // Once specific object is found, Update Quantity.
  for (let i = 0; i < cartArray.length; i++) {
    if (cartArray[i].id === id && cartArray[i].color === color) {
      cartArray[i].quantity = event.target.value;
    }
  }

  // Once specific object quantity is changed in the cartArray
  // Update LocalStorage

  localStorage.setItem("cartArray", JSON.stringify(cartArray));
  cartArray = JSON.parse(localStorage.getItem("cartArray"));
  // console.log(cartArray);
  makeCartProducts(cartArray);
  addTheEventListener();
  totalCartPrice();
  totalCartArticles();
}

// ---------------------------------
// Remove product from list
function removeProduct(event) {
  const parentElement =
    event.target.parentNode.parentNode.parentNode.parentNode;
  let id = parentElement.getAttribute("data-id");
  let color = parentElement.getAttribute("data-color");
  for (let i = 0; i < cartArray.length; i++) {
    if (cartArray[i].id === id && cartArray[i].color === color) {
      cartArray.splice(i, 1);
    }
  }
  // console.log(parentElement);
  makeCartProducts(cartArray);
  addTheEventListener();
  totalCartPrice();
  totalCartArticles();
  localStorage.setItem("cartArray", JSON.stringify(cartArray));
}
// ---------------------------------
// add Total price update on all products
const qtty = document.getElementById("totalPrice");
const totalArticles = document.getElementById("totalQuantity");

function totalCartArticles() {
  let total = 0;
  // console.log(Object.keys(priceObject));
  for (let i = 0; i < cartArray.length; i++) {
    // console.log(cartArray[i].id);
    // console.log(priceObject[cartArray[i].id], cartArray[i].quantity);
    total += parseInt(cartArray[i].quantity, 10);
  }
  totalArticles.innerText = total;
}

function totalCartPrice() {
  let total = 0;
  // console.log(Object.keys(priceObject));
  for (let i = 0; i < cartArray.length; i++) {
    // console.log(cartArray[i].id);
    // console.log(priceObject[cartArray[i].id], cartArray[i].quantity);
    total += priceObject[cartArray[i].id] * cartArray[i].quantity;
  }
  qtty.innerText = total;
}

// ---------------------------------

// ---------------------------------
// Assign classes from HTML and insert them into variables to be used in javascript

// console.log(orderBttn);

const cartItem = document.getElementById("cart__items");

let currentProductPrice = document.getElementsByClassName(
  "cart__item__content__description"
);

// console.log(currentProductPrice);

// ---------------------------------
// add Event Listeners
function addTheEventListener() {
  let itemQuantity = document.getElementsByClassName("itemQuantity");
  let deleteItem = document.getElementsByClassName("deleteItem");

  itemQuantity.innerText = cartArray.price * cartArray.color;

  // -------------------------------
  // add inner text after going to last sibling to p with price inserted
  for (let i = 0; i < itemQuantity.length; i++) {
    itemQuantity[i].addEventListener("change", updateQuantity);
  }
  for (let i = 0; i < deleteItem.length; i++) {
    deleteItem[i].addEventListener("click", removeProduct);
  }
  // console.log(itemQuantity, "click");
  // console.log(deleteItem, "click");
}
// ---------------------------------
// Assign classes from HTML and insert them into variables to be used in javascript
// ---------------------------------
// Most likely unused variables that I don't need.

// const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
// const lastNameErrorMsg = document.getElementById("firstNameErrorMsg");
// const addressErrorMsg = document.getElementById("addressErrorMsg");
// const cityErrorMsg = document.getElementById("cityErrorMsg");
// const emailErrorMsg = document.getElementById("emailErrorMsg");
// ---------------------------------
const fName = document.getElementById("firstName");
const lName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

const orderBttn = document.getElementById("order");

let firstNameIsValid = false;
let lastNameisValid = false;
let addressIsValid = false;
let cityIsValid = false;
let emailIsValid = false;
// ---------------------------------

// ---------------------------------
// Regex HTML Validation for submit form
const fNameRegex = /^[A-Za-z ]{2,32}$/;
const lNameRegex = /^[A-Za-z ]{2,32}$/;
const addressRegex = /^[A-Za-z0-9 ]{5,32}$/;
const cityRegex = /^[A-Za-z ]{3,32}$/;
const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

// ----------------------------------

// ----------------------------------
// Assign Eventlisteners to listen for a Key-up
function eventListenersForForm() {
  fName.addEventListener("keyup", checkFirstName);
  console.log(fName, "click");
  lName.addEventListener("keyup", checkLastName);
  console.log(lName, "click");
  address.addEventListener("keyup", checkAddress);
  console.log(address);
  city.addEventListener("keyup", checkCity);
  console.log(city);
  email.addEventListener("keyup", checkEmail);
  console.log(email);
  orderBttn.addEventListener("click", (event) => {
    submitForProducts(event);
  });
  console.log(orderBttn);
}

// ----------------------------------
// Create a Functions to handle errors

function checkFirstName() {
  if (fNameRegex.test(fName.value)) {
    fName.style.border = "solid green";
    firstNameIsValid = true;
  } else {
    fName.style.border = "solid red";
    firstNameIsValid = false;
  }
}
function checkLastName() {
  if (lNameRegex.test(lName.value)) {
    lName.style.border = "solid green";
    lastNameisValid = true;
  } else {
    lName.style.border = "solid red";
    lastNameisValid = false;
  }
}
function checkAddress() {
  if (addressRegex.test(address.value)) {
    address.style.border = "solid green";
    addressIsValid = true;
  } else {
    address.style.border = "solid red";
    addressIsValid = false;
  }
}
function checkCity() {
  if (cityRegex.test(city.value)) {
    city.style.border = "solid green";
    cityIsValid = true;
  } else {
    city.style.border = "solid red";
    cityIsValid = false;
  }
}
function checkEmail() {
  if (emailRegex.test(email.value)) {
    email.style.border = "solid green";
    emailIsValid = true;
  } else {
    email.style.border = "solid red";
    emailIsValid = false;
  }
}

// ----------------------------------
// A function with event listener to submit the order button
function submitForProducts() {
  event.preventDefault();
  // Build the object
  const objBuildForForm = {
    contact: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      email: "",
    },
    // get the id's in the cartArray and insert them into products
    products: [],
  };
  for (let i = 0; i < cartArray.length; i++) {
    objBuildForForm.products.push(cartArray[i].id);
  }
  console.log(fName, fName.value);
  // get the information out of the input fields from the form
  objBuildForForm.contact.firstName = fName.value;
  objBuildForForm.contact.lastName = lName.value;
  objBuildForForm.contact.address = address.value;
  objBuildForForm.contact.city = city.value;
  objBuildForForm.contact.email = email.value;
  console.log(objBuildForForm);

  fetch(orderUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objBuildForForm),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let thatPage = new URL(
        "http://127.0.0.1:5501/project5/P5-Web-Dev-Kanap-master/front/html/confirmation.html"
      );
      thatPage.searchParams.append("orderId", JSON.stringify(data.orderId));
      window.location.href = thatPage.href;
    })
    .catch((error) => console.error(error))
    .catch((error) => console.log(error));

  console.log(thatPage.href, window.location.href);
}
// TODO: Write a conditional statement to validate products to send
// we have an orderId generating for the user after clicking the commander - orderBttn can find the orderID ctrlClick
// we need to redirect the order ID with url search params and update it to the confirmation page.
// ----------------------------------
