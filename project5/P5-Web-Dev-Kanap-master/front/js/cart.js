const priceObj = {};
let cartArray = JSON.parse(localStorage.getItem("cartArray")) || [];
console.log(cartArray);
// you can use your old variable baseUrl instead of creating a new variable called urlProducts
const baseUrl = `http://localhost:3000/api/products/`;
console.log(baseUrl);

// creates an empty object to insert details in later to add price and quantity
const cartObj = {
  imgUrl: "",
  altTxt: "",
  name: "",
  color: "",
  price: cartArray && priceObj,
};

console.log(cartObj);

fetch(baseUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    makeCartProducts(data);

    currentPriceObj(cartObj);
  })
  .then(() => {
    createCartItem(cartArray);
  });
function createCartItem() {}
function currentPriceObj(cartObj) {
  // for (let i = 0; i < cartArray.length; i++) {
  //   let cartPrice = priceObj;
  //   cartPrice.price = [cartArray[i]._id] = cartArray[i].price;
  //   console.log(priceObj);
  // }
}
function makeCartProducts() {
  for (let i = 0; i < cartArray.length; i++) {
    console.log(cartArray[i]);

    let html = `
      <article class="cart__item" data-id={product-ID} data-color="{product-color}">
      <div class="cart__item__img">
      <img src=${cartArray[i].imgUrl} alt=${cartArray[i].altTxt}>
      </div>
      <div class="cart__item__content">
      <div class="cart__item__content__description">
          <h2>${cartArray[i].name}</h2>
          <p>${cartArray[i].color}</p>
          <p>${cartArray[i].price * cartArray[i].quantity}</p>
      </div>
      <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
          <p>Qté :</p>
          <input type="number" onchange = "updateQtty()" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
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
function updateQtty() {
  console.log("hi");

  cartItem.innerHTML = "";
  makeCartProducts();
}
// class names and Id's in variables
const qtty = document.getElementsByClassName("totalQuantity");
const cartItem = document.getElementById("cart__items");
const totalPrice = document.getElementById("totalPrice");
const deleteItem = document.getElementsByClassName("deleteItem");
// selects last child element p???
const currentProductPrice = document.getElementsByClassName(
  "cart__item__content__description"
).lastChild;
// console.log(currentProductPrice);

// testing out appendChild to insert an element into the HTML p element class for price
// append price to inner and assign variable to change innertxt

// run a for loop to update the current price and total price
// function currentNtotalPrice() {
//   if (totalPrice === currentProductPrice) {
//   } else "";
// }
// console.log(currentNtotalPrice);
