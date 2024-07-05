document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const prioritySelect = document.getElementById('priority');
    const submitTaskButton = document.getElementById('submit-task');
    const todoList = document.getElementById('todo-list');
    const doneList = document.getElementById('done-list');
    const deleteAllButton = document.getElementById('delete-all');
    const currentDateElement = document.getElementById('current-date');

    // Display current date and update every second
    function updateDate() {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const formattedDate = now.toLocaleDateString('en-US', options);
        currentDateElement.textContent = formattedDate;
    }

    setInterval(updateDate, 1000);
    updateDate(); // Initial call to set the date immediately

    // Load tasks from localStorage
    loadTasks();

    // Add new task
    submitTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        const priority = prioritySelect.value;
        const now = new Date();
        const dateTimeString = now.toLocaleString(); // Get date and time as a string

        if (taskText !== '') {
            const taskItem = createTaskElement(taskText, priority, dateTimeString);

            todoList.appendChild(taskItem); // Add task to todoList
            taskInput.value = ''; // Clear the input field after adding the task

            saveTasks();
        }
    });

    // Mark task as done or undone
    todoList.addEventListener('change', (event) => {
        if (event.target.classList.contains('mark-done')) {
            const taskItem = event.target.parentElement;
            taskItem.classList.toggle('done');
            if (taskItem.classList.contains('done')) {
                doneList.appendChild(taskItem); // Move task to doneList
            } else {
                todoList.appendChild(taskItem); // Move task back to todoList
            }

            saveTasks();
        }
    });

    // Delete all tasks
    deleteAllButton.addEventListener('click', () => {
        todoList.innerHTML = '';
        doneList.innerHTML = '';

        saveTasks();
    });

    // Save tasks to localStorage
    function saveTasks() {
        const todoTasks = [];
        const doneTasks = [];

        // Save tasks in todoList
        todoList.querySelectorAll('li').forEach(taskItem => {
            const taskContent = taskItem.querySelector('.task-content').textContent;
            const priority = taskItem.querySelector('.priority').textContent;
            const dateTimeString = taskItem.querySelector('.task-datetime').textContent.replace(' (Added: ', '').replace(')', '');
            todoTasks.push({ text: taskContent, priority, dateTime: dateTimeString });
        });

        // Save tasks in doneList
        doneList.querySelectorAll('li').forEach(taskItem => {
            const taskContent = taskItem.querySelector('.task-content').textContent;
            const priority = taskItem.querySelector('.priority').textContent;
            const dateTimeString = taskItem.querySelector('.task-datetime').textContent.replace(' (Added: ', '').replace(')', '');
            doneTasks.push({ text: taskContent, priority, dateTime: dateTimeString });
        });

        localStorage.setItem('todoTasks', JSON.stringify(todoTasks));
        localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
    }

    // Load tasks from localStorage
    function loadTasks() {
        const todoTasks = JSON.parse(localStorage.getItem('todoTasks')) || [];
        const doneTasks = JSON.parse(localStorage.getItem('doneTasks')) || [];

        todoTasks.forEach(task => {
            const taskItem = createTaskElement(task.text, task.priority, task.dateTime);

        // Check if task is overdue
        const now = new Date();
        const taskDateTime = new Date(task.dateTime);
        
        if (taskDateTime < now) {
            taskItem.classList.add('overdue');
        }

        todoList.appendChild(taskItem); // Add task to todoList
    });

        doneTasks.forEach(task => {
            const taskItem = createTaskElement(task.text, task.priority, task.dateTime);
        
            taskItem.classList.add('done'); // Mark task as done

            doneList.appendChild(taskItem); // Add task to doneList
    });
}

// Helper function to create task elements
function createTaskElement(text, priority, dateTimeString) {
    const taskItem = document.createElement('li');

    const taskContent = document.createElement('span');
    taskContent.textContent = text;
    taskContent.classList.add('task-content'); // Add class for identifying content

    const taskDateTime = document.createElement('span');
    taskDateTime.textContent = ` (Added: ${dateTimeString})`;
    taskDateTime.classList.add('task-datetime'); // Add class for identifying datetime

    const taskPriority = document.createElement('span');
    taskPriority.classList.add('priority', priority.toLowerCase());
    taskPriority.textContent = priority; // Set the priority text

    const markDone = document.createElement('input');
    markDone.type = 'checkbox';
    markDone.classList.add('mark-done');

    taskItem.appendChild(taskContent);
    taskItem.appendChild(taskPriority);
    taskItem.appendChild(taskDateTime);
    taskItem.appendChild(markDone);

    return taskItem;
}
});