let cartArray = JSON.parse(localStorage.getItem("cartArray")) || [];

console.log(cartArray);
// you can use your old variable baseUrl instead of creating a new variable called urlProducts
const baseUrl = `http://localhost:3000/api/products/`;
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
    totalCartProducts();
  })
  .then(() => {
    makeCartProducts(cartArray);
  })
  .then(() => {
    // another function to add event listeners
    addTheEventListener();
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
  console.log(color);
  console.log(id);
  console.log(parentElement);

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
  console.log(cartArray);
  makeCartProducts(cartArray);
  addTheEventListener();
  totalCartProducts();
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
  console.log(parentElement);
  makeCartProducts(cartArray);
  addTheEventListener();
  totalCartProducts();
  localStorage.setItem("cartArray", JSON.stringify(cartArray));
}
// ---------------------------------
// add Total price update on all products
const qtty = document.getElementById("totalQuantity");

function totalCartProducts() {
  let total = 0;
  console.log(Object.keys(priceObject));
  for (let i = 0; i < cartArray.length; i++) {
    console.log(cartArray[i].id);
    // console.log(priceObject[cartArray[i].id], cartArray[i].quantity);
    total += priceObject[cartArray[i].id] * cartArray[i].quantity;
  }
  qtty.innerText = total;
}

// ---------------------------------

// ---------------------------------
// Assign classes from HTML and insert them into variables to be used in javascript

const cartItem = document.getElementById("cart__items");

let currentProductPrice = document.getElementsByClassName(
  "cart__item__content__description"
);

console.log(currentProductPrice);

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
  console.log(itemQuantity, "click");
  console.log(deleteItem, "click");
}
// ---------------------------------
