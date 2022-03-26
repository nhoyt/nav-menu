import {LitElement, html, css} from 'lit';
import MenuButton from './menu-button';
import SubMenu from './sub-menu';

export default class MenuItem extends LitElement {
  static counter = 1;

  static styles = css`
    li {
      display: inline;
      list-style: none;
      background-color: #eee;
      border-radius: 6px;
      border:2px solid blue;
      margin-left: 8px;
      padding: 4px 8px;
    }
  `;

  constructor () {
    super();
    this.disclosurePair = [];
  }

  get slottedChildren () {
    const slot = this.shadowRoot.querySelector('slot');
    return slot.assignedElements();
  }

  firstUpdated () {
    let id;
    const children = this.slottedChildren;
    for (const child of children) {
      switch (child.tagName.toLowerCase()) {
        case 'menu-button':
          id = `sub-menu-${MenuItem.counter++}`;
          child.setAttribute('controls', `${id}`);
          this.disclosurePair.push(child);
          break;
        case 'sub-menu':
          child.setAttribute('panelId', `${id}`);
          this.disclosurePair.push(child);
          break;
        case 'a':
          child.classList.add('menu-link');
          break;
      }
    }
    if (this.disclosurePair.length === 2) {
      if (this.disclosurePair[0] instanceof MenuButton) {
        this.disclosurePair[0].menuItem = this;
        if (this.disclosurePair[1] instanceof SubMenu) {
          this.disclosurePair[0].subMenu = this.disclosurePair[1];
        }
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
