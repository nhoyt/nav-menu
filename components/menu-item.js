import {LitElement, html, css} from 'lit';

class MenuItem extends LitElement {
  static styles = css`
    li {
      display: inline;
      list-style: none;
      border-radius: 6px;
      border:2px solid blue;
      margin-left: 8px;
      padding: 4px 8px;
    }
  `;

  constructor () {
    super();
  }

  render () {
    return html`
      <li>
        <slot></slot>
      </li>
    `;
  }
}

customElements.define('menu-item', MenuItem);
