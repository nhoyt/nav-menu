import {LitElement, html, css} from 'lit';
import MenuButton from './menu-button';
import SubMenu from './sub-menu';

export default class MenuItem extends LitElement {
  static counter = 1;

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

  get slottedChildren () {
    const slot = this.shadowRoot.querySelector('slot');
    return slot.assignedElements();
  }

  firstUpdated () {
    let id;
    const children = this.slottedChildren;
    for (const child of children) {
      if (child instanceof MenuButton) {
        id = `sub-menu-${MenuItem.counter++}`;
        child.setAttribute('controls', `${id}`);
      }
      if (child instanceof SubMenu) {
        child.setAttribute('panelId', `${id}`);
      }
    }
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
