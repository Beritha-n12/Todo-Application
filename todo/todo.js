document.addEventListener('DOMContentLoaded', function () {
    const newTaskForm = document.getElementById('new-task-form');
    const newTaskInput = document.getElementById('new-task-input');
    const todosContainer = document.getElementById('todos');
    const filterOptions = document.getElementById('filter-options');

    newTaskForm.addEventListener('submit', function (event) {
        event.preventDefault();

        if (newTaskInput.value.trim() !== "") {
            addTodo(newTaskInput.value.trim());
            newTaskInput.value = "";
        }
    });

    function addTodo(taskText) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        contentDiv.appendChild(checkbox);

        const taskInput = document.createElement('input');
        taskInput.type = 'text';
        taskInput.classList.add('text');
        taskInput.value = taskText;
        taskInput.readOnly = !taskInput.readOnly;
        contentDiv.appendChild(taskInput);


        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('actions');

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.textContent = 'Delete';
        actionsDiv.appendChild(deleteButton);

        todoDiv.appendChild(contentDiv);
        todoDiv.appendChild(actionsDiv);

        todosContainer.appendChild(todoDiv);

        // Add event listeners  delete button

        deleteButton.addEventListener('click', function () {
            deleteTodo(todoDiv);
        });
    }

    function deleteTodo(todoDiv) {
        todoDiv.remove();
    }
    

    filterOptions.addEventListener('click', function (event) {
        if (event.target.classList.contains('filters')) {
            const filter = event.target.textContent.toLowerCase();
            filterTodos(filter);
        }
    });

    function filterTodos(filter) {
        const allTodos = document.querySelectorAll('.todo');

        allTodos.forEach(function (todo) {
            switch (filter) {
                case 'all':
                    todo.style.display = 'flex';
                    break;
                case 'completed':
                    const checkbox = todo.querySelector('input[type="checkbox"]');
                    if (checkbox.checked) {
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = 'none';
                    }
                    break;
                case 'pending':
                    const checkboxPending = todo.querySelector('input[type="checkbox"]');
                    if (!checkboxPending.checked) {
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = 'none';
                    }
                    break;
                default:
                    break;
            }
        });
    }
});

