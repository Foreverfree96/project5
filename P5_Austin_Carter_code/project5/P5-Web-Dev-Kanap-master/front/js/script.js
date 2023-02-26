// use fetch to retrieve data from the server
// fetch is syntactic sugar - sweet - wrapper around xmlHttpRequest
// fetch is promise-based

const baseUrl = "http://localhost:3000/api/products/";
fetch(baseUrl)
  .then((response) => response.json()) // implicit return
  .then((data) => {
    console.log(data);

    makeCards(data);
  })
  .catch((error) => console.log(error));

function makeCards(dataArray) {
  // whatever you pass into dataArray is used in its place
  // parameters are like variables
  const items = document.getElementById("items");

  for (let i = 0; i < dataArray.length; i++) {
    const card = makeCard(dataArray[i]);
    items.appendChild(card);
  }
}

function makeCard(dataObj) {
  // declare variable and stash created elements inside
  const link = document.createElement("a");
  const container = document.createElement("article");
  const img = document.createElement("img");
  const name = document.createElement("h3");
  const description = document.createElement("p");

  // add content
  name.innerHTML = dataObj.name;
  description.innerHTML = dataObj.description;

  // add classes
  name.classList.add("productName");
  description.classList.add("productDescription");

  const productUrl = "./product.html?id=" + dataObj._id;
  // set attributes for the  a tags

  link.setAttribute("href", productUrl);
  link.appendChild(description);

  // set attribute for the img tags

  const imageUrl = dataObj.imageUrl;
  img.setAttribute("src", imageUrl);
  link.appendChild(img);
  console.log(imageUrl);

  // return card here

  //how to get the right id into the link for each card
  // string concatenation - query parameters

  // put the elements inside the proper parent containers
  container.appendChild(img);
  container.appendChild(name);
  container.appendChild(description);

  // creates container to link elements into one
  link.appendChild(container);

  // return the link element
  console.log(link);
  return link;
}
