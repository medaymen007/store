$(document).ready(function() {
    $(".owl-carousel").owlCarousel();
});
//var tod = document.getElementsByClassName("");


//for (var cntr = 0; cntr <= tod.length; ++cntr) {
//tod[cntr].innerHTML = "<a class='add_cart cart1'> Add To Panier </a>";
//}
//card
let carts = document.querySelectorAll('.add_cart');
let products = [{
    name: "farine",
    tag: "farine",
    price: 500,
    inCart: 0
}, {
    name: "katchap",
    tag: "katchap",
    price: 600,
    inCart: 0
}, {
    name: 'vin',
    tag: 'vin',
    price: 700,
    inCart: 0
}];
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.nav-item span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.nav-item span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.nav-item span').textContent = 1;
    }
    setItems(product);
}


function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');

    localStorage.setItem("totalCost", product.price);
    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else { localStorage.setItem("totalCost", product.price); }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
    <div class="productss">
    <ion-icon name="close-outline"></ion-icon>
    <img src="./image/${item.tag}.png">
    <span>${item.name}</span>
    </div>
    <div class="price">${item.price}</div>
    <div class="quantity">
    <ion-icon name="caret-back-outline"></ion-icon>
    <strong><span>${item.inCart}</span></strong>
    <ion-icon name="caret-forward-outline"></ion-icon>
    </div> <div class="total">
    dt ${item.inCart*item.price}
    </div>
        `
        });
        productContainer.innerHTML += `
        <div class="basketTotalContainer">
        <h4 class="basketTotalTitle">
        Basket Total :
        </h4>
        <h4 class="'basketTotal' ">
        dt ${cartCost}</h4>`;
    }
}
onLoadCartNumbers();
displayCart()