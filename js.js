// To Add new ToDo item
window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];

    // To add new todo list
	const newTodoForm = document.querySelector('#new-todo-form');
	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();
		const todo = {
			content: e.target.elements.content.value
		}
		todos.push(todo);
		localStorage.setItem('todos', JSON.stringify(todos));

		// Reset the form
		e.target.reset();

		DisplayTodos();
	})

	DisplayTodos();
})

// Todo item content body
function DisplayTodos () {
	const todoList = document.querySelector('#todo-list');
	todoList.innerHTML = "";

	todos.forEach(todo => {

        // Main section
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');
        todoItem.classList.add('p-16');
        todoItem.classList.add('mt-5');

        // Horizontal line
        const bottomLine = document.createElement('hr');
        bottomLine.classList.add('hr');

        // Check box area
		const label = document.createElement('label');
        label.classList.add('mt-1');
		const input = document.createElement('input');
		const span = document.createElement('span');
		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');

        // Content area
		const content = document.createElement('div');
		content.classList.add('todo-content');

        // Action area
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

        // Actions
		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

        // Append check box to label
		label.appendChild(input);
		label.appendChild(span);

        // Append check box to label
		actions.appendChild(edit);
		actions.appendChild(deleteButton);

        // Append all area to main section
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);


        todoList.appendChild(bottomLine);

        todoList.appendChild(todoItem);

		if (todo.done) {
			todoItem.classList.add('done');
		}

        // For check box to cross out if todo is done
		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}

			DisplayTodos()
		})

        // For edit button
		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()

			})
		})

        // For delete button
		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})

	})
}