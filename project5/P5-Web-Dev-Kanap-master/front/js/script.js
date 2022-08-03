// use fetch to retrieve data from the server
// fetch is syntactic sugar - sweet - wrapper around xmlHttpRequest
// fetch is promise-based

const baseUrl = 'http://localhost:3000/api/products/';
fetch(baseUrl)
  .then((response) => response.json()) // implicit return
  .then((data) => {
    console.log(data);
    
    makeCards(data);
  });
  

function makeCards(dataArray) {
  // whatever you pass into dataArray is used in its place 
  // parameters are like variables
  const items = document.getElementById('items');
  
  for (let i = 0; i < dataArray.length; i++) {
    const card = makeCard(dataArray[i]);
    items.appendChild(card);
  }

}

function makeCard(dataObj) {
  // declare variable and stash created elements inside
  const link = document.createElement('a');
  const container = document.createElement('article');

  const img = document.createElement('img');
  const name = document.createElement('h3');
  const description = document.createElement('p');
  
  
  // add content
  name.innerHTML = dataObj.name;
  description.innerHTML = dataObj.description;

  // add classes
  name.classList.add('productName');
  description.classList.add('productDescription');

  const productURL = './product.html?id=' + dataObj._id;
  // set attributes for the  a tags
  link.setAttribute('href', productURL);
  link.appendChild(description);
  console.log('link');
  
  // // set attribute for the img tags
  const imageURL =  '/http://localhost:3000/images/'  + dataObj.imageURL;
  link.setAttribute('img', 'src',  imageURL);
  link.appendChild(img);
  console.log(img, 'imageURL');


  // return card here 
 
  //how to get the right id into the link for each card
  // string concatenation - query parameters

  // put the elements inside the proper parent containers
  container.appendChild(img);
  container.appendChild(name);
  container.appendChild(description);
  
  link.appendChild(container);

  // return the link element
  console.log(link);
  return link;
  

}

