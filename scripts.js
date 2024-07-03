document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const prioritySelect = document.getElementById('priority');
    const submitTaskButton = document.getElementById('submit-task');
    const todoList = document.getElementById('todo-list');
    const doneList = document.getElementById('done-list');
    const deleteAllButton = document.getElementById('delete-all');
    const currentDateElement = document.getElementById('current-date');

    // Display current date
    const today = new Date();
    const dateString = today.toDateString();
    currentDateElement.textContent = dateString;

    // Add new task
    submitTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        const priority = prioritySelect.value;

        if (taskText !== '') {
            const taskItem = document.createElement('li');
            const taskContent = document.createElement('span');
            taskContent.textContent = taskText;

            const taskPriority = document.createElement('span');
            taskPriority.classList.add('priority', priority);
            taskPriority.textContent = priority;

            const markDone = document.createElement('input');
            markDone.type = 'checkbox';
            markDone.classList.add('mark-done');

            taskItem.appendChild(taskContent);
            taskItem.appendChild(taskPriority);
            taskItem.appendChild(markDone);

            todoList.appendChild(taskItem);
            taskInput.value = ''; // Clear the input field after adding the task
        }
    });

    // Mark task as done
    todoList.addEventListener('change', (event) => {
        if (event.target.classList.contains('mark-done')) {
            const taskItem = event.target.parentElement;
            taskItem.classList.add('done');
            doneList.appendChild(taskItem);
        }
    });

    // Delete all tasks
    deleteAllButton.addEventListener('click', () => {
        todoList.innerHTML = '';
        doneList.innerHTML = '';
    });
});
