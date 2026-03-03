const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const completedBox = document.getElementById('completedBox');
const completedList = document.getElementById('completedList');

let editItem = null;

// Add or Update Task
addBtn.addEventListener('click', () => {
    const taskText = todoInput.value.trim();
    if (!taskText) return;

    // Update existing task
    if (editItem) {
        editItem.querySelector('span').textContent = taskText;
        editItem = null;
        addBtn.textContent = 'Add';
        todoInput.value = '';
        todoInput.focus();
        return;
    }

    // Create Active Task <li>
    const li = document.createElement('li');
    li.className = "flex items-center justify-between bg-gray-100 p-2 rounded";

    // Checkbox to mark complete
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = "mr-2 w-5 h-5";

    // Task text
    const span = document.createElement('span');
    span.textContent = taskText;
    span.className = "flex-1";

    // Update/Edit Button
    const updateBtn = document.createElement('button');
    updateBtn.textContent = '✎';
    updateBtn.className = "mr-2 text-yellow-500 font-bold";
    updateBtn.addEventListener('click', () => {
        todoInput.value = span.textContent;
        todoInput.focus();
        editItem = li;
        addBtn.textContent = 'Update';
    });

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✖';
    deleteBtn.className = "text-red-500 font-bold";
    deleteBtn.addEventListener('click', () => li.remove());

    // When checkbox is checked, move task to Completed
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            li.remove(); // Remove from active

            // Show Completed box
            completedBox.classList.remove('hidden');

            // Completed Task <li>
            const completedLi = document.createElement('li');
            completedLi.className = "flex items-center justify-between bg-green-100 p-2 rounded";

            const completedCheckbox = document.createElement('input');
            completedCheckbox.type = 'checkbox';
            completedCheckbox.checked = true;
            completedCheckbox.disabled = true; // Cannot uncheck
            completedCheckbox.className = "mr-2 w-5 h-5";

            const completedSpan = document.createElement('span');
            completedSpan.textContent = span.textContent;
            completedSpan.className = "flex-1 line-through text-gray-400";

            const completedDeleteBtn = document.createElement('button');
            completedDeleteBtn.textContent = '✖';
            completedDeleteBtn.className = "text-red-500 font-bold";
            completedDeleteBtn.addEventListener('click', () => {
                completedLi.remove();
                if (completedList.children.length === 0) {
                    completedBox.classList.add('hidden'); // Hide box if empty
                }
            });

            completedLi.appendChild(completedCheckbox);
            completedLi.appendChild(completedSpan);
            completedLi.appendChild(completedDeleteBtn);
            completedList.appendChild(completedLi);
        }
    });

    // Append elements to active task li
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(updateBtn);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    todoInput.value = '';
    todoInput.focus();
});

// Press Enter to add task
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addBtn.click();
});