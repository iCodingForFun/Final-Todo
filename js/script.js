

// seleccionando todo
// seleccionando todo-form
const todoForm = document.querySelector('.todo-form');
// seleccionando input box
const todoInput = document.querySelector('.todo-input');
// seleccionando <ul> con class="todo-items"
const todoItemsList = document.querySelector('.todo-items');

// array que almacena cada todo
let todos = [];

// añadiendo eventListener en form, y listen para submittear evento
todoForm.addEventListener('submit', function(event) {
  // evita que la página se vuelva a cargar al enviar el formulario
  event.preventDefault();
  addTodo(todoInput.value); // llama a la función addTodo con input box del valor actual
});

// function para añadir todo
function addTodo(item) {
  // if item no está vacío
  if (item !== '') {
    // hace un todo object, tiene id, name, y añadí una ''propiedad completada''
    const todo = {
      id: Date.now(),
      name: item,
      completed: false
    };

    // luego los añade a todos array
    todos.push(todo);
    addToLocalStorage(todos); // luego lo storea en localStorage

    // finalmente limpia el valor de input box 
    todoInput.value = '';
  }
}

// function para renderizar todos a la pantalla
function renderTodos(todos) {
  // limpia cada contenido de <ul> con la class=todo-items
  todoItemsList.innerHTML = '';

  // para recorrer cada item dentro de todos
  todos.forEach(function(item) {
    // checkea si el item está completed
    const checked = item.completed ? 'checked': null;

    // hace un <li> elemento y lo llena
    // <li> </li>
    const li = document.createElement('li');
    // <li class="item"> </li>
    li.setAttribute('class', 'item');
    // <li class="item" data-key="20200708"> </li>
    li.setAttribute('data-key', item.id);
    /* <li class="item" data-key="20200708"> 
          <input type="checkbox" class="checkbox">
          Go to Gym
          <button class="delete-button">X</button>
        </li> */
    // if el item está completado, luego añade una class a <li> llamada 'checked', que agregará el style line-through 
    if (item.completed === true) {
      li.classList.add('checked');
    }

    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete-button">X</button>
    `;
    // finalmente añade el <li> al <ul>
    todoItemsList.append(li);
  });

}

// function para añadir todos al local storage
function addToLocalStorage(todos) {
  // convierte el array a string luego lo storea
  localStorage.setItem('todos', JSON.stringify(todos));
  // los renderiza a la pantalla
  renderTodos(todos);
}

// function ayuda a obtener todo desde local storage
function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');
  // if la referencia existe
  if (reference) {
    // convierte de vuelta en array y lo storea el array todos 
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}

// toggleamos el valor para completed y no completed
function toggle(id) {
  todos.forEach(function(item) {
    // uso == y no ===, porque aquí los tipos son diferentes. Uno es un número y el otro es un string
    if (item.id == id) {
      // toggleamos el valor 
      item.completed = !item.completed;
    }
  });

  addToLocalStorage(todos);
}

// elminiamos todo desde el array todos, luego actualizamos localstorage y renderizamos la lista actualizada a la pantalla
function deleteTodo(id) {
  //filtro fuera del <li> con el id y actualiza el array todos
  todos = todos.filter(function(item) {
    // uso != y no !==, porque aquí los tipos son diferentes. Uno es un número y el otro es un string
    return item.id != id;
  });

  // actualizamos el localStorage
  addToLocalStorage(todos);
}

// inicialmente obtenemos todo desde el localStorage
getFromLocalStorage();

// despues del addEventListener <ul> con class=todoItems. Porque necesitamos listen para click cada event en todos los delete-button y checkbox
todoItemsList.addEventListener('click', function(event) {
  // para chequear si el evento está en checkbox
  if (event.target.type === 'checkbox') {
    // toggleamos el estado
    toggle(event.target.parentElement.getAttribute('data-key'));
  }

  // chequeamos si es un delete-button
  if (event.target.classList.contains('delete-button')) {
    // obtenemos el valor desde data-key del atributo de value de los padres <li> donde el delete-button está presente
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }
});



$(".add-button").click(function(){
  alert("Tu actividad se añadió correctamente");
});

