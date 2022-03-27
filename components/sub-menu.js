import {LitElement, html, css} from 'lit';
import MenuItem from './menu-item';

export default class SubMenu extends LitElement {
  static properties = {
    panelId: {},
    menuItems: { attribute: false }
  };

  static styles = css`
    ul {
      display: none;
      position: absolute;
      top: 4rem;
      background-color: lightblue;
      width: 15rem;
      z-index: 10;
    }
  `;

  constructor () {
    super();
    this.menuItems = [];
  }

  get subMenuContainer () {
    return this.shadowRoot.querySelector('ul');
  }

  toggle (value) {
    const style = this.subMenuContainer.style;
    style.display = value ? 'block' : 'none';
  }

  get slottedChildren () {
    const slot = this.shadowRoot.querySelector('slot');
    return slot.assignedElements();
  }

  firstUpdated () {
    const children = this.slottedChildren;
    for (const child of children) {
      if (child instanceof MenuItem) {
        child.parentMenu = this;
        this.menuItems.push(child);
      }
      else {
        console.log(`${this.tagName} ERROR:`,
          `Unknown slotted element: ${child.tagName}`);
      }
    }
    console.log(`menuItems: ${this.menuItems.length}`);
  }

  render () {
    return html`
      <ul id="${this.panelId}">
        <slot></slot>
      </ul>
    `;
  }
}

customElements.define('sub-menu', SubMenu);
