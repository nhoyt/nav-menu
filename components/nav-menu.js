import {LitElement, html, css} from 'lit';
import MenuItem from './menu-item';

class NavMenu extends LitElement {
  static properties = {
    label: {}
  };

  static styles = css`
    nav {
      background-color: #ddd;
      padding: 0.5rem;
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
    const children = this.slottedChildren;
    for (const child of children) {
      if (child instanceof MenuItem) {
        continue;
      }
      console.log(`${this.tagName} ERROR:`,
        `Found unknown slotted element: ${child.tagName}`);
    }
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
