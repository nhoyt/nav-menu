import {LitElement, html, css} from 'lit';
import MenuButton from './menu-button';
import SubMenu    from './sub-menu';

export default class MenuItem extends LitElement {
  static counter = 1;

  static properties = {
    parentMenu: { attribute: false }
  }

  static styles = css`
    li {
      display: inline-block;
      list-style: none;
    }
  `;

  constructor () {
    super();
    this.menuButton = null;
    this.subMenu    = null;
    this.menuLink   = null;

    this.addEventListener('click', (e) => {
      switch (e.target) {
        case this.menuButton:
          this.subMenu.toggle(this.menuButton.expanded);
          this.closeOtherSubMenus(this.parentMenu.menuItems, this);
          break;
        case this.menuLink:
          this.closeAllSubMenus(this.navMenu.menuItems);
          break;
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
      // Connect the slotted element to its parent MenuItem
      child.menuItem = this;

      // Initialize attributes and other MenuItem properties
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

  get navMenu () {
    let parentMenu = this.parentMenu;
    while (parentMenu instanceof SubMenu) {
      parentMenu = parentMenu.menuItem.parentMenu;
    }
    return parentMenu;
  }

  closeSubMenu () {
    if (this.menuButton && this.subMenu) {
      this.menuButton.expanded = false;
      this.subMenu.toggle(false);
    }
  }

  closeOtherSubMenus (menuItems, excludeItem) {
    for (const menuItem of menuItems) {
      if (menuItem !== excludeItem) {
        menuItem.closeSubMenu();
        if (menuItem.subMenu) {
          this.closeOtherSubMenus(menuItem.subMenu.menuItems, excludeItem);
        }
      }
    }
  }

  closeAllSubMenus (menuItems) {
    for (const menuItem of menuItems) {
      menuItem.closeSubMenu();
      if (menuItem.subMenu) {
        this.closeAllSubMenus(menuItem.subMenu.menuItems);
      }
    }
  }

  render () {
    return html`<li><slot></slot></li>`;
  }
}

customElements.define('menu-item', MenuItem);
