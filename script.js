
const longLink = document.querySelector(".longLink")
const inputUrl = longLink.children[1]
const submit = longLink.children[2]
const shortUrl = document.querySelector(".shortLink")
const result = shortUrl.children[1]
const copy = document.querySelector("#copy")
const message = document.querySelector("#message")
const clear = document.querySelector("#clear")
const empty = document.querySelector("#empty");
const historyButton = document.querySelector("#historyButton")
const history = document.querySelector(".history")
const ul = document.querySelector("#lists")

createUrl = (url) =>{
    result.innerText = url
}


submit.addEventListener('click',()=>{
    const getUrl = inputUrl.value;

    if(getUrl == ''){
        inputUrl.classList.add("error")
        empty.innerText = '*empty'
        setTimeout(() => {
            empty.innerText = ''
            inputUrl.classList.remove('error')
        }, 2000);
    }else{
        fetch('https://url-shortner10.p.rapidapi.com/lits.rocks/', {
        method: 'POST',
        body: JSON.stringify({
            url: getUrl,
        }),
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '5145d62dd6msh4e9ee53174955e6p1b2309jsn33fc2c2d9817',
            'X-RapidAPI-Host': 'url-shortner10.p.rapidapi.com'
        },
        })
        .then((response) => response.json())
        .then((data) => createUrl(data.shortUrl));

    }
    

})

createTodo = (todo)=>{
    let todoElement = document.createElement("li");
    todoElement.classList.add('lists')
    todoElement.id = todo[0];

    todoElement.innerHTML = `
        <span> ${todo[1]} </span>
        <span > <button class="btn"  id="deleteButton"> <i class="fa-solid fa-trash"></i> </button> </span>
    `;
    ul.appendChild(todoElement)
    const deleteButton = todoElement.querySelector("#deleteButton")
    deleteButton.addEventListener('click',deleteTodo)
}


const getTodosFromLocalStorage = () =>{
    return localStorage.getItem("myTodos") ? JSON.parse(localStorage.getItem("myTodos")) : [];
}

deleteTodo = (event) =>{
    
    const selectedTodo = event.target.parentElement.parentElement.parentElement
    ul.removeChild(selectedTodo);
    console.log(selectedTodo.id)
    let localTodo = getTodosFromLocalStorage();
    localTodo = localTodo.filter((todo) => todo[0] != selectedTodo.id);
    console.log(localTodo)
    localStorage.setItem("myTodos", JSON.stringify(localTodo));
    
}

copy.addEventListener('click',()=>{

   let copyText =  result.innerText
   if(copyText == ""){
        message.innerText = '*empty'
        setTimeout(() => {
            message.innerText = ''
        }, 2000);
   }else{
        message.innerText = '*copied'
            setTimeout(() => {
                message.innerText = ''
         }, 2000);
        // Copy the text inside the text field
        navigator.clipboard.writeText(copyText);

        let todoId =  Date.now().toString();
        let todoValue = copyText
        let newTodo = [todoId,todoValue]
        createTodo(newTodo)
        let todos = getTodosFromLocalStorage();
        todos.push(newTodo)  
        localStorage.setItem('myTodos',JSON.stringify(todos))
   }
   
})

loadTodo = () =>{
    let allTodo =  getTodosFromLocalStorage();
    allTodo.map((todo)=> createTodo(todo))
}

clear.addEventListener('click',()=>{
    inputUrl.value = '';
    result.innerText = '';
})
let historyDisplay = false
historyButton.addEventListener('click',()=>{
    
    if(historyDisplay == false){
        history.style.visibility = 'visible';
        historyDisplay = true;
    }else{
        history.style.visibility = 'hidden';
        historyDisplay = false
    }
})
 
window.addEventListener("DOMContentLoaded",loadTodo)



 