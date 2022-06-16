const addTaskBtn = document.getElementById('add-task-btn');
const descTaskInput = document.getElementById('description-task');
const todosWrapper = document.querySelector('.todos-wrapper');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let elements = [];

function Task(description) {    
    this.description = description;
    this.completed = false;
}

const createTemplate = (task, index) => {           //Создание шаблона таска
    return `
    <div class="todo-item ${task.completed ? 'checked' : ''}">
            <div class="description">${task.description}</div>
            <div class="buttons">
                    <input onclick="taskToggle(${index})" class="btn-toggle" type="checkbox" ${task.completed ? 'checked' : ''}>
                    <button onclick="deleteTask(${index})" class="btn-delete">Удалить</button>     
            </div>
    </div>
    `
}

const fillHtmlList = () => {
    todosWrapper.innerHTML = "";
    if (tasks.length > 0) {
        tasks.forEach((item, index) => {
            todosWrapper.innerHTML += createTemplate(item, index);
        });
        elements = document.querySelectorAll('.todo-item');
    }
}

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const taskToggle = index => {     
    tasks[index].completed = !tasks[index].completed //Меняю на противоположное значение
    if(tasks[index].completed) {
        elements[index].classList.add('checked');             
    } else {
        elements[index].classList.remove('checked');
    }
    updateLocal();
    fillHtmlList();
}


addTaskBtn.addEventListener('click', () => {
    if(!descTaskInput.value) {
        return;
    }; 
    tasks.push(new Task(descTaskInput.value));
    updateLocal();
    fillHtmlList();
    descTaskInput.value = '';
})

const deleteTask = index => {
    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();    
}