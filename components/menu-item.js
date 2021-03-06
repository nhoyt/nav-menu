import { LitElement, ReactiveElement, html } from 'lit';
import { menuItemCss } from './styles.css';
import DebugController from './debug-controller';
import MenuButton from './menu-button';
import SubMenu from './sub-menu';

export default class MenuItem extends LitElement {
  // class properties
  static counter = 1;

  // instance properties
  parentMenu;

  static styles = menuItemCss;

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
          this.closeAllSubMenus();
          break;
      }
    });

    this.debug = new DebugController(this, true);
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

  hasSubMenu (menuItem) {
    return menuItem.menuButton && menuItem.subMenu && menuItem.subMenu.menuItems;
  }

  closeSubMenu (menuItem, excludeItem) {
    if (this.hasSubMenu(menuItem) && (menuItem !== excludeItem)) {
      menuItem.menuButton.expanded = false;
      menuItem.subMenu.toggle(false);
    }
  }

  closeOtherSubMenus (menuItems, excludeItem) {
    for (const menuItem of menuItems) {
      if (this.hasSubMenu(menuItem)) {
        this.closeOtherSubMenus(menuItem.subMenu.menuItems, excludeItem);
        this.closeSubMenu(menuItem, excludeItem);
      }
    }
  }

  closeAllSubMenus () {
    this.closeOtherSubMenus(this.navMenu.menuItems);
  }

  get className () {
    return (this.parentMenu instanceof SubMenu) ? 'submenu' : 'navmenu';
  }

  render () {
    return html`<li class="${this.className}"><slot></slot></li>`;
  }
}

customElements.define('menu-item', MenuItem);
