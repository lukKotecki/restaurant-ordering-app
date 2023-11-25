import { menuArray } from "/data.js"

const summary = document.getElementById('summary');
const formContainer = document.getElementById('form-container');
const form = document.getElementById('form')
const completeOrderButton = document.getElementById('complete-order-button')
const rateUsBtn = document.getElementById('rate-us-btn')
const ratingStars = [...document.getElementsByClassName('fa-regular')]
const starsContainer = document.getElementById('stars-container')

const container = document.getElementById('container')
let orderList = [];
let todaysOrders = 0;
let rate = 0;
//
//orderList = menuArray.map(el => {return {...el}})
//let clonedArray = JSON.parse(JSON.stringify(nodesArray))

renderMenu(menuArray)
generateRatings(ratingStars)

completeOrderButton.addEventListener('click',function(){
    formContainer.style.display = 'inline'
})

function renderMenu(dataToRender){
    const menuList = document.getElementById('menu-list');

    dataToRender.forEach(element => {
        const listItem = document.createElement('li');
        listItem.classList.add("menu-item")
        listItem.innerHTML =`
            <div class="menu-icon">${element.emoji}</div>
            <div class="menu-info">
                <h4>${element.name}</h4>
                <p>${element.ingredients.map(el => el).join(', ')}</p>
                <h5>$${element.price}</h5>
            </div>
        `
        const buttonAdd = document.createElement('button')
        buttonAdd.classList.add('menu-add')
        buttonAdd.textContent = '+'
        buttonAdd.addEventListener('click',function(){
            addElementToOrderList(element)
        })
        listItem.append(buttonAdd)
        menuList.append(listItem);
    });

}

function renderOrder(orders){

    let discount=0;
    let tookDrink = false;
    let tookFood = false;
    document.getElementById('thanks-message').style.display = 'none'
    starsContainer.style.display = 'none'
    const summaryList = document.getElementById('summary-list')
    summaryList.innerHTML = ''

    orders.forEach(element => {
        if(element.name === "Pizza" || element.name === "Hamburger"){
            tookFood = true;
        }
        if(element.name === "Beer"){
            tookDrink = true;
        }

        const orderItem = document.createElement('li')
        orderItem.classList.add('summary-item')
        orderItem.innerHTML = `<h5>${element.name}</h5>`
        const removeBtn = document.createElement('button')
        removeBtn.textContent = 'remove'
        removeBtn.addEventListener('click',function(){
            orderList = orderList.filter(function(el){
                return el.id !== element.id
            })
            renderOrder(orderList)

        })
        orderItem.append(removeBtn)
        const divPriceElement = document.createElement('div')
        divPriceElement.classList.add('summary-item-price')
        divPriceElement.textContent = '$'+element.price
        orderItem.append(divPriceElement)
        summaryList.append(orderItem)
    })
    if (tookDrink && tookFood){
        discount = 0.10
    }
    renderTotalPrice(orders,discount)
}

function renderTotalPrice(orders, discount = 0){
    let sum = 0;
    orders.forEach(order => sum+= order.price)
    sum *= (1-discount)
    sum = Math.round((sum + Number.EPSILON) * 100)/100
    document.getElementById('summary-total-price').textContent = '$ '+sum
    if(sum === 0){
        summary.style.display = 'none'
    }

}

function addElementToOrderList(order){
    let elementToAdd = {
        name: order.name,
        id: todaysOrders,
        price: order.price
    }
    orderList.push(elementToAdd)
    todaysOrders++
    renderOrder(orderList)
    summary.style.display = 'block'
}

form.addEventListener("submit",function(e){
    e.preventDefault()
    formContainer.style.display = 'none'
    orderList = [];
    renderOrder(orderList)
    const formData = new FormData(form) 
    showThanksMessage(formData.get('name'))
})

function showThanksMessage(name="You"){
    const thanksMessage = document.getElementById('thanks-message')
    let thanks =`Thanks, ${name}! Your order is on its way!`
    thanksMessage.textContent = thanks
    thanksMessage.style.display = 'block'
    starsContainer.style.display = 'block'
}

function generateRatings(stars){
    const starClassActive = 'fa-solid fa-star'
    const starClassInactive = 'fa-regular fa-star'
    const starLength = stars.length
    let i
    stars.map((star =>{
        star.addEventListener('click', ()=>{
            i = stars.indexOf(star)
            rate =0;
            if (star.className === starClassInactive){
                for(i; i>=0; i--){
                    stars[i].className = starClassActive
                }
            } else {
                for(++i;i<starLength; i++){
                    stars[i].className = starClassInactive
                }
            }
            stars.forEach( star =>{
                if(star.className === starClassActive){
                    rate++;
                }
            })
        })
    })) 
}

rateUsBtn.addEventListener('click',()=>{
    starsContainer.style.color = 'black'
    starsContainer.innerText = `Rate: ${rate} 
    Tank You`
})





