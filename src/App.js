import { render } from './view/htmlUtil.js';
import { TodoListView } from './view/TodoListView.js';
import { TodoItemModel } from './model/TodoItemModel.js';
import { TodoListModel } from './model/TodoListModel.js';

export class App {
  constructor() {
    console.info('[@APP]execute constructor');
    this.todoListView = new TodoListView();
    this.todoListModel = new TodoListModel([]);
  }

  /**
   * Todoを追加するときに呼ばれるリスナー関数
   * @param {string} title
   */
  handleAdd(title) {
    console.info('[@APP]execute handleAdd', title);
    const newTodoItem = new TodoItemModel({ title, completed: false });
    this.todoListModel.addTodo(newTodoItem);
  }

  /**
   * Todoの状態を更新したときに呼ばれるリスナー関数
   * @param {{ id:number, completed: boolean }}
   */
  handleUpdate({ id, completed }) {
    console.info('[@APP]execute handleUpdate', id, completed);
    this.todoListModel.updateTodo({ id, completed });
  }

  /**
   * Todoを削除したときに呼ばれるリスナー関数
   * @param {{ id: number }}
   */
  handleDelete({ id }) {
    console.info('[@APP]execute handleDelete', id);
    this.todoListModel.deleteTodo({ id });
  }

  mount() {
    console.info('[@APP]execute mount');
    const formElement = document.querySelector('#js-form');
    const inputElement = document.querySelector('#js-form-input');
    const todoItemCountElement = document.querySelector('#js-todo-count');
    const containerElement = document.querySelector('#js-todo-list');
    console.info('[@APP]execute this.todoListModel.onChange() to add multiple listeners to app instance');
    this.todoListModel.onChange(() => {
      const todoItems = this.todoListModel.getTodoItems();
      const todoListElement = this.todoListView.createElement(todoItems, {
        // Appに定義したリスナー関数を呼び出す
        onUpdateTodo: ({ id, completed }) => {
          console.info('[@APP]execute this.handleUpdate()');
          this.handleUpdate({ id, completed });
        },
        onDeleteTodo: ({ id }) => {
          console.info('[@APP]execute this.handleDelete()');
          this.handleDelete({ id });
        },
      });
      console.info('[@APP]execute html-util render()');
      render(todoListElement, containerElement);
      console.info('[@APP]execute this.todoListModel.getTotalCount()');
      todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
    });

    console.info('[@APP]execute addEventListener() to listen for form submit');
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      console.info('[@APP]execute this.handleAdd()');
      this.handleAdd(inputElement.value);
      inputElement.value = '';
    });
  }
}
