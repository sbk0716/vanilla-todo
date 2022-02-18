import { element } from './htmlUtil.js';

export class TodoItemView {
  /**
   * `todoItem`に対応するTodoアイテムのHTML要素を作成して返す
   * @param {TodoItemModel} todoItem
   * @param {function({id:string, completed: boolean})} onUpdateTodo チェックボックスの更新イベントリスナー
   * @param {function({id:string})} onDeleteTodo 削除ボタンのクリックイベントリスナー
   * @returns {Element}
   */
  createElement(todoItem, { onUpdateTodo, onDeleteTodo }) {
    // 完了: checked属性をつけ、削除ボタン(x)を追加する
    // 未完了: checked属性を外し、削除ボタン(x)を追加する
    const todoItemElement = todoItem.completed
      ? element`<li><input type="checkbox" class="checkbox" checked>
                                    <s>${todoItem.title}</s>
                                    <button class="delete">x</button>
                                </li>`
      : element`<li><input type="checkbox" class="checkbox">
                                    ${todoItem.title}
                                    <button class="delete">x</button>
                                </li>`;
    // チェックボックスがトグルしたときのイベントにリスナー関数を登録
    const inputCheckboxElement = todoItemElement.querySelector('.checkbox');
    console.info('[TodoItemView]execute addEventListener() to listen for change event');
    inputCheckboxElement.addEventListener('change', () => {
      // コールバック関数に変更
      onUpdateTodo({
        id: todoItem.id,
        completed: !todoItem.completed,
      });
    });
    // 削除ボタン(x)がクリックされたときにTodoListModelからアイテムを削除する
    const deleteButtonElement = todoItemElement.querySelector('.delete');
    console.info('[TodoItemView]execute addEventListener() to listen for click event');
    deleteButtonElement.addEventListener('click', () => {
      // コールバック関数に変更
      onDeleteTodo({
        id: todoItem.id,
      });
    });
    // 作成したTodoアイテムのHTML要素を返す
    return todoItemElement;
  }
}
