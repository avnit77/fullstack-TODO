import Component from '../Component.js';

class AddTodo extends Component {

    onRender(form) {
        const addTodo = this.props.addTodo;
        const input = form.querySelector('input');

        form.addEventListener('submit', async event => {
            event.preventDefault();

            const newTodo = {
                task: input.value,
                complete: false
            };

            try {
                await addTodo(newTodo);
                form.reset();
                document.activeElement.blur();
            }
            catch (err) {
                // nothing to do as App will show error,
                // but will keep form from clearing...
            }
        });
    }

    renderHTML() {
        return /*html*/`
            <form class="add-todo">
                <input name="new-todo" required>
                <button>Add</button>
            </form>
        `;
    }
}

export default AddTodo;