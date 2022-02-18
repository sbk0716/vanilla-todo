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
    console.info('[@APP]execute this.todoListModel.onChange() to add multiple listeners');
    // TodoListModelの状態が更新されたら表示を更新する
    this.todoListModel.onChange(() => {
      console.info('The state of TodoListModel has changed!!!!!');
      // それぞれのTodoItem要素をtodoListElement以下へ追加する
      const todoItems = this.todoListModel.getTodoItems();
      const todoListElement = this.todoListView.createElement(todoItems, {
        // Todoアイテムが更新イベントを発生したときに呼ばれるリスナー関数
        onUpdateTodo: ({ id, completed }) => {
          console.info('[@APP]execute this.handleUpdate()');
          this.handleUpdate({ id, completed });
        },
        // Todoアイテムが削除イベントを発生したときに呼ばれるリスナー関数
        onDeleteTodo: ({ id }) => {
          console.info('[@APP]execute this.handleDelete()');
          this.handleDelete({ id });
        },
      });
      console.info('[@APP]execute html-util render()');
      // コンテナ要素の中身(containerElement)をTodoリストをまとめるList要素(todoListElement)で上書きする
      render(todoListElement, containerElement);
      console.info('[@APP]execute this.todoListModel.getTotalCount()');
      // アイテム数の表示を更新
      todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
    });

    console.info('[@APP]execute addEventListener() to listen for form submit');
    // フォームを送信したら、新しいTodoItemModelを追加する
    formElement.addEventListener('submit', (event) => {
      console.info('The form has been submitted!!!!!');
      // 本来のsubmitイベントの動作を止める
      event.preventDefault();
      console.info('[@APP]execute this.handleAdd()');
      this.handleAdd(inputElement.value);
      // 入力欄を空文字列にしてリセットする
      inputElement.value = '';
    });
  }
}
