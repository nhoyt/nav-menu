import {LitElement, html, css} from 'lit';
import MenuItem from './menu-item';

class NavMenu extends LitElement {
  static properties = {
    label: {},
    menuItems: { attribute: false }
  };

  static styles = css`
    ul, li, a {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font: inherit;
    }

    nav {
      background-color: #ddd;
      padding: 0.5rem;
    }

    ul ::slotted(menu-item) {
      background-color: #eee;
      border-radius: 6px;
      border: 2px solid blue;
      margin-left: 8px;
      padding: 4px 8px;
    }
  `;

  constructor () {
    super();
    this.menuItems = [];
  }

  get slottedChildren () {
    const slot = this.shadowRoot.querySelector('slot');
    return slot.assignedElements();
  }

  firstUpdated () {
    const children = this.slottedChildren;
    for (const child of children) {
      if (child instanceof MenuItem) {
        child.navMenu = this;
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
      <nav aria-label="${this.label}">
        <ul>
          <slot></slot>
        </ul>
      </nav>
    `;
  }
}

customElements.define('nav-menu', NavMenu);
