const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let todos = []; 
let todoCount = 0; 

function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadFromLocalStorage() {
  let savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
      todos = JSON.parse(savedTodos);
      render();
  }
}

function newTodo() {
    let name = prompt("Введіть назву завдання:");
    let description = prompt("Введіть опис завдання:");
    let status = "Нове"; 

    let newTask = {
        name: name,
        description: description,
        status: status
    };

    todos.push(newTask);
    render();
}

function renderTodo(todo) {
    let id = ++todoCount; 
    return `
        <li class="list-group-item">
            <input type="checkbox" class="form-check-input me-2" id="todo-${id}" ${todo.status === 'Виконане' ? 'checked' : ''} onchange="checkTodo('${todo.name}')">
            <label for="todo-${id}"><span class="${todo.status === 'Виконане' ? 'text-success text-decoration-line-through' : ''}">${todo.name}</span></label>
            <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo('${todo.name}')">delete</button>
        </li>
    `;
}

function render() {
    let listElement = document.getElementById('todo-list');
    listElement.innerHTML = todos.map(renderTodo).join('');
    updateCounter();
}

function updateCounter() {
    let totalTodos = todos.length;
    let unfinishedTodos = todos.filter(todo => todo.status !== 'Виконане').length;

    document.getElementById('item-count').innerText = totalTodos;
    document.getElementById('unchecked-count').innerText = unfinishedTodos;
}

function deleteTodo(todoName) {
    todos = todos.filter(todo => todo.name !== todoName);
    render();
}

function checkTodo(todoName) {
    let todo = todos.find(todo => todo.name === todoName);
    if (todo) {
        todo.status = todo.status === 'Виконане' ? 'Нове' : 'Виконане';
        render();
    }
}

window.onload = function() {
    render();
};
