// uses URL search params to get the IDs of the unique product
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
console.log(id, params);

const dataUrl = `http://localhost:3000/api/products/${id}`;

let cartString = localStorage.getItem("cartArray");
console.log(cartString);

let cartArray;
if (cartString) {
  cartArray = JSON.parse(cartString);
} else {
  cartArray = [];
}

console.log("cart", cartArray);
// get the cart here

// creates a single product object and then initializes inside
const singleProduct = {
  imgUrl: "",
  altTxt: "",
  name: "",
  color: "",
  quantity: 1,
  id: "",
  price: 0,
};

fetch(dataUrl)
  .then((res) => res.json())
  .then((data) => {
    console.log(data, "dataObj");
    createCard(data);
    initSingleProduct(data);
    addEventListeners(data);
  })
  .catch((error) => console.log(error));

// color and qtty you get later
function initSingleProduct(dataObj) {
  singleProduct.imgUrl = dataObj.imageUrl;
  singleProduct.altTxt = dataObj.altTxt;
  singleProduct.name = dataObj.name;
  singleProduct.id = dataObj._id;
  singleProduct.price = dataObj.price;
}

function createCard(dataObj) {
  // declare variable and stash created elements inside

  const img = document.createElement("img");
  // console.log(img);
  // add alt txt and img , src on href tags
  img.setAttribute("src", dataObj.imageUrl);
  img.setAttribute("alt", dataObj.altTxt);

  // creates container to link elements into one

  const imgContainer = document.querySelector(".item__img");
  const title = document.getElementById("title");

  title.innerText = dataObj.name;
  // console.log({ imgContainer })
  imgContainer.appendChild(img);

  //SELECT OPTIONS
  options(dataObj.colors);

  // Description
  const description = document.getElementById("description");
  description.innerText = dataObj.description;

  // price
  const priceValue = document.getElementById("price");
  priceValue.innerText = dataObj.price;
}
// puts two html elements together colors and option
function options(colorArray) {
  const select = document.getElementById("colors");

  colorArray.forEach((color) => {
    const option = document.createElement("option");
    option.value = color;
    option.innerHTML = color;
    select.appendChild(option);
  });
}

// function updateQtty takes a single product and adds a click
function updateQtty(event) {
  //parse the string into an integer or number
  singleProduct.quantity = parseInt(event.target.value, 10);
  console.log(singleProduct);
}
function updateColor(event) {
  console.log(event.target.value);
  singleProduct.color = event.target.value;
  // console.log(singleProduct);
}
function addEventListeners() {
  const quantity = document.getElementById("quantity");
  const addToCartBtn = document.getElementById("addToCart");
  const select = document.getElementById("colors");

  quantity.addEventListener("change", updateQtty);
  addToCartBtn.addEventListener("click", addToCart);
  select.addEventListener("change", updateColor);
}

// addtocart creates

function addToCart() {
  // Looking at each item in the cart array.
  // Compares ID's to Single product ID
  // If id of single product is the same as any IDs of objects already in the cart array
  // returns the object in the array
  // returns undefined otherwise
  console.log("word");
  const product = cartArray.find(
    (p) => p.id === singleProduct.id && p.color === singleProduct.color
  );
  console.log({ product, singleProduct });

  // ! means not
  // if no product -- then push single product
  if (!product && singleProduct.color != "" && singleProduct.quantity > 0) {
    cartArray.push({ ...singleProduct });
    syncCart();
    return;
  }

  cartArray = cartArray.map((p) => {
    if (p.id === singleProduct.id && p.color === singleProduct.color) {
      return {
        ...p,
        quantity: p.quantity + singleProduct.quantity,
      };
    }
    return p;
  });
  syncCart();
}

function syncCart() {
  // sets local storage names it cartArray JSON.stringify
  localStorage.setItem("cartArray", JSON.stringify(cartArray));
  console.log(JSON.parse(localStorage.getItem("cartArray")));
  cartArray = JSON.parse(localStorage.getItem("cartArray"));
}
