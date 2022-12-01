//DOM SELECTION
const formElm = document.querySelector('.formItem')
const inputElm = document.querySelector('.inputVal')
const itemListElm = document.querySelector('.item-list')
const clearBtn = document.querySelector('.clearList')
const msgElm = document.querySelector('.showMsg')
let todoItem = []


// const setEditTextColor = () => {
//     const color = itemListElm.querySelector('.editText')
//         color.classList('editText', 'bg-warning')
    

// }

//handle item
const handleItem = (inputVal) => {
    const items = itemListElm.querySelectorAll('.item')

    items.forEach((item) => {
        if(item.querySelector('.itemName').textContent === inputVal) {
            //complete event listener
            item.querySelector('.completeItem').addEventListener('click', () => {
                item.querySelector('.itemName').classList.toggle('completed')
                this.classList.toggle('visibility')
            });
            //edit event listener
            item.querySelector('.editItem').addEventListener('click', () =>{
                inputElm.value = inputVal
                // itemListElm.removeChild(item)
                // setEditTextColor()

                todoItem = todoItem.filter((item) => {
                    return item !== inputVal
                })
            });
            //delete event listener
            item.querySelector('.deleteItem').addEventListener('click', () => {
                itemListElm.removeChild(item)

                todoItem = todoItem.filter((item) => {
                    return item !== inputVal
                })
                showMessage('Delete successfully')
            })
        }
    })
}


//get item list
const getList = (todoItem) => {
    itemListElm.innerHTML = '';
    
    todoItem.forEach((item) => {
        itemListElm.insertAdjacentHTML('beforeend',
        `<div class="item my-3 p-2 bg-info d-flex justify-content-between rounded">
                <h5 class="itemName editText">${item}</h5>
            <div class="itemIcons fs-5">
                <a class="completeItem mx-2 item-icon">
                    <i class="far fa-check-circle"></i>
                </a>
                <a class="editItem mx-2 item-icon">
                    <i class="far fa-edit"></i>
                </a>
                <a class="deleteItem item-icon">
                    <i class="far fa-times-circle"></i>
                </a>
            </div>
        </div>`
        )
        handleItem(item)
    })
    
}

//get local storage
const getLocalStorage = () => {
    const todoStorage = localStorage.getItem('todoItem')
    if(todoStorage === 'undefined' || todoStorage === null) {
        todoItem = []
    }else {
        todoItem = JSON.parse(todoStorage)
        getList(todoItem)
    }
}

//set storage
const setLocalStorage = (todoItem) => {
    localStorage.setItem('todoItem', JSON.stringify(todoItem))
}
getLocalStorage()

//show warning message
function showMessage(msg) {
    const elm = `<div class='alert alert-danger message'>${msg}</div>`
    msgElm.insertAdjacentHTML('afterbegin', elm)
    setTimeout(() => {
        msgElm.textContent = ''
    }, 2000)
}
//add an item to list
formElm.addEventListener('submit', (evt) => {
    evt.preventDefault()

    const inputVal = inputElm.value
    // console.log(inputVal);
    if(inputVal.length === 0) {
        showMessage('Please fill the value')
    }else {
        todoItem.push(inputVal)
        getList(todoItem)
        setLocalStorage(todoItem)
    }
    inputElm.value = ''
})

clearBtn.addEventListener('click', () => {
    todoItem = []
    localStorage.clear()
    getList(todoItem)
})