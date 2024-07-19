const resNav = document.querySelector(".res-nav");
const nav = document.querySelector(".nav")
const rem = document.querySelectorAll(".close")
const showimg = document.querySelector(".main-img")
const showthunimg = document.querySelectorAll(".main-thumbnails img")
const bg = document.querySelector(".lightbox");
const slider =  document.querySelector(".show-img")
const next = document.querySelector(".next")
const prev = document.querySelector(".prev")
const plus = document.querySelector(".plus")
const num = document.querySelector(".num")
const min = document.querySelector(".min")


resNav.addEventListener("click",() => {
  nav.classList.add("active")
})


rem.forEach((e) => {
  e.onclick = function(){
    e.parentElement.classList.remove("active")
  }
})


window.addEventListener('click', (e) => {
  if (e.target.classList.contains('showslider') || e.target.classList.contains('th')) {
    bg.classList.add("active")
    slider.classList.add("active")
  }
});

document.querySelector(".main-close").addEventListener("click",() => {
  document.querySelector(".lightbox").classList.remove("active")
})



function imgslider() {
  var index = 0;
  var src = [
    "image-product-1-thumbnail.jpg",
    "image-product-2-thumbnail.jpg",
    "image-product-3-thumbnail.jpg",
    "image-product-4-thumbnail.jpg"
  ];

  var img = document.querySelector(".main-img");
  var next = document.querySelector(".next"); // Ensure you have this element in your HTML
  var prev = document.querySelector(".prev"); // Ensure you have this element in your HTML

  function updateImage() {
    img.src = src[index];
  }

  next.addEventListener('click', function() {
    index = (index + 1) % src.length; // Wrap around the array
    updateImage();
  });

  prev.addEventListener('click', function() {
    index = (index - 1 + src.length) % src.length; // Handle negative index and wrap around
    updateImage();
  });

  // Set the initial image
  updateImage();
}

imgslider();



document.querySelectorAll(".thumbnails .up").forEach((e) => {
  e.onclick = function() {
    document.querySelector(".main-img").src = e.dataset.src;
  }
});



plus.addEventListener('click', function() {
  var numElement = document.querySelector(".num");
  var currentValue = parseInt(numElement.textContent, 10); // Get current value
  numElement.textContent = currentValue + 1; // Increment and update text content
});

min.addEventListener('click', function() {
  var numElement = document.querySelector(".num");
  var currentValue = parseInt(numElement.textContent, 10); 
  if (currentValue > 0) {
    numElement.textContent = currentValue - 1; 
  }
});



document.querySelector(".purchase .btn").onclick = function() {
  const ordersdiv = document.querySelector(".orders");

  const numvalue = document.querySelector(".num").textContent;
  const productprice = document.querySelector(".productPrice").textContent.trim();
  const productimg = document.querySelector(".showslider").src;
  const productname = "Fall Limited Edition Sneakers";
  const parsedprice = parseFloat(productprice.replace(/[^0-9.]/g, ''));
  const finalpricevalue = parseInt(numvalue) * parsedprice;

  const order = document.createElement("div");
  order.className = "order";

  const img = document.createElement("img");
  img.className = "img-thumbnail";
  img.src = productimg;

  const dataprice = document.createElement("div");
  dataprice.className = "data";
  dataprice.appendChild(document.createTextNode(productname));

  const price = document.createElement("div");
  price.className = "price";

  const divproductprice = document.createElement("p");
  divproductprice.appendChild(document.createTextNode(parsedprice));

  const countdiv = document.createElement("p");
  countdiv.className = "count";
  countdiv.appendChild(document.createTextNode(numvalue));

  const finalprice = document.createElement("p");
  finalprice.className = "final-price";
  finalprice.appendChild(document.createTextNode(finalpricevalue));

  price.appendChild(divproductprice);
  price.appendChild(countdiv);
  price.appendChild(finalprice);

  dataprice.appendChild(price);
  order.appendChild(img);
  order.appendChild(dataprice);

  const delButton = document.createElement("img");
  delButton.className = "del";
  delButton.src = "icon-delete.svg";
  delButton.onclick = function() {
    order.remove();
    removeFromSessionStorage(orderKey);
  };

  order.appendChild(delButton);
  ordersdiv.appendChild(order);

  const orderKey = `order-${Date.now()}`;
  addToSessionStorage(orderKey, {
    productimg,
    productname,
    parsedprice,
    numvalue,
    finalpricevalue
  });
};

function addToSessionStorage(key, order) {
  const orders = JSON.parse(sessionStorage.getItem('orders')) || {};
  orders[key] = order;
  sessionStorage.setItem('orders', JSON.stringify(orders));
}

function removeFromSessionStorage(key) {
  const orders = JSON.parse(sessionStorage.getItem('orders')) || {};
  delete orders[key];
  sessionStorage.setItem('orders', JSON.stringify(orders));
}

function loadOrdersFromSessionStorage() {
  const orders = JSON.parse(sessionStorage.getItem('orders')) || {};
  const ordersdiv = document.querySelector(".orders");
  
  Object.keys(orders).forEach(key => {
    const { productimg, productname, parsedprice, numvalue, finalpricevalue } = orders[key];

    const order = document.createElement("div");
    order.className = "order";

    const img = document.createElement("img");
    img.className = "img-thumbnail";
    img.src = productimg;

    const dataprice = document.createElement("div");
    dataprice.className = "data";
    dataprice.appendChild(document.createTextNode(productname));

    const price = document.createElement("div");
    price.className = "price";

    const divproductprice = document.createElement("p");
    divproductprice.appendChild(document.createTextNode(parsedprice));

    const countdiv = document.createElement("p");
    countdiv.className = "count";
    countdiv.appendChild(document.createTextNode(numvalue));

    const finalprice = document.createElement("p");
    finalprice.className = "final-price";
    finalprice.appendChild(document.createTextNode(finalpricevalue));

    price.appendChild(divproductprice);
    price.appendChild(countdiv);
    price.appendChild(finalprice);

    dataprice.appendChild(price);
    order.appendChild(img);
    order.appendChild(dataprice);

    const delButton = document.createElement("img");
    delButton.className = "del";
    delButton.src = "icon-delete.svg";
    delButton.onclick = function() {
      delButton.parentElement.remove()
      removeFromSessionStorage(key);
    };

    order.appendChild(delButton);
    ordersdiv.appendChild(order);
  });
}

window.onload = function() {
  loadOrdersFromSessionStorage();
};


document.querySelector(".icon-cart").onclick = function(){
  document.querySelector(".cart-value").classList.toggle("active")
}



const ordersString = sessionStorage.getItem('orders');
const ordersArray = ordersString ? JSON.parse(ordersString) : [];

if (ordersArray.length > 0) {
    document.querySelector(".button").classList.remove("active")
    document.querySelector(".empty").classList.add("active")
} else {
  document.querySelector(".button").classList.add("active")
  document.querySelector(".empty").classList.remove("active")
}
