
// fa-arrow-up ---------------------------------

let toTop = document.querySelector('.fa-arrow-up')

window.addEventListener('scroll' , ()=> {
    
    if( scrollY >= 600 ){
        toTop.style.visibility = 'visible'
        toTop.style.opacity =  1
        toTop.style.transform = 'scale(1)'
    }else{
        toTop.style.visibility = 'hidden'
        toTop.style.opacity =  0
        toTop.style.transform = 'scale(0)'
    }

})


toTop.onclick = function(){
    window.scrollTo({
        top : 0 ,
        behavior : 'smooth'
    })
}


// fa-bars Menu for Navbar -----------------------------

let iconToggler = document.querySelector('.fa-bars')
let menuToggler = document.querySelector('nav ul')


// عشان اعرف في طول ال nav ul
console.log(menuToggler.offsetHeight);    

iconToggler.onclick = function(){
    this.classList.toggle('active')
    menuToggler.classList.toggle('open')
}


// The Cart of Products ----------------------------------

let cartItems = document.querySelector('.cart')
let openCart = document.querySelector('.fa-cart-shopping')
let closeCart = document.querySelector('.fa-circle-xmark')
let blurdiv = document.querySelector('.blurdiv')

function cartHandler(state){

    if (state === 'open') {
        cartItems.classList.add('active')
        blurdiv.classList.add('active')
    } else {
        cartItems.classList.remove('active')
        blurdiv.classList.remove('active')
    }

}

openCart.onclick = ()=> cartHandler('open')
closeCart.onclick = ()=> cartHandler('close')
blurdiv.onclick = ()=> cartHandler('close')


// The Products ---------------------------------------

const products = [
    {
        id:1 ,
        img:"./images/images/icone.png" ,
        name:"Fresh vagies",
        price:30.00,
        quantity : 1

    },
    {
        id:2 ,
        img:"./images/images/yogurt.png" ,
        name:"Yougurt",
        price:45,
        quantity: 1
    },
    {
        id:3 ,
        img:"./images/images/plate-1.png" ,
        name:"Summer Salad",
        price:28,
        quantity: 1

    },
    {
        id:4 ,
        img:"./images/images/plate-2.png" ,
        name:"Cottage dish",
        price:28,
        quantity: 1

    },
    {
        id:5 ,
        img:"./images/images/plate-3.png" ,
        name:"Greek Salad",
        price:50,
        quantity: 1

    },
    {
        id:6 ,
        img:"./images/images/salad-table.jpg" ,
        name:"Paradise dish",
        price:60,
        quantity: 1

    },
    {
        id:7 ,
        img:"./images/images/coffee.jpg" ,
        name:"Cheese cake",
        price:75,
        quantity: 1

    },
    {
        id:8 ,
        img:"./images/images/food-table.jpg" ,
        name:"Dinner Dish",
        price:72,
        quantity: 1

    },
    {
        id:9 ,
        img:"./images/images/jars.jpg" ,
        name:"Icecream Jars",
        price:80,
        quantity: 1

    },
    {
        id:10,
        img:"./images/images/cupcake.png" ,
        name:"Cupcake",
        price:100,
        quantity: 1

    },
]


let productContainer = document.querySelector('.product .proContainer')

document.addEventListener('DOMContentLoaded' , function(){
    let items = ''
    for(let i = 0 ; i < products.length ; i++){
        items += `
        <div class="card">
                <div>
                    <img src="${products[i].img}">
                </div>
                <div>
                    <b>${products[i].name}</b>
                    <p>$${products[i].price}</p>
                    <button onclick="addToCart(${i})">Add to cart</button>
                </div>
            </div>`            
    }
    productContainer.innerHTML = items
})


// Add to the Cart & Display Products -----------------------------------

let cartContainer = document.querySelector('.cart .cartContainer')

let cart 
let x = localStorage.getItem('hello')
if ( x ) {
    cart = JSON.parse(x)
}
else{
    cart = []
}


function addToCart(index){
   cart.push( products[index] )
 
   displayProducts()
   CheckedBox()
   blurdiv.classList.add('active')
}

function displayProducts(){
    let totalPrice = 0
    let productsIncart = cart.map( (value , index)=>{
        totalPrice += +value.price * value.quantity
        return`<div class="card">
                <img src="${value.img}">
                <div class="div1">
                    <b>${value.name}</b>
                    <p>$${value.price}</p>
                </div>
                <div class="div2">
                    <button onclick = 'plus(${index})'>+</button>
                    <span>${value.quantity}</span>
                    <button onclick = 'minus(${index})'>-</button>
                </div>
                <i class="fa-solid fa-trash"  onclick='deleteItems(${index})'></i>
            </div>`
 } ).join(' ')
    
    
    if( cart.length > 0 ){
       cartContainer.innerHTML = productsIncart
    }else{
        cartContainer.innerHTML = 'Your Cart Is Empty :( '
    }

   document.querySelector('.totallinCart').innerHTML = `$${totalPrice.toFixed(2)}`

    localStorage.setItem('hello' , JSON.stringify(cart))

}
displayProducts()

// The Checked Box ------------------------------------

function CheckedBox(){
   let checkBox = document.createElement('div')
   checkBox.className = 'checked'
   
    let i = document.createElement('i')
    i.className = 'fa-solid fa-check-double'

   let span = document.createElement('span')
    span.innerHTML = `Product Added Successfully!`

    let button = document.createElement('button')
    button.innerText = 'Open The Cart'

    checkBox.appendChild( i )
    checkBox.appendChild( span )
    checkBox.appendChild( button )

    document.body.appendChild( checkBox )

   let x = setTimeout(() => {
        checkBox.classList.add('close')
        blurdiv.classList.remove('active')

    }, 2000);

     checkBox.addEventListener('mouseenter' , function(){
        clearTimeout( x )
        checkBox.classList.remove('close')
        blurdiv.classList.add('active')
    })

    checkBox.addEventListener('mouseleave' , function(){
        checkBox.classList.add('close')
        blurdiv.classList.remove('active')
    })

    button.onclick = function(){
        cartItems.classList.add('active')
    }

}

// Delete Items From The Cart ------------------------------

function deleteItems(index){
    let x = window.confirm( 'Are You Sure To Delete ?' )
    if( x ){
        cart.splice( index , 1 )
        displayProducts()
    }

}

// Plus & Minus -------------------------------

function plus(index){
    cart[index].quantity++
    displayProducts()
}
function minus(index){
     if ( cart[index].quantity > 1) {
            cart[index].quantity--
    } else {
        cart.splice(index, 1) 
    }
    displayProducts()
}