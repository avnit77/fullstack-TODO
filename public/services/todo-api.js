const URL = '/api';

async function fetchWithError(url, options) {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data, 'data');
    console.log(options, 'options');

    if (response.ok) {
        return data;
    }
    else {
        throw data.error;

    }
}

export function getTodos() {
    const url = `${URL}/todos`;
    return fetchWithError(url);
}

export function addTodo(todo) {
    const url = `${URL}/todos`;
    return fetchWithError(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo)
    });
}

export function updateTodo(todo) {
    const url = `${URL}/todos/${todo.id}`;
    return fetchWithError(url, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(todo)
    });
}

export function removeTodo(todo) {
    const url = `${URL}/todos/${todo.id}`;
    return fetchWithError(url, {
        method: 'DELETE'
    });
}

