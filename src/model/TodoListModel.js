import { EventEmitter } from '../EventEmitter.js';

export class TodoListModel extends EventEmitter {
  /**
   * @param {TodoItemModel[]} [items] 初期アイテム一覧（デフォルトは空の配列）
   */
  constructor(items = []) {
    console.info('execute TodoListModel constructor', items);
    super();
    this.items = items;
  }

  /**
   * TodoItemの合計個数を返す
   * @returns {number}
   */
  getTotalCount() {
    console.info('execute TodoListModel getTotalCount');
    return this.items.length;
  }

  /**
   * 表示できるTodoItemの配列を返す
   * @returns {TodoItemModel[]}
   */
  getTodoItems() {
    console.info('execute TodoListModel getTodoItems');
    return this.items;
  }

  /**
   * TodoListの状態が更新されたときに呼び出されるリスナー関数を登録する
   * @param {Function} listener
   */
  onChange(listener) {
    console.info('execute TodoListModel onChange');
    this.addEventListener('change', listener);
  }

  /**
   * `onChange`で登録したリスナー関数を解除する
   * @param {Function} listener
   */
  offChange(listener) {
    console.info('execute TodoListModel offChange');
    this.removeEventListener('change', listener);
  }

  /**
   * 状態が変更されたときに呼ぶ。登録済みのリスナー関数を呼び出す
   */
  emitChange() {
    console.info('execute TodoListModel emitChange');
    this.emit('change');
  }

  /**
   * TodoItemを追加する
   * @param {TodoItemModel} todoItem
   */
  addTodo(todoItem) {
    console.info('execute TodoListModel addTodo');
    this.items.push(todoItem);
    this.emitChange();
  }

  /**
   * 指定したidのTodoItemのcompletedを更新する
   * @param {{ id:number, completed: boolean }}
   */
  updateTodo({ id, completed }) {
    console.info('execute TodoListModel updateTodo');
    const todoItem = this.items.find((todo) => todo.id === id);
    if (!todoItem) {
      return;
    }
    todoItem.completed = completed;
    this.emitChange();
  }

  /**
   * 指定したidのTodoItemを削除する
   * @param {{ id: number }}
   */
  deleteTodo({ id }) {
    console.info('execute TodoListModel deleteTodo');
    // `id`に一致しないTodoItemだけを残すことで、`id`に一致するTodoItemを削除する
    this.items = this.items.filter((todo) => todo.id !== id);
    this.emitChange();
  }
}
