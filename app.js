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
    taskForm.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filterInput.addEventListener('keyup', filterTask);
    document.addEventListener('DOMContentLoaded', loadTasks)
}

//load tasks from local storage function

function loadTasks(e) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {
    //create li element
    const li = document.createElement('li');
    li.className = 'task_list-item';
    li.appendChild(document.createTextNode(task));
    
    //create link
    const link = document.createElement('a');
    link.className = 'remove_btn';
    link.innerHTML = '<i class="fa fa-remove delete_btn"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
    });
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
    li.appendChild(link);
    taskList.appendChild(li);

    //to local storage
    storeInLocalStorage(taskInput.value);
    }

    //to clear input
    taskInput.value = '';

    e.preventDefault();
}

// store in local storage function

function storeInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

//remove task function 
function removeTask (e) {
    if (e.target.parentElement.classList.contains('remove_btn')) {
        if (confirm('Are you sure')) {
            e.target.parentElement.parentElement.remove();
        }
    }

    removeFromLocalStorage(e.target.parentElement.parentElement);
}

function removeFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach( function (task, index) {
            if (task === taskItem.textContent) {
                tasks.splice(index, 1);
            }
        });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks (e) {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    clearFromLocalStorage();
}

function clearFromLocalStorage(task) {
    localStorage.clear('tasks')
}

function filterTask (e) {
    var text = e.target.value.toLowerCase();
    document.querySelectorAll('.task_list-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    });

}