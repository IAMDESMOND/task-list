//variables

const taskForm = document.querySelector('.task_form');
const taskInput = document.querySelector('#task');
const addBtn = document.querySelector('.add_btn');
const taskList = document.querySelector('.task_list');
const filterInput = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear_btn');

// load all eventlistener

loadAllEventlisteners();

function loadAllEventlisteners () {
    taskForm.addEventListener('submit', addTask)
}

//add task function

function addTask (e) {
    if (taskInput.value === '') {
        alert('Add a task');
    }else{
    //create li element
    const li = document.createElement('li');
    li.className = 'task_list-item';
    li.appendChild(document.createTextNode(taskInput.value));
    
    //create link
    const link = document.createElement('a');
    link.className = 'remove_btn';
    link.innerHTML = '<i class="fa fa-remove delete_btn"></i>';
    li.appendChild(link)
    taskList.appendChild(li);
    taskInput.value = '';
    }
    e.preventDefault();
}