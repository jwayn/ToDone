import { LitElement } from 'lit';
import "./todo-item";
declare type todo = {
    text: string;
    completed: boolean;
};
export declare class TodoList extends LitElement {
    static styles: import("lit").CSSResult[];
    constructor();
    todos: todo[];
    input: HTMLInputElement;
    addTodo(e: Event): void;
    toggleTodo(item: todo): void;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
