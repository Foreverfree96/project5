const idDiv = document.getElementById("orderId");

console.log("connected");
let urlSearchParams = new URLSearchParams(window.location.search);
let params = Object.fromEntries(urlSearchParams.entries());
console.log(params.orderId);
idDiv.innerText = params.orderId;
