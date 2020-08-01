import Component from '../Component.js';
import TodoItem from './TodoItem.js';

class TodoList extends Component {

    onRender(list) {
        const todos = this.props.todos;
        const updateTodo = this.props.updateTodo;
        const removeTodo = this.props.removeTodo;

        todos.forEach(todo => {
            const todoItem = new TodoItem({
                updateTodo,
                removeTodo,
                todo });
            list.appendChild(todoItem.renderDOM());
        });
    }
    renderHTML() {
        return /*html*/`
            <ul class="todo-list"></ul>
        `;
    }
}

export default TodoList;
