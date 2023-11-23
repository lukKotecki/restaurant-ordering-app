import { menuArray } from "/data.js"

const summary = document.getElementById('summary');
let orderList = [];
let todaysOrders = 0;
//
//orderList = menuArray.map(el => {return {...el}})
//let clonedArray = JSON.parse(JSON.stringify(nodesArray))


renderMenu(menuArray)


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
    const summaryList = document.getElementById('summary-list')
    summaryList.innerHTML = ''

    orders.forEach(element => {
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
    renderTotalPrice(orders)
}

function renderTotalPrice(orders){
    let sum = 0;
    orders.forEach(order => sum+= order.price)
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


console.log()
console.log()

