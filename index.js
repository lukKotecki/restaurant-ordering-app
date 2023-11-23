import { menuArray } from "/data.js"

let orderList = [];
orderList = menuArray.map(el => {return {...el}})
orderList[0].name='fgg'

//let clonedArray = JSON.parse(JSON.stringify(nodesArray))


renderMenu(menuArray)
renderOrder(menuArray)
renderTotalPrice(menuArray)


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
            console.log("kliknieto "+element.name)
        })
        listItem.append(buttonAdd)

        menuList.append(listItem);
    });

}

function renderOrder(orders){
    const summaryList = document.getElementById('summary-list')

    orders.forEach(element => {
        const orderItem = document.createElement('li')
        orderItem.classList.add('summary-item')
        orderItem.innerHTML = `<h5>${element.name}</h5>`
        const removeBtn = document.createElement('button')
        removeBtn.textContent = 'remove'
        removeBtn.addEventListener('click',function(){
            console.log("tu bede usowac "+element.name)
        })
        orderItem.append(removeBtn)
        const divPriceElement = document.createElement('div')
        divPriceElement.classList.add('summary-item-price')
        divPriceElement.textContent = '$'+element.price
        orderItem.append(divPriceElement)
        summaryList.append(orderItem)
    })

}

function renderTotalPrice(orders){
    let sum = 0;
    orders.forEach(order => sum+= order.price)
    document.getElementById('summary-total-price').textContent = '$ '+sum
}

console.log(orderList)
console.log()

