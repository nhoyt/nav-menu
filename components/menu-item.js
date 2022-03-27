import {LitElement, html, css} from 'lit';
import MenuButton from './menu-button';
import SubMenu from './sub-menu';

export default class MenuItem extends LitElement {
  static counter = 1;

  static properties = {
    navMenu: {
      attribute: false,
      hasChanged (newVal, oldVal) {
        // just confirming ...
        console.log(`navMenu property: ${newVal}`);
      }
    }
  }

  static styles = css`
    li {
      display: inline-block;
      list-style: none;
    }
  `;

  constructor () {
    super();
    this.addEventListener('click', (e) => {
      if (e.target === this.menuButton) {
        this.subMenu.toggle(this.menuButton.expanded);
      }
    })
  }

  get slottedChildren () {
    const slot = this.shadowRoot.querySelector('slot');
    return slot.assignedElements();
  }

  firstUpdated () {
    let id;
    for (const child of this.slottedChildren) {
      switch (child.tagName.toLowerCase()) {
        case 'menu-button':
          id = `sub-menu-${MenuItem.counter++}`;
          child.setAttribute('controls', `${id}`);
          this.menuButton = child;
          break;
        case 'sub-menu':
          child.setAttribute('panelId', `${id}`);
          this.subMenu = child;
          break;
        case 'a':
          child.classList.add('menu-link');
          this.menuLink = child;
          break;
      }
    }
  }

  render () {
    return html`<li><slot></slot></li>`;
  }
}

customElements.define('menu-item', MenuItem);
