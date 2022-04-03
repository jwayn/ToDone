import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js'
import "./todo-item";

// Creating a todo type to enforce structure
type todo = {
    text: string;
    completed: boolean;
}

@customElement('todo-list')
export class TodoList extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                max-width: 960px;
                margin: 0 auto;
            }

            h2 {
                margin: 0;
            }

            ul {
                list-style-type: none;
                margin: 0;
                padding: 0;
            }

            .completed {
                text-decoration-line: line-through;
            }
        `
    ];

    constructor() {
        super();
        const localTodos = window.localStorage.getItem('todos');
        if(localTodos) {
            this.todos = JSON.parse(localTodos);
        }
    }

    @property({type: Array})
    todos = new Array<todo>();

    @query('#newItem')
    input!: HTMLInputElement;
    
    // Add todo to the list and update localstorage & tell lit to update
    addTodo(e: Event) {
        e.preventDefault();
        this.todos.push({text: this.input.value, completed: false});
        window.localStorage.setItem('todos', JSON.stringify(this.todos));
        this.input.value = '';
        this.requestUpdate();
    }

    // Toggle the todo item state and update local storage & tell lit to update
    // Takes in a param of todo item
    toggleTodo(item: todo) {
        item.completed = !item.completed;
        window.localStorage.setItem('todos', JSON.stringify(this.todos));
        this.requestUpdate();
    }

    render() {
        const todos = html`
            <ul>
                ${this.todos.map((todo) =>
                    html`
                        <li class=${todo.completed ? 'completed' : ''}>
                            <input type="checkbox" ?checked=${todo.completed} @click=${() => this.toggleTodo(todo)}>
                            <span>${todo.text}</span>
                        </li>
                    `    
                )}
            </ul>
        `
        const noTodosMessage = `Looks like you're all caught up.`
        const todosOrMessage = this.todos.length ? todos : noTodosMessage;

        return html`
            <h2>To do:</h2>

            ${todosOrMessage}

            <form @submit=${this.addTodo}>
                <input id="newItem" placeholder="New todo" aria-label="New todo">
                <button>Add</button>
            </form>
        `;
    }
}
