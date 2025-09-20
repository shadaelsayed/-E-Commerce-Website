//    Sliders.Slick------------------------------

document.addEventListener('DOMContentLoaded' , function(){
   
    let sliders = document.querySelector('.sliders')

    $('.sliders').slick({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay : true ,
        autoplaySpeed : 1500 ,

        responsive :
        [{
            breakpoint : 1200 ,
            settings : {
                slidesToShow: 2 ,
                

            }
        } ,
        {
            breakpoint : 700 ,
            settings : {
                slidesToShow: 1 ,
                dots : true ,
                arrows : false ,
            }
        }
          
        ]
    })
})

// ---------------------------------------------------

// Sec Big Deals Of The Week [ Clock ]--------------------

let days = document.getElementById('days')
let hours = document.getElementById('hours')
let min = document.getElementById('min')
let sec = document.getElementById('sec')



setInterval(() => {
    let data = new Date()
            
        let h = data.toLocaleString('en' , {
            hour12 : true ,
            hour : 'numeric'
        })

        let d = data.toLocaleString('en' , {
            weekday : 'short'
        })

    days.innerHTML = `<span>${d}</span>
                    <p>Days</p>`

    hours.innerHTML = `<span>${h}</span>
                    <p>Hours</p>` 
                    
    min.innerHTML = `<span>${data.getMinutes()}</span>
                  <p>Minutes</p>`                
    
    sec.innerHTML = ` <span>${data.getSeconds()}</span>
                    <p>Seconds</p>`              
}, 1000);


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

