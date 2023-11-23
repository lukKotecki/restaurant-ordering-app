import { menuArray } from "/data.js"

let orderList = [];
orderList = menuArray
orderList[0].name='fgg'

//renderMenu(menuArray)
 
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

function renderOrder(orderList){


}

console.log(orderList)
console.log(menuArray)
