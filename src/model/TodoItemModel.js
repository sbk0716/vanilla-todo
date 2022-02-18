// ユニークなIDを管理する変数
let todoIdx = 0;

export class TodoItemModel {
  /**
   * `title`: Todoアイテムのタイトル
   * `completed`: Todoアイテムが完了済みならばtrue、そうでない場合はfalse
   * @param {{ title: string, completed: boolean }}
   */
  constructor({ title, completed }) {
    // idは自動的に連番となりそれぞれのインスタンス毎に異なるものとする
    todoIdx += 1;
    this.id = todoIdx;
    this.title = title;
    this.completed = completed;
  }
}
