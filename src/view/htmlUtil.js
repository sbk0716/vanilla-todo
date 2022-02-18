export function escapeSpecialChars(str) {
  console.info('execute escapeSpecialChars');
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function htmlToElement(html) {
  console.info('execute htmlToElement', html);
  const template = document.createElement('template');
  template.innerHTML = html;
  return template.content.firstElementChild;
}

/**
 * HTML文字列からDOM Nodeを作成して返すタグ関数
 * @return {Element}
 */
export function element(strings, ...values) {
  console.info('execute element', strings, ...values);
  const htmlString = strings.reduce((result, str, i) => {
    const value = values[i - 1];
    if (typeof value === 'string') {
      return result + escapeSpecialChars(value) + str;
    }
    return result + String(value) + str;
  });
  return htmlToElement(htmlString);
}

/**
 * コンテナ要素の中身をbodyElementで上書きする
 * @param {Element} bodyElement コンテナ要素の中身となる要素
 * @param {Element} containerElement コンテナ要素
 */
export function render(bodyElement, containerElement) {
  console.info('execute render', bodyElement, containerElement);
  const targetElement = containerElement;
  // containerElementの中身を空にする
  targetElement.innerHTML = '';
  // containerElementの直下にbodyElementを追加する
  targetElement.appendChild(bodyElement);
}
