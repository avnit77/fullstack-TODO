import Component from '../Component.js';
import Header from '../common/Header.js';
import Loading from '../common/Loading.js';
import AddTodo from './AddTodo.js';
import TodoList from './TodoList.js';
import { getTodos, addTodo, updateTodo, removeTodo } from '../services/todo-api.js';

class TodoApp extends Component {

    async onRender(dom) {
        const header = new Header({ title: 'My Todos' });
        dom.prepend(header.renderDOM());

        const main = dom.querySelector('main');
        const error = dom.querySelector('.error');

        const loading = new Loading({ loading: true });
        dom.appendChild(loading.renderDOM());

        const list = new TodoList({
            todos: [],
            updateTodo: async todo => {
                loading.update({ loading: true });
                error.textContent = '';

                try {
                    const updated = await updateTodo(todo);
                    const todos = this.state.todos;
                    const index = todos.indexOf(todo);
                    todos.splice(index, 1, updated);
                    list.update({ todos });
                }
                catch (err) {
                    console.log(err);
                }
                finally {
                    loading.update({ loading: false });
                }
            },
            removeTodo: async todo => {
                loading.update({ loading: true });
                error.textContent = '';

                try {
                    await removeTodo(todo);
                    const todos = this.state.todos;
                    const index = todos.indexOf(todo);
                    todos.splice(index, 1);
                    list.update({ todos });
                }
                catch (err) {
                    console.log(err);
                }
                finally {
                    loading.update({ loading: false });
                }
            }
        });

        main.appendChild(list.renderDOM());

        const add = new AddTodo({
            onAdd: async newTodo => {
                loading.update({ loading: true });
                error.textContent = '';
                try {
                    const addedTodo = await addTodo(newTodo);
                    const todos = this.state.todos;
                    todos.push(addedTodo);
                    list.update({ todos });
                }
                catch (err) {
                    error.textContent = err;
                    throw err;
                }
                finally {
                    loading.update({ loading: false });
                }
            }
        });
        main.appendChild(add.renderDOM());

        try {
            const todos = await getTodos();
            this.state.todos = todos;
            list.update({ todos });
        }
        catch (err) {
            error.textContent = 'ERROR';
        }
        finally {
            loading.update({ loading: false });
        }

    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                <!-- show errors: -->
                <p class="error"></p>
                <main>
                    <!-- add todo goes here -->
                    <!-- todo list goes here -->
                </main>
            </div>
        `;
    }
}

export default TodoApp;