const menuArray = [
    {
        id: 0,
        quantity:0,
        name: "Chicken Tandoori",
        ingredients: ["Smokey", "Grilled", "Tandoori"],
        price: 800,
        description:"Smokey Grilled Chicken Tandoori With Indian Spices.",
        img: "./images/chicken.jpg",
        orderBooked : false
    },
    {
        id: 1,
        quantity:0,
        name: "Chicken Biryani",
        ingredients: ["Dum Biryani", "Special Mint Raita", "Juicy Chicken"],
        price: 450,
        description:"Dum cooked fresh Handi Biryani. Using highest quality ingredients & authentic recipes.",
        img: "./images/chicken-biryani.jpg",
        orderBooked : false
    },
    {
        id: 2,
        quantity:0,
        name: "Masala Dosa",
        ingredients: ["Dosa", "Special Mint Raita", "Sambar"],
        price: 200,
        description:"Dosas are served hot, often with chutney and sambar.",
        img: "./images/dosa.jpg",
        orderBooked : false
    }
]
const formDetails = document.getElementById('payment-form')
const orderSummaryArr = []
let priceTotal = 


formDetails.addEventListener('submit', function(e){
    e.preventDefault();

    const formDetailsData = new FormData(formDetails)
    const fullName = formDetailsData.get('fullName')
    console.log(fullName)

    document.getElementById('modal').style.display = 'none'
    setTimeout(function(){
        document.getElementById('customer-name').textContent = fullName
        document.getElementById('final-message modal').style.display = 'block'
        
    },1000)
})

document.addEventListener('click',function(event){
    if(event.target.dataset.increment){
        handleAddingOrder(event.target.dataset.increment)   
    } else if(event.target.dataset.decrement){
        handleRemovingOrders(event.target.dataset.decrement)
    } else if(event.target.id){
        handleBookingFood(event.target.id)
    }
})

function handleBookingFood(btnId){
    if(btnId === 'complete-order' && orderSummaryArr.length>0){
        document.getElementById('modal').style.display = 'block'
    }
}

function handleRemovingOrders(orderRemoveId){
    const targetOrderObj = menuArray.filter(function(menus){
        return menus.id === Number(orderRemoveId)
    })[0]
    
    const removeObj = orderSummaryArr.indexOf(targetOrderObj)
    
    delete orderSummaryArr[removeObj]
    renderOrder() 
}

function handleAddingOrder(oderAddId){
    const targetOrderObj = menuArray.filter(function(menus){
        return menus.id === Number(oderAddId)
    })[0]   

        if(targetOrderObj){
            console.log(targetOrderObj)
            orderSummaryArr.push(targetOrderObj)
            targetOrderObj.quantity++
        }
     
            renderOrder()
        
  
}

function renderOrder(){   
        let order = ``
        
        orderSummaryArr.forEach(function(orders){
            order += `
            <div class="order-item">
            <p>${orders.name}</p>
            <p id="quantity">X${orders.quantity}</p>
            <button class="remove-btn" data-decrement=${orders.id}>Remove</button>
            <p id="total">₹${orders.price}</p>   
        </div>    
    `
})
document.getElementById('order-item').innerHTML = order  
}

function getMenu(){
 let ingred = ``   
let menuHtml = ``
    menuArray.forEach(function(menu){
            ingred = menu.ingredients
            // console.log(ingred)
            menuHtml += `
            <div id="container">
            <img class="food-img" src="${menu.img}" alt="">
            <div class="food-container">
            <p class="dish-name">${menu.name}</p>
            <p class="ingrediants">${ingred[0]}, ${ingred[1]}, ${ingred[2]}</p>
            <span class="discount price">₹${menu.price}</span>
            <p class="Description">${menu.description}</p>
            </div>
            <div class="buy">

            <button class="btnBuy" data-increment=${menu.id}>+</button>
            </div>
            </div>
            `
            // <button class="btnBuy" data-decrement=${menu.id}>-</button>
        })
        document.getElementById('container-render').innerHTML = menuHtml
}

getMenu()